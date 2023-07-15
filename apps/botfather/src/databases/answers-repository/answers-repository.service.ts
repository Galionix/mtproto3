import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import {
  AnswerEntity,
  CreateAnswerEntityInput,
  MessageEntity,
  // StoredAnswerEntity,
  UpdateAnswersRepositoryInput,
} from "@core/types/server";
import { MessagesRepositoryService } from "../messages-repository/messages-repository.service";

@Injectable()
export class AnswersRepositoryService {
  constructor(
    @InjectRepository(AnswerEntity)
    private readonly answersRepository: Repository<AnswerEntity>,
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
    nextBranchId,
  }: CreateAnswerEntityInput) {
    // TODO: check if request already exists

    const responsesMessages: MessageEntity[] = [];
    // responses.forEach(async (response) => {
    //   const res = await this.messagesRepositoryService.create(response);
    //   responsesMessagesIds.push(res.id);
    // });
    const responsesPromises = responses.map(async (response) => {
      const res = await this.messagesRepositoryService.create(response);
      responsesMessages.push(res);
    });

    await Promise.all(responsesPromises);

    const answer = this.answersRepository.create({
      request,
      responses: responsesMessages,
      description,
      isDmAnswer,
      isGroupAnswer,
      isChannelAnswer,
      base_probability,
      db_name,
    });

    const savedAnswer = await this.answersRepository.save(answer);

    return savedAnswer;

    //

    // const storedAnswerInput: Omit<
    // AnswerEntity,
    //   "id" | "createdAt" | "updatedAt"
    // > = {
    //   request,
    //   responsesIds: responsesMessagesIds,
    //   description,
    //   isDmAnswer,
    //   isGroupAnswer,
    //   isChannelAnswer,
    //   base_probability,
    //   db_name,
    // };
    // const savedAnswer = await this.answersRepository.save(storedAnswerInput);
    //

    // const populatedAnswer = await this.populateAnswer(savedAnswer);
    // return populatedAnswer;
  }

  // async populateAnswer(answer: StoredAnswerEntity): Promise<AnswerEntity> {
  //   const responses = await this.messagesRepositoryService.batchFind(
  //     answer.responsesIds
  //   );
  //   const populatedAnswer = {
  //     ...answer,
  //     responses,
  //   };
  //   return populatedAnswer;
  // }
  // async populateAnswers(
  //   answers: StoredAnswerEntity[]
  // ): Promise<AnswerEntity[]> {
  //   const populatedAnswers = [];
  //   for (const answer of answers) {
  //     const populatedAnswer = await this.populateAnswer(answer);
  //     populatedAnswers.push(populatedAnswer);
  //   }
  //   return populatedAnswers;
  // }
  async findAll() {
    // const answers = await this.answersRepository.find();
    //
    // const populatedAnswers = await this.populateAnswers(answers);

    return await this.answersRepository.find({ relations: ["responses"] });
  }

  async findOne(id: string) {
    // const res = await this.answersRepository.findOne({ where: { id } });
    // const populatedAnswer = await this.populateAnswer(res);
    // return "populatedAnswer";
    return await this.answersRepository.findOne({
      where: { id },
      relations: ["responses", "request"],
    });
  }

  async remove(id: string) {
    // const messageIds = (await this.answersRepository.findOne({ where: { id } }))
    //   .responsesIds;
    // if (messageIds.length > 0)
    //   await this.messagesRepositoryService.removeMany(messageIds);

    // const { affected } = await this.answersRepository.delete(id);
    return "affected";
  }

  async findSome(
    input: Omit<Partial<CreateAnswerEntityInput>, "request" | "response">
  ) {
    // const storedAnswers = await this.answersRepository.find({
    //   where: input,
    // });

    // const populatedAnswers = await this.populateAnswers(storedAnswers);

    return "populatedAnswers";
    // return await this.answersRepository.find({
    //   where: input,
    // });
  }

  async update(updateAnswerInput: UpdateAnswersRepositoryInput) {
    const { id, ...rest } = updateAnswerInput;

    const answer = await this.answersRepository.findOne({
      where: { id },
      relations: ["responses"],
    });

    if ("responses" in rest) {
      // this means we appending new responses
      const responsesMessages: MessageEntity[] = [];
      const responsesPromises = rest.responses.map(async (response) => {
        const res = await this.messagesRepositoryService.create(response);
        responsesMessages.push(res);
      });

      await Promise.all(responsesPromises);

      answer.responses = [...answer.responses, ...responsesMessages];

      delete rest.responses;
    }

    const updatedAnswer = await this.answersRepository.save({
      ...answer,
      ...rest,
    });

    return updatedAnswer;

    // // check if id exists
    // if (!answer) throw new Error("Answer with id: " + id + " not found");
    // const res = await this.answersRepository.update(id, rest);
    //
    // return "this.answersRepository.findOne({ where: { id } });";
  }
}
