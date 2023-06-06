import { ObjectType, Field } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class AnswerEntity {
  @Field(() => String, { description: "entity id", nullable: true })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String, { description: "notes", nullable: true })
  @Column()
  description: string;

  @Field(() => String, { description: "request", nullable: true })
  @Column()
  request: string;

  @Field(() => String, { description: "response", nullable: true })
  @Column()
  response: string;

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
  behavior_model: string;
}
