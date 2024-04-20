import { Field, InputType, ObjectType, PartialType } from "@nestjs/graphql";
import { MessageEntity } from "../entities";
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@InputType()
export class CreateMessageInput {
  @Field(() => String, {
    description: "notes",
    nullable: true,
    defaultValue: "",
  })
  @Column({ default: "" })
  description?: string;

  @Field(() => String, {
    description: "value of EMessageType",
    nullable: true,
    defaultValue: "TEXT",
  })
  @Column()
  type: string;

  @Field(() => String, {
    description: "payload of text for message",
    nullable: true,
    defaultValue: "",
  })
  @Column({ default: "" })
  text?: string;

  @Field(() => String, {
    description: "payload of reaction for message",
    nullable: true,
    defaultValue: "",
  })
  @Column({ default: "" })
  reaction?: string;

  @Field(() => String, {
    description: "payload of photo for message",
    nullable: true,
    defaultValue: "",
  })
  @Column({ default: "" })
  photo?: string;

  @Field(() => String, {
    description: "payload of video for message",
    nullable: true,
    defaultValue: "",
  })
  @Column({ default: "" })
  video?: string;

  @Field(() => String, {
    description: "payload of audio for message",
    nullable: true,
    defaultValue: "",
  })
  @Column({ default: "" })
  audio?: string;

  @Field(() => String, {
    description: "payload of caption for message",
    nullable: true,
    defaultValue: "",
  })
  @Column({ default: "" })
  caption?: string;

  @Field(() => String, {
    description: "payload of sticker for message",
    nullable: true,
    defaultValue: "",
  })
  @Column({ default: "" })
  sticker?: string;

  @Field(() => String, {
    description: "coefficient for message",
    nullable: true,
    defaultValue: "1",
  })
  @Column({ default: "1" })
  coefficient?: string;

  @Field(() => String, {
    description: "db_name",
    nullable: true,
    defaultValue: "base",
  })
  @Column({ default: "base" })
  db_name?: string;
  // index
  @Field(() => Number, { description: "index", nullable: true })
  @Column({ default: 0 })
  index?: number;
  // isSpam
  @Field(() => Boolean, { description: "isSpam", nullable: true })
  @Column({ default: false })
  isSpam?: boolean;

  // scenarioIdForSpam
  @Field(() => String, { description: "scenarioIdForSpam", nullable: true })
  @Column({ default: "" })
  scenarioIdForSpam?: string;
}
