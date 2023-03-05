import { CreateBotInput } from "./create-bot.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateBotInput extends PartialType(CreateBotInput) {
  @Field(() => Int)
  id: number;
}
