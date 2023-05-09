import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { DatabaseService } from "./database.service";
import { AnswerEntity } from "../../../../libs/core/src/types/server/entities/database.entity";
import { DatabaseRepositoryService } from "./database-repository/database-repository.service";
import {
  CreateAnswerEntityInput,
  UpdateDatabaseInput,
} from "@core/types/server";

@Resolver(() => AnswerEntity)
export class DatabaseResolver {
  constructor(
    private readonly databaseService: DatabaseService,

    private readonly databaseRepositoryService: DatabaseRepositoryService
  ) {}

  @Mutation(() => AnswerEntity)
  async createAnswer(
    @Args("createDatabaseInput") createDatabaseInput: CreateAnswerEntityInput
  ) {
    return this.databaseRepositoryService.create(createDatabaseInput);
  }

  @Query(() => [AnswerEntity], { name: "answers" })
  findAll() {
    return this.databaseRepositoryService.findAll();
  }

  // findSome
  @Query(() => [AnswerEntity], { name: "someAnswers" })
  async someAnswers(
    @Args("findSomeAnswersInput")
    findSomeAnswersInput: UpdateDatabaseInput
  ) {
    return this.databaseRepositoryService.findSome(findSomeAnswersInput);
  }

  @Query(() => AnswerEntity, { name: "answer", nullable: true })
  findOne(@Args("name", { type: () => String }) name: string) {
    return this.databaseRepositoryService.findOne(name);
  }

  // @Mutation(() => AnswerEntity)
  // updateDatabase(
  //   @Args("updateDatabaseInput") updateDatabaseInput: UpdateDatabaseInput
  // ) {
  //   return this.databaseService.update(
  //     updateDatabaseInput.id,
  //     updateDatabaseInput
  //   );
  // }

  @Mutation(() => Int)
  removeDatabase(@Args("name", { type: () => String }) name: string) {
    return this.databaseRepositoryService.remove(name);
  }

  // getAnswersByBehaviorModel(behavior_model: string)
  // @Query(() => [AnswerEntity], { name: "answersByBehaviorModel" })
  // getAnswersByBehaviorModel(
  //   @Args("behavior_model", { type: () => String }) behavior_model: string
  // ) {
  //   return this.databaseRepositoryService.getAnswersByBehaviorModel(
  //     behavior_model
  //   );
  // }
}
