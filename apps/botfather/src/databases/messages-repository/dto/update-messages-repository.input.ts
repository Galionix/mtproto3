import { CreateMessageInput } from "@core/types/server";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateMessageInput extends PartialType(CreateMessageInput) {}
