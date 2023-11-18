import { Injectable } from "@nestjs/common";
import {
  CreateScenarioInput,
  CreateScenarioBranchInput,
  CreateAnswerEntityInput,
  ScenarioBranchEntity,
  // ScenarioChoiceEntity,
  ScenarioEntity,
} from "@core/types/server";
import { In, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AnswersRepositoryService } from "../answers-repository/answers-repository.service";
import { orderByIndexScenarioEntities } from "@core/functions";

@Injectable()
export class ScenarioRepositoryService {
  constructor(
    @InjectRepository(ScenarioEntity)
    private readonly scenarioRepository: Repository<ScenarioEntity>,
    @InjectRepository(ScenarioBranchEntity)
    private readonly scenarioBranchRepository: Repository<ScenarioBranchEntity>,
    private readonly answersRepositoryService: AnswersRepositoryService
  ) {}
  async create({
    description,
    maxConversationLength,
    db_name,
    branches,
  }: CreateScenarioInput) {
    const scenario = await this.scenarioRepository.save<
      Omit<ScenarioEntity, "id" | "createdAt" | "updatedAt">
    >({
      description,
      maxConversationLength,
      db_name,
      branches: [],
    });

    // add branches
    if (branches && branches.length > 0) {
      const branchesPromises = branches.map((branch) =>
        this.createEmptyBranch(scenario.id, branch)
      );

      await Promise.all(branchesPromises);
    }

    const res = await this.scenarioRepository.findOne({
      where: { id: scenario.id },
      relations: ["branches", "branches.choices", "branches.choices.responses"],
    });

    return orderByIndexScenarioEntities([res])[0];
    // return this.scenarioRepository.save({
    //   ...rest,
    //   branches,
    // });
  }

  async findAll() {
    const scenarios = await this.scenarioRepository.find({
      relations: ["branches", "branches.choices", "branches.choices.responses"],
    });
    return orderByIndexScenarioEntities(scenarios);
  }

  async findOne(id: string) {
    const scenario = await this.scenarioRepository.findOne({
      where: { id },
      relations: ["branches", "branches.choices", "branches.choices.responses"],
    });

    return orderByIndexScenarioEntities([scenario])[0];
  }

  async findAllByNames(scenarioNames: string[]) {
    const scenarios = await this.scenarioRepository.find({
      where: { description: In(scenarioNames) },
      relations: ["branches", "branches.choices", "branches.choices.responses"],
    });

    return orderByIndexScenarioEntities(scenarios);
  }

  // update(
  //   id: number,
  //   updateScenarioRepositoryInput: UpdateScenarioRepositoryInput
  // ) {
  //   return `This action updates a #${id} scenarioRepository`;
  // }

  async remove(id: string) {
    const scenario = await this.scenarioRepository.findOne({
      where: { id },
      // relations: ["branches"],
    });

    if (!scenario) {
      throw new Error("Scenario not found");
    }

    await this.scenarioRepository.remove(scenario);
    return id;
  }

  // async createChoice(
  //   scenarioId: string,
  //   scenarioBranchId: string,
  //   createChoiceInput: CreateScenarioChoiceInput
  // ) {

  // }

  async createEmptyBranch(
    scenarioId: string,
    scenarioBranchInput: CreateScenarioBranchInput
  ) {
    const { choices } = scenarioBranchInput;
    const scenario = await this.scenarioRepository.findOne({
      where: { id: scenarioId },
      // why Error: Cannot query across one-to-many for property branches
      relations: ["branches"],
    });

    const branch = this.scenarioBranchRepository.create({
      ...scenarioBranchInput,
      scenario: scenario,
      choices: [],
    });
    await this.scenarioBranchRepository.save(branch);
    scenario.branches.push(branch);
    // await this.scenarioRepository.update(scenarioId, {
    //   branches: [
    //     // ...scenario.branches,
    //     branch,
    //   ],
    // });

    // const savedBranch = await this.scenarioBranchRepository.findOne({
    //   where: { id: scenarioId },
    //   // relations: ["branches"],
    // });

    //

    if (choices && choices.length > 0) {
      const choicesPromises = choices.map((choice) => {
        return this.addChoiceToBranch(branch, choice);
      });

      await Promise.all(choicesPromises);
    }

    return branch;
  }

  async addChoiceToBranch(
    branch: ScenarioBranchEntity,
    createChoiceInput: CreateAnswerEntityInput
  ) {
    // const branch = await this.scenarioBranchRepository.findOne({
    //   where: { id: branchId },
    //   relations: ["choices"],
    // });

    const choice = await this.answersRepositoryService.create(
      createChoiceInput
    );

    branch.choices.push(choice);

    await this.scenarioBranchRepository.save(branch);
    // await this.scenarioBranchRepository.update(branchId, {
    //   choices: [...branch.choices, choice],
    // });

    return branch;
  }

  async addChoiceToBranchById(
    branchId: ScenarioBranchEntity["id"],
    createChoiceInput: CreateAnswerEntityInput
  ) {
    const branch = await this.scenarioBranchRepository.findOne({
      where: { id: branchId },
      relations: ["choices"],
    });

    const choice = await this.answersRepositoryService.create(
      createChoiceInput
    );

    branch.choices.push(choice);

    await this.scenarioBranchRepository.save(branch);
    // await this.scenarioBranchRepository.update(branchId, {
    //   choices: [...branch.choices, choice],
    // });

    return branch;
  }

  // addBranchToScenario(
  //   scenarioId: string,
  //   createBranchInput: CreateScenarioBranchInput
  // ) {
  //   return `This action adds a branch to scenario #${scenarioId}`;
  // }
}
