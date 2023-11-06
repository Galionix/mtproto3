import {
  AnswerEntity,
  MessageEntity,
  ScenarioBranchEntity,
} from "@core/types/server";
import { ScenarioEntity } from "../../apollo/codegen/graphql";
import { getRandomInt } from "@core/functions";

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

    currentBranch = scenarioData.branches.find(
      (branch) => branch.id === currentChoice.nextBranchId
    );
  }

  return currentChoice.responses[getRandomInt(currentChoice.responses.length)];
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
  console.log("-------------------------------");
  if (!scenarioData) return null;
  let currentBranch = scenarioData?.branches[0];
  const responses: AnswerEntity["responses"] = [];
  if (!currentBranch) return null;

  let currentChoice = currentBranch?.choices[0];
  if (!currentChoice) return null;
  for (const userRequest of userRequests) {
    if (!currentBranch) {
      return responses;
    }

    currentChoice =
      currentBranch.choices.find((choice) =>
        checkIfRequestMatches(choice.request, userRequest)
      ) ?? currentBranch.choices[0];

    currentBranch = scenarioData.branches.find(
      (branch) => branch.id === currentChoice?.nextBranchId
    );

    const intValue = getRandomInt(currentChoice?.responses?.length || 0);
    console.log("intValue: ", intValue);
    const choiceText = currentChoice
      ? (currentChoice.responses[intValue] as AnswerEntity["responses"][0])
      : null;

    console.log("choiceText: ", choiceText);
    responses.push(choiceText);
  }

  return responses;
}
