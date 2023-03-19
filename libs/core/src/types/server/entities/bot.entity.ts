import { ObjectType, Field } from "@nestjs/graphql";
// import { ChildProcess } from "child_process";
import { Column, Entity, PrimaryColumn } from "typeorm";
// import { IBotState } from "../types/botState";

@Entity()
@ObjectType()
export class BotEntity {
  @Field(() => String, { nullable: true })
  @PrimaryColumn()
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
