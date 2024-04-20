import { Column, Entity, PrimaryColumn } from "typeorm";
import { ObjectType, Field, Int } from "@nestjs/graphql";

// i suppose the logic is following: this entity gets created and updated by the bot, and the bot can also read it.
// The Join command that we send from frontend is only a command to the bot, and the bot will update the entity.The bot will also update the entity when it receives a message from the group.
// The bot will also update the entity when it leaves the group.The bot will also update the entity when it receives an error etc.

@Entity()
@ObjectType()
export class GroupEntity {
  @Field(() => Int, { nullable: true })
  @PrimaryColumn()
    // this is conjunction of chat_id and user_id of bot
  id: string;

  // chat id
  @Field(() => String, { nullable: true })
  @Column()
  chat_id: string;

  // chat nickname
  @Field(() => String, { nullable: true })
  @Column()
  name: string;

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
  behavior_model: string;

  @Field({ nullable: true })
  @Column()
  processing_enabled: boolean;

  @Field({ nullable: true })
  @Column()
  spam_frequency: number;
  // username
  @Field({ nullable: true })
  @Column()
  username: string;
  // updated at
  @Field({ nullable: true })
  @Column()
  updated_at: Date;

  // info (object)
  @Field(() => Object, { nullable: true })
  @Column("simple-json")
  info: object;
  // this info can contain info that bot can collect, either it frequency of sending messages per time slice
  // or it can contain info about the group, like group rules, etc.
}
