import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { StatisticsService } from "./statistics.service";
import { Statistic } from "../../../../libs/core/src/types/server/entities/statistic.entity";
import { CreateStatisticInput } from "./dto/create-statistic.input";
import { UpdateStatisticInput } from "./dto/update-statistic.input";

@Resolver(() => Statistic)
export class StatisticsResolver {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Mutation(() => Statistic)
  createStatistic(
    @Args("createStatisticInput") createStatisticInput: CreateStatisticInput
  ) {
    return this.statisticsService.create(createStatisticInput);
  }

  @Query(() => [Statistic], { name: "statistics" })
  findAll() {
    return this.statisticsService.findAll();
  }

  @Query(() => Statistic, { name: "statistic" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.statisticsService.findOne(id);
  }

  @Mutation(() => Statistic)
  updateStatistic(
    @Args("updateStatisticInput") updateStatisticInput: UpdateStatisticInput
  ) {
    return this.statisticsService.update(
      updateStatisticInput.id,
      updateStatisticInput
    );
  }

  @Mutation(() => Statistic)
  removeStatistic(@Args("id", { type: () => Int }) id: number) {
    return this.statisticsService.remove(id);
  }
}
