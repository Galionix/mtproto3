import { useRouter } from "next/router";
import { Layout } from "../../../src/shared/Layout/Layout";
import { Clickable } from "../../../src/shared/Clickable/Clickable";
import { useModal } from "../../../src/Modal/Modal";

import { FaTrash } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import {
  getBasicScenariosDetailsQuery,
  getScenarioQuery,
  removeScenarioMutation,
} from "../gql";
import { EditScenario } from "../components/EditScenario";
import { ScenarioEntity } from "@core/types/server";
import { v3 as uuidv3 } from "uuid";

const EditScenarioPage = () => {
  const router = useRouter();
  const [removeScenario, { data, loading, error }] = useMutation(
    removeScenarioMutation
  );
  // const client = useApolloClient();
  const { id } = router.query;

  const scenarioData = useQuery(getScenarioQuery, { variables: { id } });
  const scenarioLoading = scenarioData.loading;
  const scenarioError = scenarioData.error;
  const scenario = scenarioData?.data?.scenario;

  // const scenarioToEdit:ScenarioEntity = {
  //   ...scenarioData.data.scenario,
  //   db_name: scenarioData.data.scenario.db_name || "",
  //   createdAt: scenarioData.data.scenario.createdAt || "",
  //   updatedAt: scenarioData.data.scenario.updatedAt || "",
  //   maxConversationLength: scenarioData.data.scenario.maxConversationLength || 0,
  //   branches: scenarioData.data.scenario.branches.map(branch => ({
  //     ...branch,
  //     // id: branch.id || 'defaultBranch', // provide a default value if id is not present
  //     // scenario: branch || 'defaultScenario', // provide a default value if scenario is not present
  //   })),
  // }

  console.log({
    scenarioLoading,
    scenarioError,
    scenario,
  });

  const [Modal, { showModal }] = useModal({
    id: "delete-scenario-modal",
    children: () => <span>Are you sure you want to delete this scenario?</span>,
    danger: true,
    onSubmit: async () => {
      await removeScenario({
        variables: {
          id: id as string,
        },
        refetchQueries: [
          {
            query: getBasicScenariosDetailsQuery,
          },
        ],
      });

      router.push("/scenarios");
    },
  });

  return (
    <Layout>
      <h1>Edit Scenario</h1>
      <span>{id}</span>
      <Clickable
        danger
        onClick={() => {
          showModal();
        }}
        text="Delete Scenario"
        icon={FaTrash}
      />
      {Modal}

      <EditScenario scenarioString={JSON.stringify(scenario)} />
    </Layout>
  );
};

export default EditScenarioPage;
