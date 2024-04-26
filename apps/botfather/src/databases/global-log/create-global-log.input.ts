import { CreateGlobalLogInput, GlobalLogEntity } from "@core/types/server";
import { InputType, Int, Field, PartialType } from "@nestjs/graphql";
import { Column } from "typeorm";

@InputType()
export class CreateGlobalLogInputDTO
  implements
    Pick<
      CreateGlobalLogInput,
      "event_message" | "log_event" | "details" | "api_id"
    >
{
  //   @Field(() => Int, { description: "Example field (placeholder)" })
  //   exampleField: number;

  @Field(() => String, { nullable: true })
  event_message: string;

  @Field(() => String, { nullable: true })
  log_event: string;

  /*
      @Field(() => Object, { nullable: true })
  @Column("simple-json")
  info: object;
    */

  @Field(() => String, { nullable: true })
  details: string;

  @Field(() => Int, { nullable: true })
  api_id: string;
}
