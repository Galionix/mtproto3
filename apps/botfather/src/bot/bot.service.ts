import { Injectable } from "@nestjs/common";
import { CreateBotInput } from "./dto/create-bot.input";
import { UpdateBotInput } from "./dto/update-bot.input";
import { uuid } from "uuidv4";
import { BotEntity } from "./entities/bot.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class BotService {
  constructor(
    @InjectRepository(BotEntity)
    private readonly postRepository: Repository<BotEntity>
  ) {}

  async create(createBotInput: CreateBotInput) {
    const existingBot = await this.postRepository.findOne({
      where: { api_id: createBotInput.api_id },
    });

    if (existingBot) {
      return existingBot;
    }

    const newBot = this.postRepository.save({
      api_id: createBotInput.api_id,
      api_hash: createBotInput.api_hash,
      sessionString: createBotInput.sessionString,
      id: uuid(),
    });

    return newBot;
  }

  findAll() {
    return this.postRepository.find();
  }

  async findOne(id: string) {
    const res = await this.postRepository.findOne({ where: { id } });
    return res;
  }

  update(id: number, updateBotInput: UpdateBotInput) {
    return `This action updates a #${id} bot`;
  }

  remove(id: number) {
    return `This action removes a #${id} bot`;
  }
}
