import { ObjectType, Field } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IBotState } from "../types/botState";

@Entity()
@ObjectType()
export class BotEntity {
  @Field(() => String, { nullable: true })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field({ nullable: true })
  @Column()
  api_id: number;

  @Field({ nullable: true })
  @Column()
  api_hash: string;

  @Field({ nullable: true })
  @Column()
  sessionString: string;

  // @Field({ nullable: true })
  // @Column()
  // state: string;
}

@Entity()
@ObjectType()
export class BotStateEntity {
  @Field(() => String, { nullable: true })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => BotEntity, { nullable: true })
  @Column()
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
}
