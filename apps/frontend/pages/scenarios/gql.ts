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
          nextBranchId
          responses {
            text
            audio
          }
        }
      }
    }
  }
`);

export const getScenarioQuery = graphql(`
  query scenario($id: String!) {
    scenario(id: $id) {
      db_name
      updatedAt
      maxConversationLength
      id
      description
      createdAt
      branches {
        index
        id
        choices {
          index
          id
          request
          nextBranchId
          responses {
            index
            id
            text
            type
            photo
            video
            audio
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
