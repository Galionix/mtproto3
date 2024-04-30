import { gql } from "@apollo/client";
import { graphql } from "../../apollo/codegen";


export const getBotsQuery = graphql(`
  query Bots {
    bots {
      afterTaskDelay
      afterTaskIdleTime
      answersDb
      api_hash
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
      phone
      proxy
    }
  }
`);

export const createBotMutation = graphql(`
  mutation CreateBot($createBotInput: CreateBotInput!) {
    createBot(createBotInput: $createBotInput) {
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

export const removeBotMutation = graphql(`
  mutation removeBot($botDbId: String!) {
    removeBot(botDbId: $botDbId) {
      botDbId
    }
  }
`);

export const getBotStatesQuery = graphql(`
  query getState {
    getBotStates {
      bot {
        api_id
        botDbId
        api_hash
      }
      requestedPhoneNumber
      requestedPhoneCode
      isRunning
      isStarted
      isStopped
      eventLogs {
        log_event
        event_date
        event_message
      }
      childProcess {
        pid
      }
    }
  }
`);

export const restartBotMutation = graphql(`
  mutation restartBot($botDbId: String!) {
    restartBot(botDbId: $botDbId) {
      botDbId
    }
  }
`);

export const stopBotMutation = graphql(`
  mutation stopBot($botDbId: String!) {
    stopBot(botDbId: $botDbId) {
      isRunning
    }
  }
`);

export const getBotStateQuery = graphql(`
  query getBotState($botDbId: String!) {
    getBotState(botDbId: $botDbId) {
      bot {
        api_id
        api_hash
      }
      requestedPhoneNumber
      requestedPhoneCode
      requested2FACode
      isRunning
      isStarted
      isStopped
      eventLogs {
        log_event
        event_date
        event_message
      }
      childProcess {
        pid
      }
    }
  }
`);
export const getBotStateLogs = graphql(`
  query getBotStateLogs($botDbId: String!) {
    getBotState(botDbId: $botDbId) {
      eventLogs {
        log_event
        event_date
        event_message
      }
    }
  }
`);

// query array of strings
export const getAvailableBotsByFilesQuery = graphql(`
  query getAvailableBotsByFiles {
    getAvailableBotsByFiles
  }
`);