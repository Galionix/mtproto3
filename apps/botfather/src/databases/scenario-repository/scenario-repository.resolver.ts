import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { ScenarioRepositoryService } from "./scenario-repository.service";

import {
  CreateEmptyScenarioInput,
  CreateScenarioBranchInput,
  ScenarioEntity,
} from "@core/types/server";

@Resolver(() => ScenarioEntity)
export class ScenarioRepositoryResolver {
  constructor(
    private readonly scenarioRepositoryService: ScenarioRepositoryService
  ) {}

  @Mutation(() => ScenarioEntity)
  createEmptyScenario(
    @Args("emptyScenarioInput")
    CreateEmptyScenarioInput: CreateEmptyScenarioInput
  ) {
    return this.scenarioRepositoryService.create(CreateEmptyScenarioInput);
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

  @Mutation(() => ScenarioEntity)
  removeScenarioRepository(@Args("id", { type: () => Int }) id: number) {
    return this.scenarioRepositoryService.remove(id);
  }

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
}
