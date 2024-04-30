import { ScenarioEntity } from "../../server";
import { JsonFileData } from "../JsonFileData.types";
import { TTask, TTaskOrder } from "../bot-tasks";
import { TAnswer } from "./botAnswer";
import { TClientMessage } from "./message.entity";
import { TScenarioElement } from "./scenario";
import { Api, TelegramClient } from "telegram";
export type TReplacement = {
  [key: string]: string;
};
type TGroupCounters = {
  [key: string]: {
    id: bigInt.BigInteger;
    messagesSinceLastSpam: number;
    membersCount: number;
    spamInterval: number;
  };
};

export type TState = {
  bio: {
    firstName: string;
    lastName: string;
    about: string;
  };
  tasksTries: {
    [key: string]: number;
  };
  me: Api.User;
  audioDurations: {
    [key: string]: number;
  };
  voice: string;
  botDbId: string;
  dmDb: TAnswer[];
  groupDb: TAnswer[];
  channelDb: TAnswer[];
  tasks: TTask[];
  apiId: number;
  apiHash: string;
  stringSession: string;
  behavior_model: string;
  answers_db: string;
  read_delay: number;
  type_delay_multiplier: number;
  dmScenario: ScenarioEntity;
  spamScenarios: ScenarioEntity[];
  proxy: string;
  jsonData: JsonFileData;

  // message_probability: this is a number between 0 and 1
  // that represents the probability of a message being sent
  // which is generally speaking the probability that bot will respond.
  // 1 means 100% probability, 0 means 0% probability.
  // then it will multiply the base_probability of the answer
  // for example: if base_probability is 0.5 and message_probability is 0.5
  // then the probability of the answer being sent is 0.25
  // then random throws a number between 0 and 1
  // if the number is less than 0.25 then the answer will be sent

  // if message_probability is 0 then the answer will never be sent
  // if message_probability is 2 then the answer will always be sent, not regarding the message base_probability
  message_probability: number;
  latestGroupJoinDate: number;
  taskOrder: TTaskOrder;
  afterTaskDelay: number;
  afterTaskIdleTime: number;
  replacements: TReplacement;
  groupJoinInterval: number;
  groupCounters: TGroupCounters;

  spamDb: TClientMessage[];
  spamDbName: string;
};

// graphql typeorm entity of state

// import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// @Entity()
// @ObjectType()

// export class BotInnerStateEntity {

//     @Column()
//     @Field(() => [String], { nullable: true })

// }
