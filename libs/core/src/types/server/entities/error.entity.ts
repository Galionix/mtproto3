import { ObjectType, Field } from "@nestjs/graphql";
import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
@ObjectType()
export class ErrorEntity {
  @Field(() => String, { nullable: true })
  @PrimaryColumn()
  name: string;

  @Field(() => String, { nullable: true })
  @Column()
  message: string;

  @Field(() => String, { nullable: true })
  @Column()
  stack?: string;
}
