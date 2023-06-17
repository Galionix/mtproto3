import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import {
  AnswerEntity,
  CreateAnswerEntityInput,
  MessageEntity,
  StoredAnswerEntity,
} from "@core/types/server";
import { MessagesRepositoryService } from "../messages-repository/messages-repository.service";

@Injectable()
export class AnswersRepositoryService {
  constructor(
    @InjectRepository(StoredAnswerEntity)
    private readonly answersRepository: Repository<StoredAnswerEntity>,
    // @InjectRepository(MessageEntity)
    private readonly messagesRepositoryService: MessagesRepositoryService
  ) {}

  async create({
    request,
    responses,
    description,
    isDmAnswer,
    isGroupAnswer,
    isChannelAnswer,
    base_probability,
    db_name,
  }: CreateAnswerEntityInput) {
    // TODO: check if request already exists

    const responsesMessagesIds: MessageEntity["id"][] = [];
    // responses.forEach(async (response) => {
    //   const res = await this.messagesRepositoryService.create(response);
    //   responsesMessagesIds.push(res.id);
    // });
    const responsesPrimises = responses.map(async (response) => {
      const res = await this.messagesRepositoryService.create(response);
      responsesMessagesIds.push(res.id);
    });

    await Promise.all(responsesPrimises);
    console.log("responsesMessagesIds: ", responsesMessagesIds);

    const storedAnswerInput: Omit<
      StoredAnswerEntity,
      "id" | "createdAt" | "updatedAt"
    > = {
      request,
      responsesIds: responsesMessagesIds,
      description,
      isDmAnswer,
      isGroupAnswer,
      isChannelAnswer,
      base_probability,
      db_name,
    };
    const savedAnswer = await this.answersRepository.save(storedAnswerInput);
    console.log("savedAnswer: ", savedAnswer);

    return savedAnswer;
  }

  async populateAnswer(answer: StoredAnswerEntity): Promise<AnswerEntity> {
    const responses = await this.messagesRepositoryService.batchFind(
      answer.responsesIds
    );
    const populatedAnswer = {
      ...answer,
      responses,
    };
    return populatedAnswer;
  }
  async populateAnswers(
    answers: StoredAnswerEntity[]
  ): Promise<AnswerEntity[]> {
    const populatedAnswers = [];
    for (const answer of answers) {
      const populatedAnswer = await this.populateAnswer(answer);
      populatedAnswers.push(populatedAnswer);
    }
    return populatedAnswers;
  }
  async findAll() {
    const answers = await this.answersRepository.find();
    console.log("findAll answers: ", answers);
    const populatedAnswers = await this.populateAnswers(answers);

    return populatedAnswers;
  }

  async findOne(id: string): Promise<AnswerEntity> {
    const res = await this.answersRepository.findOne({ where: { id } });
    const populatedAnswer = await this.populateAnswer(res);
    return populatedAnswer;
  }

  async remove(id: string) {
    const messageIds = (await this.answersRepository.findOne({ where: { id } }))
      .responsesIds;
    if (messageIds.length > 0)
      await this.messagesRepositoryService.removeMany(messageIds);

    const { affected } = await this.answersRepository.delete(id);
    return affected;
  }

  async findSome(
    input: Omit<Partial<CreateAnswerEntityInput>, "request" | "response">
  ): Promise<AnswerEntity[]> {
    const storedAnswers = await this.answersRepository.find({
      where: input,
    });

    const populatedAnswers = await this.populateAnswers(storedAnswers);

    return populatedAnswers;
    // return await this.answersRepository.find({
    //   where: input,
    // });
  }
}
