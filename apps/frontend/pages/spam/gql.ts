import { graphql } from "../../apollo/codegen";

// spamMessages
export const querySpamMessages = graphql(`
  query spamMessages {
    spamMessages {
      id
      text
      type
      db_name
      scenarioIdForSpam
    }
  }
`);

//  createSpamMessage
export const mutationCreateSpamMessage = graphql(`
  mutation createSpamMessage($createSpamMessageInput: CreateMessageInput!) {
    createSpamMessage(createSpamMessageInput: $createSpamMessageInput) {
      id
      text
      type
      db_name
    }
  }
`);

// removeSpamMessage
export const mutationRemoveSpamMessage = graphql(`
  mutation removeSpamMessage($id: String!) {
    removeSpamMessage(id: $id)
  }
`);

// spamMessagesByDbName
export const querySpamMessagesByDbName = graphql(`
  query spamMessagesByDbName($db_name: String!) {
    spamMessagesByDbName(db_name: $db_name) {
      id
      text
      type
      db_name
    }
  }
`);
