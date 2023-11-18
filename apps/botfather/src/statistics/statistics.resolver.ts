import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { StatisticsService } from "./statistics.service";
import { CreateStatisticInput } from "./dto/create-statistic.input";
import { UpdateStatisticInput } from "./dto/update-statistic.input";
import { StatisticEntity } from "@core/types/server";

@Resolver(() => StatisticEntity)
export class StatisticsResolver {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Mutation(() => StatisticEntity)
  createStatistic(
    @Args("createStatisticInput") createStatisticInput: CreateStatisticInput
  ) {
    return this.statisticsService.create(createStatisticInput);
  }

  @Query(() => [StatisticEntity], { name: "statistics" })
  findAll() {
    return this.statisticsService.findAll();
  }

  @Query(() => StatisticEntity, { name: "statistic" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.statisticsService.findOne(id);
  }

  @Mutation(() => StatisticEntity)
  updateStatistic(
    @Args("updateStatisticInput") updateStatisticInput: UpdateStatisticInput
  ) {
    return this.statisticsService.update(
      updateStatisticInput.id,
      updateStatisticInput
    );
  }

  @Mutation(() => StatisticEntity)
  removeStatistic(@Args("id", { type: () => Int }) id: number) {
    return this.statisticsService.remove(id);
  }
}
