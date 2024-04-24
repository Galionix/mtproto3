import { DocumentationSlice } from "../../src/shared/DocumentationSlice/DocumentationSlice";
import { Layout } from "../../src/shared/Layout/Layout";
import { EditScenario } from "./components/EditScenario";

const CreateScenarioPage = () => {
  return (
    <Layout>
      <DocumentationSlice slice="Creating new scenario">
        <h1>Create Scenario</h1>
      </DocumentationSlice>
      <EditScenario />
    </Layout>
  );
};

export default CreateScenarioPage;
