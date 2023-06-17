import { ObjectType, Field, InputType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { EMessageType } from "../../client/entities";

export const MessageTypeValues = Object.values(EMessageType);

@Entity()
@ObjectType()
export class MessageEntity {
  @Field(() => String, { description: "entity id", nullable: true })
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
}

@InputType()
export class InputMessageEntity extends MessageEntity {
  // this a hack to make it valid entity
  //  essentially its duplicated code

  // constructor() {
  //   super();
  // }
  @Field(() => String, { description: "entity id", nullable: true })
  @PrimaryGeneratedColumn("uuid")
  declare id: string;
}
