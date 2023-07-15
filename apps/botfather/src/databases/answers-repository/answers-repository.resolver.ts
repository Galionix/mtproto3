import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import {
  AnswerEntity,
  CreateAnswerEntityInput,
  // StoredAnswerEntity,
  UpdateAnswersRepositoryInput,
} from "@core/types/server";
import { AnswersRepositoryService } from "./answers-repository.service";

@Resolver(() => AnswerEntity)
export class AnswersRepositoryResolver {
  constructor(
    private readonly answersRepositoryService: AnswersRepositoryService
  ) {}

  @Mutation(() => AnswerEntity)
  async createAnswer(
    @Args("createAnswerInput") createAnswerInput: CreateAnswerEntityInput
  ) {

    return await this.answersRepositoryService.create(createAnswerInput);
  }

  @Query(() => [AnswerEntity], { name: "answers" })
  findAll() {
    return this.answersRepositoryService.findAll();
  }

  // // findSome
  @Query(() => [AnswerEntity], { name: "someAnswers" })
  async someAnswers(
    @Args("findSomeAnswersInput")
    findSomeAnswersInput: UpdateAnswersRepositoryInput
  ) {
    return this.answersRepositoryService.findSome(findSomeAnswersInput);
  }

  @Query(() => AnswerEntity, { name: "answer", nullable: true })
  findOne(@Args("id", { type: () => String }) id: string) {
    return this.answersRepositoryService.findOne(id);
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
    return this.answersRepositoryService.remove(id);
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
  @Mutation(() => AnswerEntity)
  async updateAnswer(
    @Args("updateAnswerInput") updateAnswerInput: UpdateAnswersRepositoryInput
  ) {
    return await this.answersRepositoryService.update(updateAnswerInput);
  }
}
