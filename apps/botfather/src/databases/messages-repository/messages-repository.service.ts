import { CreateMessageInput, MessageEntity } from "@core/types/server";
import { Injectable } from "@nestjs/common";
import { UpdateMessageInput } from "./dto/update-messages-repository.input";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";

@Injectable()
export class MessagesRepositoryService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messagesRepository: Repository<MessageEntity>
  ) {}
  async create(createMessagesRepositoryInput: CreateMessageInput) {
    return await this.messagesRepository.save(createMessagesRepositoryInput);
  }

  findAll() {
    return this.messagesRepository.find();
  }

  async findOne(id: MessageEntity["id"]) {
    return await this.messagesRepository.findOne({ where: { id } });
  }

  update(id: string, updateMessagesRepositoryInput: UpdateMessageInput) {
    return this.messagesRepository.update(id, updateMessagesRepositoryInput);
  }

  async remove(id: string) {
    return await this.messagesRepository.delete(id);
  }

  async removeMany(ids: MessageEntity["id"][]) {
    return await this.messagesRepository.delete(ids);
  }

  async batchFind(ids: MessageEntity["id"][]) {
    return await this.messagesRepository.findBy({ id: In(ids) });
  }

  async createMany(createManyMessagesInput: CreateMessageInput[]) {
    return await this.messagesRepository.save(createManyMessagesInput);
  }
}
