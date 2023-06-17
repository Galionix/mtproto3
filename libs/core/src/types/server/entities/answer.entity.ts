import { ObjectType, Field } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { MessageEntity } from "./message.entity";

@Entity()
@ObjectType()
export class StoredAnswerEntity {
  @Field(() => String, { description: "entity id", nullable: true })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String, { description: "notes", nullable: true })
  @Column()
  description: string;

  @Field(() => [String], { description: "request", nullable: true })
  @Column("text", { array: true })
  request: string[];

  @Field(() => [String], {
    description: "responsesIds",
    nullable: true,
  })
  @Column("text", { array: true })
  responsesIds: string[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @Field(() => Boolean, { nullable: true })
  @Column()
  isDmAnswer: boolean;

  @Field(() => Boolean, { nullable: true })
  @Column()
  isGroupAnswer: boolean;

  @Field(() => Boolean, { nullable: true })
  @Column()
  isChannelAnswer: boolean;

  @Field(() => String, { nullable: true })
  @Column()
  base_probability: string;

  @Field(() => String, { nullable: true })
  @Column()
  db_name: string;
}

@Entity()
@ObjectType()
export class AnswerEntity {
  @Field(() => String, { description: "entity id", nullable: true })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String, { description: "notes", nullable: true })
  @Column()
  description: string;

  @Field(() => [String], { description: "request", nullable: true })
  @Column(() => String, { array: true })
  request: string[];

  @Field(() => [MessageEntity], {
    description: "responses",
  })
  @Column(() => MessageEntity, { array: true })
  responses: MessageEntity[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @Field(() => Boolean, { nullable: true })
  @Column()
  isDmAnswer: boolean;

  @Field(() => Boolean, { nullable: true })
  @Column()
  isGroupAnswer: boolean;

  @Field(() => Boolean, { nullable: true })
  @Column()
  isChannelAnswer: boolean;

  @Field(() => String, { nullable: true })
  @Column()
  base_probability: string;

  @Field(() => String, { nullable: true })
  @Column()
  db_name: string;
}