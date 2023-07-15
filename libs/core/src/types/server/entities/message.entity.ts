import { ObjectType, Field, InputType, ID } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { EMessageType } from "../../client/entities";
import { AnswerEntity } from "./answer.entity";

export const MessageTypeValues = Object.values(EMessageType);

@Entity()
@ObjectType()
export class MessageEntity {
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

  @Field(() => AnswerEntity, { description: "answer", nullable: true })
  @ManyToOne(() => AnswerEntity, (answer) => answer.responses, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  // @Column(() => AnswerEntity)
  answer: AnswerEntity;
}
