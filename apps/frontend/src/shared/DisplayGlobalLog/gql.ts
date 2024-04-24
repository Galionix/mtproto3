import { graphql } from "../../../apollo/codegen";
/*
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
*/

//globalLog({limit})
export const queryGlobalLog = graphql(`
  query globalLog($limit: Int!) {
    globalLog(limit: $limit) {
      id
      event_message
      log_event
      event_date
      details
      api_id
    }
  }
`);

// globalLogFromDate

export const queryGlobalLogFromDate = graphql(`
  query globalLogFromDate($date: DateTime!) {
    globalLogFromDate(date: $date) {
      id
      event_message
      log_event
      event_date
      details
      api_id
    }
  }
`);
