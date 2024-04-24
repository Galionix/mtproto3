import { CreateGlobalLogInput, GlobalLogEntity } from "@core/types/server";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThan, Repository } from "typeorm";

@Injectable()
export class GlobalLogService {
  /*
    constructor(
    @InjectRepository(MessageEntity)
    private readonly messagesRepository: Repository<MessageEntity>
  ) {}
  */
  constructor(
    @InjectRepository(GlobalLogEntity)
    private readonly globalLogRepository: Repository<GlobalLogEntity>
  ) {}
  create(createGlobalLogInput: CreateGlobalLogInput) {
    // const { details } = createGlobalLogInput;
    return this.globalLogRepository.save(
      createGlobalLogInput
      //   {
      //   ...createGlobalLogInput,
      //   details: JSON.stringify(details),
      // }
    );
    // return 'This action adds a new globalLog';
  }
  // findAllFromDate(date: Date) {
  //   // here we need to return all logs newer than date
  //   return this.globalLogRepository.find({
  //     where: {
  //       event_date: date,
  //     },
  //   });
  // }

  async findAllFromDate(date: Date) {
    const addedNanosecond = new Date(date.getTime() + 1);
    const query = {
      where: {
        event_date: MoreThan(addedNanosecond),
      },
    };

    // console.log("Query has changed!");
    // Fetch your data here using the new query
    const newData = await this.globalLogRepository.find(query);
    return newData;
  }

  findAll({ limit = 10 }: { limit: number }) {
    return this.globalLogRepository.find({
      order: {
        event_date: "DESC",
      },
      take: limit,
    });
    // return `This action returns all globalLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} globalLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} globalLog`;
  }
}
