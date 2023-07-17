import { graphql } from "../../apollo/codegen";

export const getBasicScenariosDetailsQuery = graphql(`
  query scenarios {
    scenarios {
      id
      description
      createdAt
      branches {
        id
        choices {
          id
          request
          responses {
            text
          }
        }
      }
    }
  }
`);

export const getScenarioQuery = graphql(`
  query scenario($id: String!) {
    scenario(id: $id) {
      id
      description
      createdAt
      branches {
        id
        choices {
          id
          request
          nextBranchId
          responses {
            id
            text
            type
          }
        }
      }
    }
  }
`);


export const removeScenarioMutation = graphql(`
  mutation removeScenario($id: String!) {
    removeScenario(id: $id)
  }
`);

export const createScenarioMutation = graphql(`
  mutation createScenario($createScenarioInput: CreateScenarioInput!) {
    createScenario(scenarioInput: $createScenarioInput) {
      id
      branches {
        id
        description
        choices {
          id
        }
      }
    }
  }
`);
