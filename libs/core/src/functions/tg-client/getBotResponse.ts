import { AnswerEntity, ScenarioEntity } from "../../types/server";
import { getRandomInt } from "../general";

// findLast polyfill
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global {
  interface Array<T> {
    findLast(predicate: (value: T, index: number, obj: T[]) => unknown): T;
  }
}

function checkIfRequestMatches(request: string[], userRequest: string) {
  for (const requestItem of request) {
    if (userRequest.toLowerCase().includes(requestItem.toLowerCase())) {
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
  let currentBranch = scenarioData?.branches[0];
  // console.log("currentBranch: ", currentBranch);
  let currentChoice = currentBranch?.choices[0];
  // console.log("currentChoice: ", currentChoice);

  for (const userRequest of userRequests) {
    // console.log("userRequest: ", userRequest);
    // if (!currentBranch) {
    //   return null;
    // }

    // currentChoice =
    //   currentBranch.choices.findLast((choice) => {
    //     const requestMatches = checkIfRequestMatches(
    //       choice.request,
    //       userRequest
    //     );

    //     return requestMatches;
    //   }) ?? currentBranch.choices[0];

    // const nextBranch = scenarioData.branches.find((branch) => {
    //   return branch.id === currentChoice.nextBranchId;
    // });

    // currentBranch = nextBranch;
    if (!currentBranch) {
      return null;
    }

    currentChoice =
      currentBranch.choices.findLast((choice) =>
        checkIfRequestMatches(choice.request, userRequest)
      ) ?? currentBranch.choices[0];

    const nextBranch = scenarioData.branches.find(
      (branch) => branch.id === currentChoice?.nextBranchId
    );
    currentBranch = nextBranch;

    // responses.push(
    //   currentChoice.responses[
    //     getRandomInt(currentChoice.responses.length)
    //   ] as any
    // );
  }

  return currentChoice?.responses[getRandomInt(currentChoice.responses.length)];
}

// this function is exactly the same, but accumulates all responses from bot, not just the last one
export function getBotResponses(
  scenarioData: ScenarioEntity,
  userRequests: string[]
) {
  console.log("scenarioData: ", scenarioData);
  // console.log("scenarioData: ", scenarioData);
  if (!scenarioData) return null;
  let currentBranch = scenarioData?.branches[0];

  let currentChoice = currentBranch?.choices[0];
  const responses: AnswerEntity["responses"] = [];

  for (const userRequest of userRequests) {
    // console.log("userRequest: ", userRequest);
    if (!currentBranch) {
      return responses;
    }

    currentChoice =
      currentBranch.choices.findLast((choice) => {
        const matches = checkIfRequestMatches(choice.request, userRequest);
        return matches;
      }) ?? currentBranch.choices[0];
    // console.log("currentChoice: ", currentChoice);
    if (!currentChoice) continue;

    const nextBranch = scenarioData.branches.find(
      (branch) => branch.id === currentChoice?.nextBranchId
    );
    currentBranch = nextBranch;

    responses.push(
      currentChoice.responses[
        getRandomInt(currentChoice.responses.length)
      ] as any
    );
  }

  return responses;
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
