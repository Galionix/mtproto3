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
      scenario
      sessionString
      spamDBname
      taskOrder
      typeDelayMultiplier
      voice
    }
  }
`);
