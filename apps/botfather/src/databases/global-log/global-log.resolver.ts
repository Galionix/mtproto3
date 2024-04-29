import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { GlobalLogService } from "./global-log.service";
import { CreateGlobalLogInput, GlobalLogEntity } from "@core/types/server";
import { CreateGlobalLogInputDTO } from "./create-global-log.input";

@Resolver(() => GlobalLogEntity)
export class GlobalLogResolver {
  constructor(private readonly globalLogService: GlobalLogService) {}

  @Mutation(() => GlobalLogEntity)
  createGlobalLog(
    @Args("createGlobalLogInput") createGlobalLogInput: CreateGlobalLogInputDTO
  ) {
    // cant fix auto generated column error. it actually creates it but i dont know how to set types
    return this.globalLogService.create(createGlobalLogInput as any);
  }

  @Query(() => [GlobalLogEntity], { name: "globalLog" })
  findAll(@Args("limit", { type: () => Int, defaultValue: 10 }) limit: number) {
    return this.globalLogService.findAll({ limit });
  }
  @Query(() => [GlobalLogEntity], { name: "globalLogFromDate" })
  findAllFromDate(@Args("date", { type: () => Date }) date: Date) {
    return this.globalLogService.findAllFromDate(date);
  }

  // @Query(() => GlobalLogEntity, { name: "globalLog" })
  // findOne(@Args("id", { type: () => Int }) id: number) {
  //   return this.globalLogService.findOne(id);
  // }

  // @Mutation(() => GlobalLogEntity)
  // updateGlobalLog(
  //   @Args("updateGlobalLogInput") updateGlobalLogInput: UpdateGlobalLogInput
  // ) {
  //   return this.globalLogService.update(
  //     updateGlobalLogInput.id,
  //     updateGlobalLogInput
  //   );
  // }

  // @Mutation(() => GlobalLogEntity)
  // removeGlobalLog(@Args("id", { type: () => Int }) id: number) {
  //   return this.globalLogService.remove(id);
  // }
}
