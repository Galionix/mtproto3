import { Injectable } from "@nestjs/common";
import { BotEntity } from "./entities/bot.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class BotService {
  constructor(
    @InjectRepository(BotEntity)
    private readonly botRepository: Repository<BotEntity>
  ) {}
}
