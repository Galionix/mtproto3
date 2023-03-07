import { Column, Entity, PrimaryColumn } from "typeorm";
import { ObjectType, Field, Int } from "@nestjs/graphql";

@Entity()
@ObjectType()
export class GroupEntity {
  @Field(() => Int, { nullable: true })
  @PrimaryColumn()
  chat_id: number;

  @Field({ nullable: true })
  @Column()
  status: string;

  @Field({ nullable: true })
  @Column()
  total_members: number;

  @Field({ nullable: true })
  @Column()
  total_messages_sent: number;

  @Field({ nullable: true })
  @Column()
  total_messages_received: number;

  @Field({ nullable: true })
  @Column()
  joined_at: Date;

  @Field({ nullable: true })
  @Column()
  left_at: Date;

  @Field({ nullable: true })
  @Column()
  last_message_sent_at: Date;

  @Field({ nullable: true })
  @Column()
  error: string;

  @Field({ nullable: true })
  @Column()
  behaviour_model: string;

  @Field({ nullable: true })
  @Column()
  processing_enabled: boolean;

  @Field({ nullable: true })
  @Column()
  spam_frequency: number;
}
