import { graphql } from "../../../apollo/codegen";

export const getBotQuery = graphql(`
  query Bot($api_id: Int!) {
    bot(api_id: $api_id) {
      afterTaskDelay
      afterTaskIdleTime
      answersDb
      api_hash
      api_id
      behaviorModel
      botName
      clientState
      clientStateUpdateTime
      copyFrom
      readDelay
      replacements
      dmScenarioNames
      sessionString
      spamDBname
      taskOrder
      typeDelayMultiplier
      voice
    }
  }
`);

// updateBot
export const updateBotMutation = graphql(`
  mutation updateBot($api_id: Int!, $updateBotInput: UpdateBotInput!) {
    updateBot(api_id: $api_id, updateBotInput: $updateBotInput) {
      afterTaskDelay
      afterTaskIdleTime
      answersDb
      api_hash
      api_id
      behaviorModel
      botName
      clientState
      copyFrom
      readDelay
      replacements
      dmScenarioNames
      sessionString
      spamDBname
      taskOrder
      voice
    }
  }
`);

export const setPhotoMutation = graphql(`
  mutation setPhoto($api_id: Int!, $photoName: String!) {
    setPhoto(api_id: $api_id, photoName: $photoName) {
      bot {
        api_id
      }
    }
  }
`);

export const removePhotosMutation = graphql(`
  mutation removePhotos($api_id: Int!) {
    removePhotos(api_id: $api_id) {
      bot {
        api_id
      }
    }
  }
`);
// setBio
export const setBioMutation = graphql(`
  mutation setBio($api_id: Int!, $firstName: String!, $lastName: String!, $about: String!) {
    setBio(api_id: $api_id, firstName: $firstName, lastName: $lastName, about: $about) {
      bot {
        api_id
      }
    }
  }
`);