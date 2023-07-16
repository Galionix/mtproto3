import { useRouter } from "next/router";
import { Layout } from "../../../src/shared/Layout/Layout";

const EditScenarioPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout>
      <h1>Edit Scenario</h1>
      <span>{id}</span>
    </Layout>
  );
};

export default EditScenarioPage;
