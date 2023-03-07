import { Injectable } from "@nestjs/common";
// import { CreateBotInput } from "./dto/create-bot.input";
// import { BotEntity } from "./entities/bot.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BotStateService } from "../bot-state-service/bot-state.service";
import { CreateBotInput } from "../bot/dto/create-bot.input";
import { BotEntity } from "../bot/entities/bot.entity";
import { Logger } from "@nestjs/common";

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

    // await this.botStateService.reload();

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
    // await this.botStateService.reload();
    return `This action removes a #${id} bot`;
  }

  async updateSessionString(api_id: number, sessionString: string) {
    const bot = await this.findOne(api_id);

    bot.sessionString = sessionString;

    this.botRepository.save(bot);

    l.log("sessionString updated: ", sessionString);
  }
}
