import { ObjectType, Field } from "@nestjs/graphql";
import { Entity, PrimaryColumn, Column } from "typeorm";
import { BotEntity } from "./bot.entity";
import { ChildProcessEntity } from "./childProcess.entity";
import { ErrorEntity } from "./error.entity";

@Entity()
@ObjectType()
export class BotStateEntity {
  // @Field(() => String, { nullable: true })
  // @PrimaryGeneratedColumn("uuid")
  // id: string;

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
  error: ErrorEntity;

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
}
