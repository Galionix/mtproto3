import { useQuery } from "@apollo/client";
import { Layout } from "../../src/shared/Layout/Layout";
import { getBasicScenariosDetailsQuery } from "./gql";
import { Clickable } from "../../src/shared/Clickable/Clickable";
import { CiEdit } from "react-icons/ci";
import { VscDebugStart } from "react-icons/Vsc";
import { useRouter } from "next/router";

const ScenariosIndexPage = () => {
  //   const router = useRouter();
  //   const navigate = (path: string) => {
  //     router.push(path);
  //   };
  const { data, loading } = useQuery(getBasicScenariosDetailsQuery);
  console.log("scenarios: ", data);
  return (
    <Layout loading={loading}>
      <h1>Scenarios</h1>

      <div className="flex flex-col">
        {data?.scenarios?.map((scenario, index) => (
          <div className="flex flex-row items-center gap-1" key={scenario.id}>
            <span>
              {index + 1}. {scenario.description}
            </span>
            <Clickable
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
