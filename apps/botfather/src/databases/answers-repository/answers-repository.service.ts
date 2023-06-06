import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AnswerEntity, CreateAnswerEntityInput } from "@core/types/server";

@Injectable()
export class AnswersRepositoryService {
  constructor(
    @InjectRepository(AnswerEntity)
    private readonly answersRepository: Repository<AnswerEntity>
  ) {}

  async create({
    request,
    response,
    description,
    isDmAnswer,
    isGroupAnswer,
    isChannelAnswer,
    base_probability,
    behavior_model,
  }: CreateAnswerEntityInput) {
    const existingAnswer = await this.answersRepository.findOne({
      where: { request },
    });

    if (existingAnswer) {
      return {
        error: "Answer already exists for this request: " + request,
      };
    }

    const newAnswer = this.answersRepository.save({
      request,
      response,
      description,
      isDmAnswer,
      isGroupAnswer,
      isChannelAnswer,
      base_probability,
      behavior_model,
    });

    return newAnswer;
  }

  async findAll() {
    const answers = await this.answersRepository.find();

    return answers;
  }

  async findOne(id: string): Promise<AnswerEntity> {
    const res = await this.answersRepository.findOne({ where: { id } });
    return res;
  }

  async remove(id: string) {
    const { affected } = await this.answersRepository.delete(id);
    return affected;
  }

  async findSome(
    input: Partial<CreateAnswerEntityInput>
  ): Promise<AnswerEntity[]> {
    return await this.answersRepository.find({
      where: input,
    });
  }
}
