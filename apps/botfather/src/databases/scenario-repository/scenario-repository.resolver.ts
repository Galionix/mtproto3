import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { ScenarioRepositoryService } from "./scenario-repository.service";

import {
  CreateScenarioInput,
  CreateScenarioBranchInput,
  CreateAnswerEntityInput,
  ScenarioBranchEntity,
  ScenarioEntity,
} from "@core/types/server";

@Resolver(() => ScenarioEntity)
export class ScenarioRepositoryResolver {
  constructor(
    private readonly scenarioRepositoryService: ScenarioRepositoryService
  ) {}

  /*

   @Mutation(() => AnswerEntity)
  async createAnswer(
    @Args("createAnswerInput") createAnswerInput: CreateAnswerEntityInput
  ) {
    return await this.answersRepositoryService.create(createAnswerInput);
  }
  @Field(() => [CreateMessageInput], { description: "response" })
  responses: CreateMessageInput[];
  */
  @Mutation(() => ScenarioEntity)
  async createScenario(
    @Args("scenarioInput")
    createScenarioInput: CreateScenarioInput
  ) {
    return await this.scenarioRepositoryService.create(createScenarioInput);
  }

  @Query(() => [ScenarioEntity], { name: "scenarios" })
  findAll() {
    return this.scenarioRepositoryService.findAll();
  }

  @Query(() => ScenarioEntity, { name: "scenario" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.scenarioRepositoryService.findOne(id);
  }

  // @Mutation(() => ScenarioEntity)
  // updateScenarioRepository(
  //   @Args("updateScenarioRepositoryInput")
  //   updateScenarioRepositoryInput: UpdateScenarioRepositoryInput
  // ) {
  //   return this.scenarioRepositoryService.update(
  //     updateScenarioRepositoryInput.id,
  //     updateScenarioRepositoryInput
  //   );
  // }

  // add branch to scenario
  @Mutation(() => ScenarioEntity)
  addBranchToScenario(
    @Args("scenarioId", { type: () => String }) scenarioId: string,
    @Args("createScenarioBranchInput")
    createBranchInput: CreateScenarioBranchInput
  ) {
    return this.scenarioRepositoryService.createEmptyBranch(
      scenarioId,
      createBranchInput
    );
  }

  @Mutation(() => ScenarioBranchEntity)
  async addChoiceToBranch(
    @Args("scenarioBranchId", { type: () => String }) scenarioBranchId: string,
    @Args("createScenarioBranchInput", {
      type: () => CreateAnswerEntityInput,
    })
    createBranchInput: CreateAnswerEntityInput
  ) {
    return this.scenarioRepositoryService.addChoiceToBranchById(
      scenarioBranchId,
      createBranchInput
    );
  }
  // remove scenario
  @Mutation(() => String)
  removeScenario(@Args("id", { type: () => String }) id: string) {
    return this.scenarioRepositoryService.remove(id);
  }
}
