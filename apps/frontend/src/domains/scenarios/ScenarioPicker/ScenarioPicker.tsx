// this component is for easing choosing the scenario.
// it accepts array of scenarios in props and function that will set an id of choosen scenario.
// it renders a simple button, which will on click show actual picker.
// the picker is modal with list of scenarios, which can be choosen.

import { ScenarioEntity } from "@core/types/server";
import { Clickable } from "../../../shared/Clickable/Clickable";
import { useState } from "react";
import { useModal } from "../../../Modal/Modal";
import { AiFillEyeInvisible } from "react-icons/ai";
import { ScenarioRenderer } from "../../../../pages/scenarios/components/ScenarioRenderer/ScenarioRenderer";
import { TextInputWithChoicesList } from "../../../shared/Input/TextInput";

export const ScenarioPicker = (props: {
  scenarios: ScenarioEntity[];
  setScenarioId: (id: string) => void;
}) => {
  const { scenarios, setScenarioId } = props;
  const [previouslySelectedScenarioId, setPreviouslySelectedScenarioId] =
    useState<string>(null);

  const [previewScenario, setPreviewScenario] = useState<ScenarioEntity>(null);

  // prepared set function for setting preview scenario
  // it at first sets null, then immidiately sets new scenario
  const preparedSetPreviewScenario = (scenario: ScenarioEntity) => {
    setPreviewScenario(null);
    setTimeout(() => setPreviewScenario(scenario), 0);
  };

  const [filterText, setFilterText] = useState<string>("");
  const filteredScenarios = !filterText
    ? scenarios
    : scenarios.filter((scenario) =>
        scenario.description.toLowerCase().includes(filterText?.toLowerCase())
      );

  const [PickerModal, { showModal, hideModal }] = useModal({
    id: "scenario_picker_modal",
    // title: `Preview ${previewScenario.description} scenario `,
    titleElement: () => (
      <div className="flex justify-between flex-row items-center">
        <h1>Preview {previewScenario?.description} scenario</h1>
        <Clickable
          primary
          text="Choose scenario"
          onClick={(e) => {
            setScenarioId(previewScenario.id);
            setPreviouslySelectedScenarioId(previewScenario.id);
            setPreviewScenario(null);
            hideModal();
          }}
        />

        <Clickable
          danger
          className="ml-auto"
          icon={AiFillEyeInvisible}
          text="Close"
          onClick={(e) => {
            setPreviewScenario(null);
            hideModal();
          }}
        />
      </div>
    ),
    // titleElement
    children: () => (
      <div className="flex flex-row gap-4">
        <div className="w-1/4 h-fit bg-gray-100 rounded-md p-2 w-full sticky top-0">
          <div>
            <h1>Scenarios</h1>
            <div className="flex flex-row gap-4 p-2 border-b items-center">
              <TextInputWithChoicesList
                choices={scenarios.map((scenario) => scenario.description)}
                placeholder="Filter scenarios"
                value={filterText}
                onChange={(e) => setFilterText(e)}
              />
              <Clickable
                primary
                text="Preview previous scenario"
                onClick={(e) => {
                  const currentIndex = filteredScenarios.findIndex(
                    (scenario) => scenario.id === previewScenario?.id
                  );

                  const nextIndex =
                    currentIndex === 0
                      ? filteredScenarios.length - 1
                      : currentIndex - 1;
                  preparedSetPreviewScenario(filteredScenarios[nextIndex]);
                }}
                className="ml-auto"
              />
              <Clickable
                primary
                text="Preview next scenario"
                onClick={(e) => {
                  const currentIndex = filteredScenarios.findIndex(
                    (scenario) => scenario.id === previewScenario?.id
                  );

                  const nextIndex =
                    filteredScenarios.length - 1 === currentIndex
                      ? 0
                      : currentIndex + 1;
                  preparedSetPreviewScenario(filteredScenarios[nextIndex]);
                }}
              />
            </div>
          </div>
          <section>
            {filteredScenarios.map((scenario) => (
              <div
                onClick={() => {
                  preparedSetPreviewScenario(scenario);
                }}
                key={scenario.id}
                // add hover effect
                className={`flex flex-row gap-4 p-2 border-b
                    ${scenario.id === previewScenario?.id ? "bg-gray-200" : ""}
                    cursor-pointer
                        hover:bg-gray-200
                    `}
              >
                <span>{scenario.id}</span>
                <span>{scenario.description}</span>
              </div>
            ))}
          </section>
        </div>
        <ScenarioRenderer scenario={previewScenario} />
      </div>
    ),
    onCancel: () => {
      setPreviewScenario(null);
      hideModal();
    },
  });

  const previouslySelectedScenarioDescription = scenarios.find(
    (scenario) => scenario.id === previouslySelectedScenarioId
  )?.description;
  const previouslySelectedScenarioPreparedDescription =
    previouslySelectedScenarioDescription?.length > 20
      ? previouslySelectedScenarioDescription.slice(0, 20) + "..."
      : previouslySelectedScenarioDescription;

  return (
    <div>
      {PickerModal}
      <Clickable
        primary
        text={
          previouslySelectedScenarioId
            ? `Change ${previouslySelectedScenarioPreparedDescription} scenario`
            : `Choose scenario`
        }
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          showModal();
          // show modal with list of scenarios
        }}
      />
    </div>
  );
};
