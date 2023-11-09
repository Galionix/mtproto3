import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { BotEntity } from "./bot.entity";
import { ChildProcessEntity } from "./childProcess.entity";

@Entity()
@ObjectType()
export class BotStateEntity {
  @Field(() => BotEntity, { nullable: true })
  @PrimaryColumn()
  bot: BotEntity;

  @Field({ nullable: true })
  @Column()
  isRunning: boolean;

  @Field({ nullable: true })
  @Column()
  isStopped: boolean;

  @Field({ nullable: true })
  @Column()
  stoppedDate: number;

  @Field({ nullable: true })
  @Column()
  isStarted: boolean;

  @Field({ nullable: true })
  @Column()
  startedDate: number;

  @Field({ nullable: true })
  @Column()
  isErrored: boolean;

  @Field({ nullable: true })
  @Column()
  error: string;

  @Field({ nullable: true })
  @Column()
  lastUpdate: number;

  @Field({ nullable: true })
  @Column()
  lastMessage: string;

  @Field({ nullable: true })
  @Column()
  childProcess: ChildProcessEntity;

  @Field({ nullable: true })
  @Column()
  joining_groups: boolean;

  @Field(() => [String], { nullable: true })
  @Column()
  joining_groups_chat_ids: string[];

  @Field({ nullable: true })
  @Column()
  leaving_groups: boolean;

  @Field(() => [String], { nullable: true })
  @Column()
  leaving_groups_chat_ids: string[];

  // events log
  @Field(() => [BotEvent], { nullable: true })
  @Column()
  eventLogs: BotEvent[];
  // requestedPhoneNumber
  @Field({ nullable: true })
  @Column()
  requestedPhoneNumber: boolean;
  // requestedPhoneCode
  @Field({ nullable: true })
  @Column()
  requestedPhoneCode: boolean;
}

@Entity()
@ObjectType()
export class BotEvent {
  @Field({ nullable: true })
  @Column()
  log_event: string;
  @Field({ nullable: true })
  @Column()
  event_date: number;
  @Field({ nullable: true })
  @Column()
  event_message: string;
}