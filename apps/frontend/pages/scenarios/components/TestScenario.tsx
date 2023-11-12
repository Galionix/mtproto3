import { ScenarioEntity } from "@core/types/server";
import { getBotResponses, getNextBranchId } from "@core/functions";
import { EditableTabs } from "../../../src/EditableTabs/EditableTabs";
import { RenderMessage } from "../../../src/shared/RenderMessage";
import { useState } from "react";
import { TTab, useTestScenarioStore } from "../[id]/testStore";
// import {
//   getBotResponses,
//   getNextBranchId,
// } from "../../../src/simulation/scenarioDebug";
import { Clickable } from "../../../src/shared/Clickable/Clickable";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import cx from "classnames";

export const TestScenario = ({ scenario }: { scenario: ScenarioEntity }) => {
  const [selectedTab, setSelectedTab] = useState<TTab>(null);
  const [showUserInput, setShowUserInput] = useState<boolean>(false);
  const [showBranches, setShowBranches] = useState<boolean>(false);

  const { tabs, setTabs } = useTestScenarioStore();

  const branches = scenario?.branches;
  const userInput = selectedTab?.content ? selectedTab.content.split("\n") : [];

  const botResponse = getBotResponses(scenario, userInput) || [];

  const botMessages = botResponse.map((message) => ({
    sender: "bot",
    message,
  }));
  const userMessages = userInput.map((message) => ({
    sender: "user",
    message: { type: "TEXT", text: message },
  }));
  const joinedMessages = userMessages.flatMap((message, index) => [
    message,
    botMessages[index],
  ]);
  const nextBranchId = getNextBranchId(scenario, userInput) || "";

  // const gridClass =
  //   showUserInput && showBranches
  //     ? "grid-cols-3"
  //     : showUserInput || showBranches
  //     ? "grid-cols-2"
  //     : "grid-cols-1";
  //

  return (
    <div>
      <div
        className={cx(
          "col-span-4 row-span-1 bg-gray-100 rounded-md p-2 w-full flex justify-between items-center gap-2"
        )}
      >
        <h1>Test Scenario:</h1>
        <p>{scenario?.description}</p>
        <Clickable
          className="ml-auto"
          icon={showUserInput ? AiFillEyeInvisible : AiFillEye}
          onClick={() => setShowUserInput(!showUserInput)}
          title="Show user input"
        />
        <Clickable
          icon={showBranches ? AiFillEyeInvisible : AiFillEye}
          onClick={() => setShowBranches(!showBranches)}
          title="Show branches"
        />
      </div>
      <div
        className={cx("grid gap-4 pt-1 h-full", {
          "grid-cols-3": showUserInput && showBranches,
          "grid-cols-2": showUserInput || showBranches,
          "grid-cols-1": !showUserInput && !showBranches,
        })}
      >
        <div key={"result"} className=" top-0 bg-gray-100 rounded-md p-2 h-fit">
          <h1>Result:</h1>
          <div className="flex flex-col gap-2">
            {joinedMessages.map((message, index) => {
              // const choiceKey = scenario?.
              const allChoices = scenario?.branches.flatMap((branch) =>
                branch.choices.map((choice) => choice)
              );
              const choiceKey = allChoices?.find(
                (choice) =>
                  choice.responses.find((response) => message?.message?.text)
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
              )?.key;
              return (
                <RenderMessage
                  choiceKey={choiceKey}
                  message={message?.message as any}
                  sender={message?.sender as any}
                  key={index}
                />
              );
            })}
            <span className="text-teal-500 text-center">
              Next branch id: {nextBranchId}
            </span>
          </div>
        </div>
        {showUserInput && (
          <div
            key={"user-input"}
            className="sticky top-0 p-2 h-fit bg-gray-100 rounded-md p-2"
          >
            <h1>User Input</h1>
            <EditableTabs
              tabs={tabs}
              setTabs={setTabs}
              onSelect={setSelectedTab}
            />
          </div>
        )}
        {showBranches && (
          <div key={"branches"}>
            <h1>Scenario Data</h1>
            <div>
              {scenario && (
                <>
                  <h2>Branches:</h2>
                  <div className="flex flex-col">
                    {branches?.map((branch, index) => (
                      <BranchRenderer
                        branch={branch}
                        index={index}
                        key={index}
                        active={branch.id === nextBranchId}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const BranchRenderer = ({ branch, index, active }) => {
  const handleClickOnBranch = () => {
    // scrill to the branch with the id

    const element = document.getElementById(branch.id);
    if (!element) return;
    element.scrollIntoView();
  };
  return (
    <div
      className={
        "grid items-center gap-1 px-1 border-teal-400" +
        (active ? " bg-teal-500" : "")
      }
      key={index}
    >
      <Clickable onClick={handleClickOnBranch}>
        {index + 1}. {branch.id}
      </Clickable>
      <span>Choices:</span>
      <ul className="grid grid-rows-2 items-center gap-1">
        {branch.choices.map((choice, index) => (
          <ChoiceRenderer choice={choice} key={choice.key} />
        ))}
      </ul>
    </div>
  );
};

const ChoiceRenderer = ({ choice }) => (
  <div key={choice.key} className="bg-gray-100 rounded-md p-2">
    <li>
      <b>{choice.request}</b>
      <ul className="pl-2 grid grid-rows-2 items-center gap-1">
        {choice.responses.map((response, index) => (
          <li key={index}>{response.text}</li>
        ))}
      </ul>
    </li>
  </div>
);
