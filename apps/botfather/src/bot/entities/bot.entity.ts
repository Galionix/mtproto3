import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class BotEntity {
  @Field(() => String, { nullable: true })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field({ nullable: true })
  @Column()
  api_id: number;

  @Field({ nullable: true })
  @Column()
  api_hash: string;

  @Field({ nullable: true })
  @Column()
  sessionString: string;
}
