import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { DatabaseService } from "./database.service";
import { DatabaseRepositoryService } from "./database-repository/database-repository.service";
import {
  AnswerEntity,
  CreateAnswerEntityInput,
  UpdateDatabaseInput,
} from "@core/types/server";

@Resolver(() => AnswerEntity)
export class DatabaseResolver {
  constructor(
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
  removeAnswer(@Args("id", { type: () => String }) id: string) {
    return this.databaseRepositoryService.remove(id);
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
