import { useQuery } from "@apollo/client";
import { Layout } from "../../src/shared/Layout/Layout";
import { getBasicScenariosDetailsQuery } from "./gql";
import { Clickable } from "../../src/shared/Clickable/Clickable";
import { CiEdit } from "react-icons/ci";
import { VscDebugStart } from "react-icons/Vsc";
import { AiOutlinePlus } from "react-icons/ai";

const ScenariosIndexPage = () => {
  const { data, loading } = useQuery(getBasicScenariosDetailsQuery);

  return (
    <Layout loading={loading}>
      <div className="flex justify-between flex-row items-center">
        <h1>Scenarios</h1>
        <Clickable
          icon={AiOutlinePlus}
          primary
          text="Create new scenario"
          href="/scenarios/create"
        />
      </div>

      <div className="flex flex-col w-full divide-y divide-solid divide-neutral-300">
        {data?.scenarios?.map((scenario, index) => (
          <div
            className="flex flex-row items-center gap-1 p-2 "
            key={scenario.id}
          >
            <span>
              {index + 1}. {scenario.description}
            </span>
            <Clickable
              className="ml-auto"
              primary
              //   onClick={() => {
              //     navigate(`/scenarios/${scenario.id}/edit`);
              //   }}
              icon={CiEdit}
              href={`/scenarios/${scenario.id}/edit`}
              title="edit"
            />
            <Clickable
              primary
              //   onClick={() => {
              //     navigate(`/scenarios/${scenario.id}/test`);
              //   }}
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
