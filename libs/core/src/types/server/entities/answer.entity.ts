import { ObjectType, Field, ID } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { MessageEntity } from "./message.entity";
import { ScenarioBranchEntity } from "./scenarioBranch.entity";
import { Inject, Injectable, forwardRef } from "@nestjs/common";

// @Entity()
// @ObjectType()
// export class StoredAnswerEntity {
//   @Field(() => String, { description: "entity id", nullable: true })
//   @PrimaryGeneratedColumn("uuid")
//   id: string;

//   @Field(() => String, { description: "notes", nullable: true })
//   @Column()
//   description: string;

//   @Field(() => [String], { description: "request", nullable: true })
//   @Column("text", { array: true })
//   request: string[];

//   @Field(() => [String], {
//     description: "responsesIds",
//     nullable: true,
//   })
//   @Column("text", { array: true })
//   responsesIds: string[];

//   @CreateDateColumn({ type: "timestamp" })
//   createdAt: Date;

//   @UpdateDateColumn({ type: "timestamp" })
//   updatedAt: Date;

//   @Field(() => Boolean, { nullable: true })
//   @Column()
//   isDmAnswer: boolean;

//   @Field(() => Boolean, { nullable: true })
//   @Column()
//   isGroupAnswer: boolean;

//   @Field(() => Boolean, { nullable: true })
//   @Column()
//   isChannelAnswer: boolean;

//   @Field(() => String, { nullable: true })
//   @Column()
//   base_probability: string;

//   @Field(() => String, { nullable: true })
//   @Column()
//   db_name: string;
// }
export type TAnswerEntity = {
  id: string;
  description?: string;
  request: string[];
  responses: MessageEntity[];
  createdAt: Date;
  updatedAt: Date;
  isDmAnswer?: boolean;
  isGroupAnswer?: boolean;
  isChannelAnswer?: boolean;
  base_probability: string;
  db_name: string;
  nextBranchId?: string;
  branch: ScenarioBranchEntity;
};

@Entity()
@ObjectType()
// @Injectable()
export class AnswerEntity implements TAnswerEntity {
  // constructor(
  //   @Inject(forwardRef(() => MessageEntity))
  //   private readonly messageEntity: MessageEntity,
  //   @Inject(forwardRef(() => ScenarioBranchEntity))
  //   private readonly scenarioBranchEntity: ScenarioBranchEntity
  // ) {}
  @Field(() => ID, { description: "entity id", nullable: true })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String, {
    description: "notes",
    nullable: true,
    defaultValue: "",
  })
  @Column({ default: "" })
  description?: string;

  @Field(() => [String], { description: "request", nullable: true })
  @Column("varchar", { array: true, default: [] })
  request: string[];

  @Field(
    // () => [MessageEntity],
    // "MessageEntity",
    // () => [MessageEntity],
    {
      description: "responses",
      nullable: true,
      defaultValue: [],
    }
  )
  // @OneToMany(() => MessageEntity, (message) => message.answer, {
  //   cascade: ["remove"],
  // })
  // responses: MessageEntity[];
  @OneToMany(
    // () => MessageEntity, (message) => message.answer,
    "MessageEntity",
    "answer",
    {
      cascade: ["remove"],
    }
  )
  responses: MessageEntity[];
  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  @Column({ default: false })
  isDmAnswer?: boolean;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  @Column({ default: false })
  isGroupAnswer?: boolean;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  @Column({ default: false })
  isChannelAnswer?: boolean;

  @Field(() => String, { nullable: true })
  @Column({ default: "1" })
  base_probability: string;

  @Field(() => String, { nullable: true })
  @Column({ default: "base" })
  db_name: string;

  @Field(() => String, {
    description: "next scenario branch id",
    nullable: true,
  })
  @Column({ default: null })
  nextBranchId?: string;

  @Field({
    description: "scenario branch relation",
    nullable: true,
    defaultValue: null,
  })
  @ManyToOne(
    // () => ScenarioBranchEntity, (branch) => branch.choices
    "ScenarioBranchEntity",
    "choices",
    {
      nullable: true,
      onDelete: "CASCADE",
      orphanedRowAction: "delete",
    }
  )
  // @Column({ nullable: true, default: null })
  branch: ScenarioBranchEntity;
}

