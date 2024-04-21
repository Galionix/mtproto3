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
    const spamMessages = await this.spamRepository.find({
      where: {
        isSpam: true,
      },
    });
    return spamMessages;
  }
  async findByDbName(db_name: string) {
    const spamMessages = await this.spamRepository.find({
      where: { db_name, isSpam: true },
    });
    return spamMessages;
  }

  // update
  async update(id: string, updateSpamMessageInput: CreateMessageInput) {
    const updatedSpamMessage = await this.spamRepository.update(
      id,
      updateSpamMessageInput
    );
    return updatedSpamMessage;
  }

  async remove(id: string) {
    const { affected } = await this.spamRepository.delete(id);
    return affected;
  }
}
