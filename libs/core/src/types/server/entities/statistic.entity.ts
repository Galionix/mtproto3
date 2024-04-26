import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum EStatisticType {
  NEW_DIALOG = "NEW_DIALOG",
  LINK_SENT = "LINK_SENT",
}

export type TStatisticType = keyof typeof EStatisticType;

@Entity()
@ObjectType()
export class StatisticEntity {
  @Field(() => String, { description: "stat id", nullable: true })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => Int, { description: "bot's api_id", nullable: true })
  @Column()
  api_id: string;

  @Field(() => Date, {
    description: "date of statistic update",
    nullable: true,
  })
  @Column()
  date: Date;

  @Field(() => String, {
    description: "type of statistic that triggered the update",
    nullable: true,
  })
  @Column()
  type: string;

  @Field(() => Int, { description: "number of dialogs", nullable: true })
  @Column()
  dialogs: number;

  @Field(() => Int, { description: "number of links sent", nullable: true })
  @Column()
  links_sent: number;
}
