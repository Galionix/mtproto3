import { useRouter } from "next/router";
import { Layout } from "../../../src/shared/Layout/Layout";
import { Clickable } from "../../../src/shared/Clickable/Clickable";
import { Modal } from "../../../src/Modal/Modal";

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

  return (
    <Layout>
      <h1>Edit Scenario</h1>
      <span>{id}</span>
      <Clickable
        danger
        onClick={() => {
          const modal = document.getElementById(
            "delete-scenario-modal"
          ) as HTMLDialogElement;
          modal.showModal();
        }}
        text="Delete Scenario"
        icon={FaTrash}
      />
      <Modal
        danger={true}
        id="delete-scenario-modal"
        onSubmit={async () => {
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
        }}
      >
        <h1>Are you sure you want to delete this scenario?</h1>
      </Modal>
    </Layout>
  );
};

export default EditScenarioPage;
