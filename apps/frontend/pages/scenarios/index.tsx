import { useQuery } from "@apollo/client";
import { Layout } from "../../src/shared/Layout/Layout";
import { getBasicScenariosDetailsQuery } from "./gql";
import { Clickable } from "../../src/shared/Clickable/Clickable";
import { CiEdit } from "react-icons/ci";
import { VscDebugStart } from "react-icons/Vsc";
import { AiOutlinePlus } from "react-icons/ai";
import { NoData } from "../../src/shared/NoData/NoData";
import { ScenarioRenderer } from "./components/ScenarioRenderer/ScenarioRenderer";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useModal } from "../../src/Modal/Modal";
import { ScenarioEntity } from "@core/types/server";
import { FaRegCopy } from "react-icons/fa6";

const ScenariosIndexPage = () => {
  const { data, loading } = useQuery(getBasicScenariosDetailsQuery);

  const noScenarios = !data?.scenarios?.length;
  const [previewScenario, setPreviewScenario] = useState<ScenarioEntity>(null);
  // modal containing the preview of the scenario using useModal
  const [PreviewModal, { showModal, hideModal }] = useModal({
    id: "preview_scenario",
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
    // onCancel: hideModal,
    // onSubmit: hideModal,
  });
  return (
    <Layout loading={loading}>
      {PreviewModal}
      {/* <ScenarioRenderer /> */}
      <div className="flex justify-between flex-row items-center">
        <h1>Scenarios</h1>
        <Clickable
          icon={AiOutlinePlus}
          primary
          text="Create new scenario"
          href="/scenarios/create"
        />
      </div>
      {noScenarios && (
        <NoData
          title="No Scenarios"
          message="Create a new scenario to get started."
        />
      )}

      <div className="flex flex-col w-full divide-y divide-solid divide-neutral-300">
        {data?.scenarios?.map((scenario, index) => (
          <div
            className="flex flex-row items-center gap-3 p-2 "
            key={scenario.id}
          >
            <span
              className="
            w-[300px]
            "
            >
              {index + 1}. {scenario.description}
            </span>
            <span className="text-neutral-500">
              branches: {scenario.branches?.length}
            </span>
            {/* copy id */}
            <Clickable
              // primary
              icon={FaRegCopy}
              comp="link"
              href=""
              text={scenario.id}
              onClick={() => {
                navigator.clipboard.writeText(scenario.id);
              }}
              title="copy id"
            />
            <Clickable
              className="ml-auto"
              // primary
              comp="link"
              text="Edit"
              //   onClick={() => {
              //     navigate(`/scenarios/${scenario.id}/edit`);
              //   }}
              icon={CiEdit}
              href={`/scenarios/${scenario.id}/edit`}
              title="edit"
            />
            <Clickable
              primary
              text="View"
              onClick={() => {
                showModal();
                setPreviewScenario(scenario as ScenarioEntity);
              }}
              icon={AiFillEye}
              title="view"
            />

            <Clickable
              // primary
              //   onClick={() => {
              //     navigate(`/scenarios/${scenario.id}/test`);
              //   }}
              comp="link"
              text="Test"
              icon={VscDebugStart}
              href={`/scenarios/${scenario.id}/test`}
              title="test"
            />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ScenariosIndexPage;
