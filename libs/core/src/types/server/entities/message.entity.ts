import { ObjectType, Field, InputType, ID } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from "typeorm";
import { EMessageType } from "../../client/entities";
import { AnswerEntity } from "./answer.entity";
import { Injectable } from "@nestjs/common";
// import { AnswerEntity } from "./answer.entity";

export const MessageTypeValues = Object.values(EMessageType);

export type TMessageEntity = {
  id: string;
  description?: string;
  type: string;
  text?: string;
  reaction?: string;
  photo?: string;
  video?: string;
  audio?: string;
  caption?: string;
  sticker?: string;
  createdAt: Date;
  updatedAt: Date;
  coefficient: string;
  db_name: string;
  answer: AnswerEntity;
};

@Entity()
@ObjectType()
@Injectable()
export class MessageEntity implements TMessageEntity {
  @Field(() => ID, { description: "entity id", nullable: true })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String, { description: "notes", nullable: true })
  @Column({ default: "" })
  description?: string;

  @Field(() => String, { description: "value of EMessageType", nullable: true })
  @Column()
  type: string;

  @Field(() => String, {
    description: "payload of text for message",
    nullable: true,
  })
  @Column({ default: "" })
  text?: string;

  @Field(() => String, {
    description: "payload of reaction for message",
    nullable: true,
  })
  @Column({ default: "" })
  reaction?: string;

  @Field(() => String, {
    description: "payload of photo for message",
    nullable: true,
  })
  @Column({ default: "" })
  photo?: string;

  @Field(() => String, {
    description: "payload of video for message",
    nullable: true,
  })
  @Column({ default: "" })
  video?: string;

  @Field(() => String, {
    description: "payload of audio for message",
    nullable: true,
  })
  @Column({ default: "" })
  audio?: string;

  @Field(() => String, {
    description: "payload of caption for message",
    nullable: true,
  })
  @Column({ default: "" })
  caption?: string;

  @Field(() => String, {
    description: "payload of sticker for message",
    nullable: true,
  })
  @Column({ default: "" })
  sticker?: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @Field(() => String, {
    description: "coefficient for message",
    nullable: true,
  })
  @Column({ default: "1" })
  coefficient: string;

  @Field(() => String, { description: "db_name", nullable: true })
  @Column({ default: "base" })
  db_name: string;

  // @Field(() => AnswerEntity, { description: "answer", nullable: true })
  // @ManyToOne(() => AnswerEntity, (answer) => answer.responses, {
  //   onDelete: "CASCADE",
  //   orphanedRowAction: "delete",
  // })
  // // @Column(() => AnswerEntity)
  // answer: AnswerEntity;

  // @Field(() => AnswerEntity, { description: "answer", nullable: true })
  @Field(() => AnswerEntity, { description: "answer", nullable: true })
  @ManyToOne(
    () => AnswerEntity,
    (answer) => answer.responses,
    // "AnswerEntity",
    // "responses",
    {
      onDelete: "CASCADE",
      orphanedRowAction: "delete",
    }
  )
  // @Column(() => AnswerEntity)
  answer: Relation<AnswerEntity>;
}

