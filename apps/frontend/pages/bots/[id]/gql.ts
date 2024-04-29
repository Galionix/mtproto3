import { graphql } from "../../../apollo/codegen";

export const getBotQuery = graphql(`
  query Bot($botDbId: String!) {
    bot(botDbId: $botDbId) {
      afterTaskDelay
      afterTaskIdleTime
      answersDb
      api_hash
      api_id
      botDbId
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
  mutation updateBot($botDbId: String!, $updateBotInput: UpdateBotInput!) {
    updateBot(botDbId: $botDbId, updateBotInput: $updateBotInput) {
      afterTaskDelay
      afterTaskIdleTime
      answersDb
      api_hash
      api_id
      botDbId
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
  mutation setPhoto($botDbId: String!, $photoName: String!) {
    setPhoto(botDbId: $botDbId, photoName: $photoName) {
      bot {
        botDbId
      }
    }
  }
`);

export const removePhotosMutation = graphql(`
  mutation removePhotos($botDbId: String!) {
    removePhotos(botDbId: $botDbId) {
      bot {
        botDbId
      }
    }
  }
`);
// setBio
export const setBioMutation = graphql(`
  mutation setBio(
    $botDbId: String!
    $firstName: String!
    $lastName: String!
    $about: String!
  ) {
    setBio(
      botDbId: $botDbId
      firstName: $firstName
      lastName: $lastName
      about: $about
    ) {
      bot {
        botDbId
      }
    }
  }
`);

// hidePhoneNumber
export const hidePhoneNumberMutation = graphql(`
  mutation hidePhoneNumber($botDbId: String!) {
    hidePhoneNumber(botDbId: $botDbId) {
      bot {
        botDbId
      }
    }
  }
`);

// startAccountsRegProcess
export const startAccountsRegProcessMutation = graphql(`
  mutation startAccountsRegProcess($botDbId: String!) {
    startAccountsRegProcess(botDbId: $botDbId)
  }
`);

// isCodeRequestedFromAccountsRegProcess
export const isCodeRequestedFromAccountsRegProcessQuery = graphql(`
  query isCodeRequestedFromAccountsRegProcess {
    isCodeRequestedFromAccountsRegProcess
  }
`);

// stopAccountsRegProcess
export const stopAccountsRegProcessMutation = graphql(`
  mutation stopAccountsRegProcess {
    stopAccountsRegProcess
  }
`);

// provideCodeForRegistration
export const provideCodeForRegistrationMutation = graphql(`
  mutation provideCodeForRegistration($code: String!) {
    provideCodeForRegistration(code: $code)
  }
`);