import { ObjectType, Field, Int } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class GlobalLogEntity {
  @Field(() => String, { nullable: true })
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Field(() => String, { nullable: true, defaultValue: "" })
  @Column()
  event_message: string;

  @Field(() => String, { nullable: true, defaultValue: "" })
  @Column()
  log_event: string;

  @Field(() => Date, { nullable: true })
  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  event_date: Date;

  @Field(() => String, { nullable: true })
  @Column()
  botDbId: string;

  @Field(() => String, { nullable: true })
  @Column()
  details: string;
}

export type CreateGlobalLogInput = {
  event_message: string;
  log_event: string;
  details: string;
  botDbId: string;
  event_date: Date;
};
