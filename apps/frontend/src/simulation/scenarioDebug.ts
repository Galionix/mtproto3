import {
  AnswerEntity,
  MessageEntity,
  ScenarioBranchEntity,
} from "@core/types/server";
import { ScenarioEntity } from "../../apollo/codegen/graphql";

function checkIfRequestMatches(request: string[], userRequest: string) {
  for (const requestItem of request) {
    if (userRequest.toLowerCase().includes(requestItem)) {
      return true;
    }
  }

  return false;
}

export function getBotResponse(
  scenarioData: ScenarioEntity,
  userRequests: string[]
) {
  if (!scenarioData) return null;
  let currentBranch = scenarioData.branches[0];
  let currentChoice = currentBranch.choices[0];

  for (const userRequest of userRequests) {
    if (!currentBranch) {
      return null;
    }

    currentChoice =
      currentBranch.choices.find((choice) =>
        checkIfRequestMatches(choice.request, userRequest)
      ) ?? currentBranch.choices[0];

    console.log("currentChoice.nextBranchId: ", currentChoice.nextBranchId);
    currentBranch = scenarioData.branches.find(
      (branch) => branch.id === currentChoice.nextBranchId
    );
  }

  return currentChoice.responses;
}
export function getNextBranchId(
  scenarioData: ScenarioEntity,
  userRequests: string[]
) {
  if (!scenarioData) return null;
  let currentBranch = scenarioData.branches[0];
  if (!currentBranch) return null;
  let currentChoice = currentBranch.choices[0];

  for (const userRequest of userRequests) {
    if (!currentBranch) {
      return null;
    }

    currentChoice =
      currentBranch.choices.find((choice) =>
        checkIfRequestMatches(choice.request, userRequest)
      ) ?? currentBranch.choices[0];

    currentBranch = scenarioData.branches.find(
      (branch) => branch.id === currentChoice?.nextBranchId
    );
  }

  return currentChoice?.nextBranchId;
}

// this function is exactly the same, but accumulates all responses from bot, not just the last one
export function getBotResponses(
  scenarioData: ScenarioEntity,
  userRequests: string[]
) {
  if (!scenarioData) return null;
  let currentBranch = scenarioData?.branches[0];
  if (!currentBranch) return null;
  let currentChoice = currentBranch?.choices[0];
  if (!currentChoice) return null;
  // const responses: Omit<MessageEntity,'createdAt' | 'updatedAt' | 'id'>[] = [];
  const responses: AnswerEntity["responses"] = [];

  for (const userRequest of userRequests) {
    if (!currentBranch) {
      return null;
    }

    currentChoice =
      currentBranch.choices.find((choice) =>
        checkIfRequestMatches(choice.request, userRequest)
      ) ?? currentBranch.choices[0];

    currentBranch = scenarioData.branches.find(
      (branch) => branch.id === currentChoice?.nextBranchId
    );

    responses.push(...(currentChoice.responses as any));
  }

  return responses;
}
