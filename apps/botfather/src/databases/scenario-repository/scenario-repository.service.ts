import { Injectable } from "@nestjs/common";
import { CreateScenarioRepositoryInput } from "./dto/create-scenario-repository.input";
import { UpdateScenarioRepositoryInput } from "./dto/update-scenario-repository.input";
import {
  CreateEmptyScenarioInput,
  CreateScenarioBranchInput,
  CreateScenarioChoiceInput,
  ScenarioBranchEntity,
  ScenarioChoiceEntity,
  ScenarioEntity,
} from "@core/types/server";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AnswersRepositoryService } from "../answers-repository/answers-repository.service";

@Injectable()
export class ScenarioRepositoryService {
  // constructor(
  //   @InjectRepository(ScenarioEntity)
  //   private readonly scenarioRepository: Repository<ScenarioEntity>,
  //   @InjectRepository(ScenarioBranchEntity)
  //   private readonly scenarioBranchRepository: Repository<ScenarioBranchEntity>,
  //   private readonly answersRepositoryService: AnswersRepositoryService
  // ) {}
  create(createScenarioRepositoryInput: CreateEmptyScenarioInput) {
    // return this.scenarioRepository.save({
    //   ...createScenarioRepositoryInput,
    //   branches: [],
    // });
  }

  findAll() {
    // return this.scenarioRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} scenarioRepository`;
  }

  // update(
  //   id: number,
  //   updateScenarioRepositoryInput: UpdateScenarioRepositoryInput
  // ) {
  //   return `This action updates a #${id} scenarioRepository`;
  // }

  remove(id: number) {
    return `This action removes a #${id} scenarioRepository`;
  }

  async createChoice(
    scenarioId: string,
    scenarioBranchId: string,
    createChoiceInput: CreateScenarioChoiceInput
  ) {
    // const branch = await this.scenarioBranchRepository.findOne({
    //   where: { id: scenarioBranchId },
    // });
    // // const scenario = await this.scenarioRepository.findOne({
    // //   where: { id: scenarioId },
    // // });
    // const answer = await this.answersRepositoryService.create(
    //   createChoiceInput
    // );
    // const choice: Omit<ScenarioChoiceEntity, "id" | "createdAt" | "updatedAt"> =
    //   {
    //     ...answer,
    //     branch: branch,
    //   };
    // await this.scenarioBranchRepository.update(scenarioBranchId, {
    //   choices: [...branch.choices, choice],
    // });
    // return this.scenarioRepository.findOne({
    //   where: { id: scenarioId },
    //   relations: ["branches"],
    // });
  }

  async createEmptyBranch(
    scenarioId: string,
    createEmptyScenarioInput: CreateScenarioBranchInput
  ) {
    // const scenario = await this.scenarioRepository.findOne({
    //   where: { id: scenarioId },
    // });
    // fuck. i shouldnt create choices before branch.

    // const emptyChoice: ScenarioChoiceEntity = await this.answersRepositoryService.create(
    //   {
    //     request:["emty request"],
    //     responses: [{
    //       text: "empty choice",
    //       type: "TEXT",
    //     }],
    //     // nextBranchId: null,
    //   }
    // );

    // const branch: Omit<ScenarioBranchEntity, "id"> = {
    //   ...createEmptyScenarioInput,
    //   scenario: scenario,
    //   choices: [],
    // };

    // await this.scenarioBranchRepository.save(branch);

    // await this.scenarioRepository.update(scenarioId, {
    //   branches: [...scenario.branches, branch],
    // });

    // return this.scenarioRepository.findOne({
    //   where: { id: scenarioId },
    //   relations: ["branches"],
    // });
  }

  // addBranchToScenario(
  //   scenarioId: string,
  //   createBranchInput: CreateScenarioBranchInput
  // ) {
  //   return `This action adds a branch to scenario #${scenarioId}`;
  // }
}
