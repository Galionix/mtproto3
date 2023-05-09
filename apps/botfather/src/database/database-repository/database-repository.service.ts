import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AnswerEntity } from "../../../../../libs/core/src/types/server/entities/database.entity";
import { CreateAnswerEntityInput } from "@core/types/server";

@Injectable()
export class DatabaseRepositoryService {
  constructor(
    @InjectRepository(AnswerEntity)
    private readonly databaseRepository: Repository<AnswerEntity>
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
    // const existingAnswer = await this.databaseRepository.findOne({
    //   where: { id: createDatabaseInput.id },
    // });

    // if (existingAnswer) {
    //   return existingAnswer;
    // }

    const newAnswer = this.databaseRepository.save({
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
    const answers = await this.databaseRepository.find();

    return answers;
  }

  async findOne(id: string): Promise<AnswerEntity> {
    const res = await this.databaseRepository.findOne({ where: { id } });
    return res;
  }

  async remove(id: string) {
    const { affected } = await this.databaseRepository.delete(id);
    return affected;
  }

  async findSome(
    input: Partial<CreateAnswerEntityInput>
  ): Promise<AnswerEntity[]> {
    return await this.databaseRepository.find({
      where: input,
    });
  }
}
