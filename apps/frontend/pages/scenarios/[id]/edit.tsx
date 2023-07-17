import { useRouter } from "next/router";
import { Layout } from "../../../src/shared/Layout/Layout";
import { Clickable } from "../../../src/shared/Clickable/Clickable";
import { useModal } from "../../../src/Modal/Modal";

import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { getBasicScenariosDetailsQuery, removeScenarioMutation } from "../gql";
const EditScenarioPage = () => {
  const router = useRouter();
  const [removeScenario, { data, loading, error }] = useMutation(
    removeScenarioMutation
  );
  // const client = useApolloClient();
  const { id } = router.query;

  const [Modal, showModal] = useModal({
    id: "delete-scenario-modal",
    children: <span>Are you sure you want to delete this scenario?</span>,
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
    </Layout>
  );
};

export default EditScenarioPage;
