const scenarioData = {
  id: "scenario2",
  db_name: "Scenario 2",
  branches: [
    {
      id: "branch1",
      choices: [
        {
          id: "choice1",
          request: ["hello"], // User input: "hello"
          response: ["Hi there! How can I assist you today?"],
          nextBranchId: "branch2", // Proceed to branch2
        },
        {
          id: "choice2",
          request: ["product information"], // User input: "product information"
          response: ["Sure! Here's some information about our products..."],
          nextBranchId: "branch3", // Proceed to branch3
        },
      ],
    },
    {
      id: "branch2",
      choices: [
        {
          id: "choice3",
          request: ["help"], // User input: "help"
          response: ["I'm here to help! What do you need assistance with?"],
          nextBranchId: "branch4", // Proceed to branch4
        },
      ],
    },
    {
      id: "branch3",
      choices: [
        {
          id: "choice4",
          request: ["shipping"], // User input: "shipping"
          response: [
            "For shipping inquiries, please contact our customer support at 123-456-7890.",
          ],
          nextBranchId: "branch5", // Proceed to branch5
        },
      ],
    },
    {
      id: "branch4",
      choices: [
        {
          id: "choice5",
          request: ["returns"], // User input: "returns"
          response: [
            "For returns, please refer to our return policy on our website.",
          ],
          nextBranchId: "branch1", // Loop back to branch1
        },
      ],
    },
    {
      id: "branch5",
      choices: [
        {
          id: "choice6",
          request: ["other"], // User input: "other"
          response: [
            "I'm sorry, I can't assist with that. Is there anything else I can help you with?",
          ],
          nextBranchId: "branch2", // Loop back to branch2
        },
      ],
    },
  ],
};

// import { AnswerEntity } from "./answer.entity";

import { MessageEntity } from "./message.entity";

interface ScenarioEntity {
  id: string;
  db_name: string;

  branches: ScenarioBranchEnity[];
}
interface ScenarioBranchEnity {
  id: string;
  choices: ScenarioChoiceEnity[];
}
interface ScenarioChoiceEnity extends AnswerEntity {
  nextBranchId: string;
}

interface AnswerEntity {
  id: string;
  request: string[];
  response: string[];
}

// const scenarioData: ScenarioEntity = {
//   id: "scenario3",
//   db_name: "Scenario Three",
//   branches: [
//     {
//       id: "branch1",
//       choices: [
//         {
//           id: "choice1",
//           request: ["Hello", "Hi"],
//           response: ["Hello! How can I assist you?"],
//           nextBranchId: "branch2",
//         },
//         {
//           id: "choice2",
//           request: ["Help", "Assistance"],
//           response: [
//             "Sure, I'm here to help! What do you need assistance with?",
//           ],
//           nextBranchId: "branch1",
//         },
//       ],
//     },
//     {
//       id: "branch2",
//       choices: [
//         {
//           id: "choice1",
//           request: ["A", "Option A"],
//           response: [
//             "You selected Option A. Here's more information about Option A.",
//           ],
//           nextBranchId: "branch1",
//         },
//         {
//           id: "choice2",
//           request: ["B", "Option B"],
//           response: [
//             "You selected Option B. Here's more information about Option B.",
//           ],
//           nextBranchId: "branch2",
//         },
//       ],
//     },
//   ],
// };

function checkIfRequestMatches(request: string[], userRequest: string) {
  for (const requestItem of request) {
    if (userRequest.toLowerCase().includes(requestItem)) {
      return true;
    }
  }

  return false;
}

function getBotResponse(
  scenarioData: ScenarioEntity,
  userRequests: string[]
): AnswerEntity["response"] | null {
  let currentBranch: ScenarioBranchEnity | undefined = scenarioData.branches[0];
  let currentChoice = currentBranch.choices[0];

  for (const userRequest of userRequests) {
    if (!currentBranch) return null;

    currentChoice =
      currentBranch.choices.find((choice) =>
        checkIfRequestMatches(choice.request, userRequest)
      ) ?? currentBranch.choices[0];

    currentBranch = scenarioData.branches.find(
      (branch) => branch.id === currentChoice.nextBranchId
    );
  }

  return currentChoice.response;
}
