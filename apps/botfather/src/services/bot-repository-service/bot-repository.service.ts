import { BotEntity, CreateBotInput, UpdateBotInput } from "@core/types/server";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { defaultValues } from "./default-values";

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
    
    let copyFromBot: BotEntity;
    
    if(createBotInput.copyFrom) {
      copyFromBot = await this.botRepository.findOne({
        where: { api_id: createBotInput.api_id },
      });
    }

    const newBot: BotEntity = {
      ...defaultValues,
      ...copyFromBot,
      ...createBotInput,
    }

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

  async updateClientState(api_id: number, state: string) {
    const bot = await this.findOne(api_id);

    bot.clientState = state;
    bot.clientStateUpdateTime = new Date(Date.now());

    this.botRepository.save(bot);
  }

  async update(api_id: number, updateBotInput: UpdateBotInput) {
    const bot = await this.findOne(api_id);
    if(!bot) {
      throw new Error(`Bot with api_id ${api_id} not found`);
    }
    return await this.botRepository.save({...bot, ...updateBotInput});
  }
}