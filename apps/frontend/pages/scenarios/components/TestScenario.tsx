import { ScenarioEntity } from "@core/types/server";
import { EditableTabs } from "../../../src/EditableTabs/EditableTabs";
import { RenderMessage } from "../../../src/shared/RenderMessage";
import { useState } from "react";
import { TTab, useTestScenarioStore } from "../[id]/testStore";
import {
  getBotResponses,
  getNextBranchId,
} from "../../../src/simulation/scenarioDebug";

export const TestScenario = ({ scenario }: { scenario: ScenarioEntity }) => {
  const [selectedTab, setSelectedTab] = useState<TTab>(null);

  const { tabs, setTabs } = useTestScenarioStore();

  const branches = scenario?.branches;
  const userInput = selectedTab?.content ? selectedTab.content.split("\n") : [];

  const botResponse = getBotResponses(scenario, userInput) || [];
  console.log("botResponse: ", botResponse);

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

  return (
    <div>
      <div className="col-span-4 row-span-1 bg-gray-100 rounded-md p-2">
        <h1>Test Scenario</h1>
        <p>{scenario?.description}</p>
      </div>
      <div className="grid grid-cols-3 gap-4 pt-1 h-full">
        <div>
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
        <div className="sticky top-0 bg-gray-100 rounded-md p-2 h-fit">
          <h1>Result:</h1>
          <div className="flex flex-col gap-2">
            {joinedMessages.map((message, index) => (
              <RenderMessage
                message={message?.message as any}
                sender={message?.sender as any}
                key={index}
              />
            ))}
            <span className="text-teal-500 text-center">
              Next branch id: {nextBranchId}
            </span>
          </div>
        </div>
        <div className="sticky top-0 p-2 h-fit">
          <h1>User Input</h1>
          <EditableTabs
            tabs={tabs}
            setTabs={setTabs}
            onSelect={setSelectedTab}
          />
        </div>
      </div>
    </div>
  );
};

const BranchRenderer = ({ branch, index, active }) => (
  <div
    className={
      "grid items-center gap-1 px-1 border-teal-400" +
      (active ? " bg-teal-500" : "")
    }
    key={index}
  >
    <span>
      {index + 1}. {branch.id}
    </span>
    <span>Choices:</span>
    <ul className="grid grid-rows-2 items-center gap-1">
      {branch.choices.map((choice, index) => (
        <ChoiceRenderer choice={choice} key={choice.id} />
      ))}
    </ul>
  </div>
);

const ChoiceRenderer = ({ choice }) => (
  <div key={choice.id} className="bg-gray-100 rounded-md p-2">
    <li>
      <b>{choice.request}</b>
      <ul className="pl-2 grid grid-rows-2 items-center gap-1">
        {choice.responses.map((response, index) => (
          <li key={response.id}>{response.text}</li>
        ))}
      </ul>
    </li>
  </div>
);
