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
export class SpamEntity {
  @Field(() => String, { description: "entity id", nullable: true })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String, { description: "notes", nullable: true })
  @Column()
  description: string;
  // TODO: type

  @Field(() => String, { description: "payload", nullable: true })
  @Column()
  payload: GeneralMessage;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  @Column()
  db_name: string;
}

@Entity()
@ObjectType()
class GeneralMessage {
  @Field(() => String, { description: "text", nullable: true })
  @Column()
  text?: string;
  // text?
  // reaction?
  // photo?
  // caption?
}
