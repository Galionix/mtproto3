import { TTask, TTaskOrder } from "../bot-tasks";
import { TAnswer } from "./botAnswer";
import { TScenarioElement } from "./scenario";

export type TState = {
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
  scenario: TScenarioElement[];

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
};

// graphql typeorm entity of state

// import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// @Entity()
// @ObjectType()

// export class BotInnerStateEntity {

//     @Column()
//     @Field(() => [String], { nullable: true })

// }
