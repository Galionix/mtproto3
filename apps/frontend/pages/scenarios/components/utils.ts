import { ScenarioEntity } from "@core/types/server";
import { v4 as uuidv4 } from "uuid";
/* eslint-disable no-case-declarations */
export function parseInstructions(instructions: string): ScenarioEntity {

  // const instructions = [
  //   "b1",
  //   "c1",
  //   "q*",
  //   "r:а ты что думал, в сказку попал?",
  //   "n:b2",
  //   "b2",
  //   "c1",
  //   "q*",
  //   "r1:ого а ты у нас самый умный?",
  //   "r2:что правда?",
  //   "r3:ого ладно",
  //   "n:b3",
  //   "b3",
  // ];
  const branches = [];
  let currentBranch = null;
  try {
    for (const instruction of instructions.split("\n")) {
      let cmd;
      let value;
      if (instruction.includes(":")) {
        [cmd, value] = instruction.split(":");
      } else if (instruction.includes("*")) {
        cmd = instruction.trim();
      } else {
        cmd = instruction.trim();
      }
      cmd = cmd.trim();
      value = value && value.trim();
      const pureCmd = cmd.replace(/\d+/g, "").trim().replace("*", "");
      if (!pureCmd && !value) {
        continue;
      }
    //   let digits = cmd.match(/\d+/g)?.join("");
    //   if (cmd.includes("*")) {
    //     digits = "*";
    //   }
      //
    //   console.log(
    //     "pureCmd: ",
    //     pureCmd,
    //     "digits: " + digits + ", value: ",
    //     value
    //   );
      switch (pureCmd) {
        case "b":
          const branchIndex = branches.length;
          currentBranch = {
            index: branchIndex,
            id: cmd.trim(),
            choices: [],
          };
          branches.push(currentBranch);
          break;
        case "c":
          if (currentBranch) {
            currentBranch.choices.push({
              index: currentBranch.choices.length,
              id: cmd.trim(),
              request: value || "",
              responses: [],
            });
          } else {
            console.error("Branch not found")
          }
          break;

        case "q":
          if (currentBranch) {
            console.log('currentBranch: ', currentBranch);
            console.log('currentBranch.choices.length - 1: ', currentBranch.choices.length - 1);
            currentBranch.choices[currentBranch.choices.length - 1].request =
              value || "";
          } else {
            console.error("Branch not found")

          }

          break;
        case "r":
          if (currentBranch) {
            const separatorSymbol = value.includes("|") ? "|" : "\\\\";
            const responsesTexts: string[] = value.split(separatorSymbol);
            console.log("responsesTexts: ", responsesTexts);
            responsesTexts.forEach((responseText, index) => {
              currentBranch.choices[
                currentBranch.choices.length - 1
              ].responses.push({
                index: index,
                id: cmd.trim(),
                text: responseText,
              });
            });
          } else {
            console.error("Branch not found")
          }
          break;
        case "n":
          //   set nextBranchId for the last choice in the current branch
          if (currentBranch) {
            currentBranch.choices[
              currentBranch.choices.length - 1
            ].nextBranchId = value.trim();
          } else {
            console.error("Branch not found")

          }
          break;
      }
    }
  } catch (error) {
    console.error("Error parsing instructions: ", error);
  }
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    id: uuidv4(),
    description:
      "Create meaningful description based in meaning of conversation",
    branches: branches,
    maxConversationLength: 100,
    db_name: "base",
  };
}

// // Test

// const parsedInstructions = parseInstructions(instructions);
//
