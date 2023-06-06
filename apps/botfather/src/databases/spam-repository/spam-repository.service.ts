import { CreateSpamMessageInput, MessageEntity } from "@core/types/server";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class SpamRepositoryService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly spamRepository: Repository<MessageEntity>
  ) {}

  async create(createSpamMessageInput: CreateSpamMessageInput) {
    const newSpamMessage = await this.spamRepository.save(
      createSpamMessageInput
    );
    return newSpamMessage;
  }

  async findAll() {
    const spamMessages = await this.spamRepository.find();
    return spamMessages;
  }
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
