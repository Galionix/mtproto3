import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
@ObjectType()
export class ChildProcessEntity {
  @Field(() => Int, { nullable: true })
  @Column()
  id?: number;

  @Field({ nullable: true })
  @PrimaryColumn()
  pid?: number;

  @Field({ nullable: true })
  @Column()
  connected: boolean;

  @Field({ nullable: true })
  @Column()
  killed: boolean;

  @Field({ nullable: true })
  @Column()
  exitCode: number;

  // @Field({ nullable: true })
  // @Column()
  // exitSignal: string;

  @Field({ nullable: true })
  @Column()
  signalCode: string;

  @Field({ nullable: true })
  @Column()
  spawnfile: string;

  kill: () => void;
  disconnect: () => void;
}
