import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Logger } from "@nestjs/common";
import { BotEntity, CreateBotInput } from "@core/types/server";

const l = new Logger("BotRepositoryService");

@Injectable()
export class BotRepositoryService {
  constructor(
    @InjectRepository(BotEntity)
    private readonly botRepository: Repository<BotEntity> // private readonly botStateService: BotStateService
  ) {}

  async create(createBotInput: CreateBotInput) {
    const existingBot = await this.botRepository.findOne({
      where: { api_id: createBotInput.api_id },
    });

    if (existingBot) {
      return existingBot;
    }

    const newBot = this.botRepository.save({
      api_id: createBotInput.api_id,
      api_hash: createBotInput.api_hash,
      sessionString: createBotInput.sessionString,
    });

    return newBot;
  }

  async findAll() {
    const bots = await this.botRepository.find();

    return bots;
  }

  async findOne(api_id: number): Promise<BotEntity> {
    const res = await this.botRepository.findOne({ where: { api_id } });
    return res;
  }

  async remove(id: number) {
    const removedId = await this.botRepository.delete(id);
    // await this.botStateService.reload();
    return removedId;
  }

  async updateSessionString(api_id: number, sessionString: string) {
    const bot = await this.findOne(api_id);

    bot.sessionString = sessionString;

    this.botRepository.save(bot);

    l.log("sessionString updated: ", sessionString);
  }
}
