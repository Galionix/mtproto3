import { ScenarioEntity } from "@core/types/server";
import { useEffect, useState } from "react";
import { Clickable } from "../../../shared/Clickable/Clickable";
import { useModal } from "../../../Modal/Modal";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ScenarioRenderer } from "../../../../pages/scenarios/components/ScenarioRenderer/ScenarioRenderer";

export const PreviewScenarioButton = (props: {
  scenario: ScenarioEntity;
  showDescription?: boolean;
}) => {
  const { scenario } = props;

  const [previewScenario, setPreviewScenario] = useState<ScenarioEntity>(null);

  const [PreviewModal, { showModal, hideModal }] = useModal({
    id: "preview_scenario" + scenario?.id,
    // title: `Preview ${previewScenario.description} scenario `,
    titleElement: () => (
      <div className="flex justify-between flex-row items-center">
        <h1>Preview {previewScenario?.description} scenario</h1>

        <Clickable
          danger
          className="ml-auto"
          icon={AiFillEyeInvisible}
          text="Close"
          onClick={() => {
            setPreviewScenario(null);
            hideModal();
          }}
        />
      </div>
    ),
    // titleElement
    children: () => (
      <div>
        <ScenarioRenderer scenario={previewScenario} />
      </div>
    ),
    onCancel: () => {
      setPreviewScenario(null);
      hideModal();
    },
  });

  //   useEffect(() => {
  //     // if (previewScenario) {
  //     //   showModal();
  //     // } else {
  //     //   hideModal();
  //     // }
  //   }, [hideModal, previewScenario, scenario, showModal]);
  if (!scenario) return null;
  const basicIdText = scenario?.description || scenario?.id;
  const textToShow =
    basicIdText.length > 20 ? basicIdText.slice(0, 20) + "..." : basicIdText;

  return (
    <div>
      <Clickable
        primary
        text={props?.showDescription ? `View ${textToShow}` : "View"}
        // onClick={() => {
        //   showModal();
        //   setPreviewScenario(scenario as ScenarioEntity);
        // }}
        icon={AiFillEye}
        title="view"
        onClick={() => {
          showModal();
          setPreviewScenario(scenario);
        }}
      />
      {PreviewModal}
    </div>
  );
};
