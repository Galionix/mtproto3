import { CreateMessageInput, MessageEntity } from "@core/types/server";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class SpamRepositoryService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly spamRepository: Repository<MessageEntity>
  ) {}

  async create(createSpamMessageInput: CreateMessageInput) {
    const newSpamMessage = await this.spamRepository.save(
      createSpamMessageInput
    );
    return newSpamMessage;
  }

  async findAll() {
    const spamMessages = await this.spamRepository.find();
    return spamMessages;
  }
  async findByDbName(db_name: string) {
    const spamMessages = await this.spamRepository.find({ where: { db_name } });
    return spamMessages;
  }

  // async findSome(input: Partial<MessageEntity>): Promise<MessageEntity[]> {
  //   return await this.spamRepository.find({
  //     where: input,
  //   });
  // }

  // async findSome(input: Partial<MessageEntity>): Promise<MessageEntity[]> {
  //   return await this.spamRepository.find({
  //     where: input,
  //   });
  // }
  // async findAll() {
  //   const answers = await this.spamRepository.find();

  //   return answers;
  // }

  // async findOne(id: string): Promise<MessageEntity> {
  //   const res = await this.spamRepository.findOne({ where: { id } });
  //   return res;
  // }

  // async remove(id: string) {
  //   const { affected } = await this.spamRepository.delete(id);
  //   return affected;
  // }
}
