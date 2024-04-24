/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query Bot($api_id: Int!) {\n    bot(api_id: $api_id) {\n      afterTaskDelay\n      afterTaskIdleTime\n      answersDb\n      api_hash\n      api_id\n      behaviorModel\n      botName\n      clientState\n      clientStateUpdateTime\n      copyFrom\n      readDelay\n      replacements\n      dmScenarioNames\n      sessionString\n      spamDBname\n      taskOrder\n      typeDelayMultiplier\n      voice\n    }\n  }\n": types.BotDocument,
    "\n  mutation updateBot($api_id: Int!, $updateBotInput: UpdateBotInput!) {\n    updateBot(api_id: $api_id, updateBotInput: $updateBotInput) {\n      afterTaskDelay\n      afterTaskIdleTime\n      answersDb\n      api_hash\n      api_id\n      behaviorModel\n      botName\n      clientState\n      copyFrom\n      readDelay\n      replacements\n      dmScenarioNames\n      sessionString\n      spamDBname\n      taskOrder\n      voice\n    }\n  }\n": types.UpdateBotDocument,
    "\n  mutation setPhoto($api_id: Int!, $photoName: String!) {\n    setPhoto(api_id: $api_id, photoName: $photoName) {\n      bot {\n        api_id\n      }\n    }\n  }\n": types.SetPhotoDocument,
    "\n  mutation removePhotos($api_id: Int!) {\n    removePhotos(api_id: $api_id) {\n      bot {\n        api_id\n      }\n    }\n  }\n": types.RemovePhotosDocument,
    "\n  mutation setBio($api_id: Int!, $firstName: String!, $lastName: String!, $about: String!) {\n    setBio(api_id: $api_id, firstName: $firstName, lastName: $lastName, about: $about) {\n      bot {\n        api_id\n      }\n    }\n  }\n": types.SetBioDocument,
    "\n  mutation hidePhoneNumber($api_id: Int!) {\n    hidePhoneNumber(api_id: $api_id) {\n      bot {\n        api_id\n      }\n    }\n  }\n": types.HidePhoneNumberDocument,
    "\n  query Bots {\n    bots {\n      afterTaskDelay\n      afterTaskIdleTime\n      answersDb\n      api_hash\n      api_id\n      behaviorModel\n      botName\n      clientState\n      clientStateUpdateTime\n      copyFrom\n      readDelay\n      replacements\n      dmScenarioNames\n      sessionString\n      spamDBname\n      taskOrder\n      typeDelayMultiplier\n      voice\n    }\n  }\n": types.BotsDocument,
    "\n  mutation CreateBot($createBotInput: CreateBotInput!) {\n    createBot(createBotInput: $createBotInput) {\n      afterTaskDelay\n      afterTaskIdleTime\n      answersDb\n      api_hash\n      api_id\n      behaviorModel\n      botName\n      clientState\n      clientStateUpdateTime\n      copyFrom\n      readDelay\n      replacements\n      dmScenarioNames\n      sessionString\n      spamDBname\n      taskOrder\n      typeDelayMultiplier\n      voice\n    }\n  }\n": types.CreateBotDocument,
    "\n  mutation removeBot($api_id: Int!) {\n    removeBot(api_id: $api_id) {\n      api_id\n    }\n  }\n": types.RemoveBotDocument,
    "\n  query getState {\n    getBotStates {\n      bot {\n        api_id\n        api_hash\n      }\n      requestedPhoneNumber\n      requestedPhoneCode\n      isRunning\n      isStarted\n      isStopped\n      eventLogs {\n        log_event\n        event_date\n        event_message\n      }\n      childProcess {\n        pid\n      }\n    }\n  }\n": types.GetStateDocument,
    "\n  mutation restartBot($api_id: Int!) {\n    restartBot(api_id: $api_id) {\n      api_id\n    }\n  }\n": types.RestartBotDocument,
    "\n  mutation stopBot($api_id: Int!) {\n    stopBot(api_id: $api_id) {\n      isRunning\n    }\n  }\n": types.StopBotDocument,
    "\n  query getBotState($api_id: Int!) {\n    getBotState(id: $api_id) {\n      bot {\n        api_id\n        api_hash\n      }\n      requestedPhoneNumber\n      requestedPhoneCode\n      requested2FACode\n      isRunning\n      isStarted\n      isStopped\n      eventLogs {\n        log_event\n        event_date\n        event_message\n      }\n      childProcess {\n        pid\n      }\n    }\n  }\n": types.GetBotStateDocument,
    "\n  query getBotStateLogs($api_id: Int!) {\n    getBotState(id: $api_id) {\n      eventLogs {\n        log_event\n        event_date\n        event_message\n      }\n    }\n  }\n": types.GetBotStateLogsDocument,
    "\n  query scenarios {\n    scenarios {\n      id\n      description\n      createdAt\n      branches {\n        id\n        choices {\n          id\n          request\n          nextBranchId\n          responses {\n            text\n            audio\n          }\n        }\n      }\n    }\n  }\n": types.ScenariosDocument,
    "\n  query scenario($id: String!) {\n    scenario(id: $id) {\n      db_name\n      updatedAt\n      maxConversationLength\n      id\n      description\n      createdAt\n      branches {\n        index\n        id\n        choices {\n          index\n          id\n          request\n          nextBranchId\n          responses {\n            index\n            id\n            text\n            type\n            photo\n            video\n            audio\n          }\n        }\n      }\n    }\n  }\n": types.ScenarioDocument,
    "\n  mutation removeScenario($id: String!) {\n    removeScenario(id: $id)\n  }\n": types.RemoveScenarioDocument,
    "\n  mutation createScenario($createScenarioInput: CreateScenarioInput!) {\n    createScenario(scenarioInput: $createScenarioInput) {\n      id\n      branches {\n        id\n        description\n        choices {\n          id\n        }\n      }\n    }\n  }\n": types.CreateScenarioDocument,
    "\n  query spamMessages {\n    spamMessages {\n      id\n      text\n      type\n      db_name\n      scenarioIdForSpam\n    }\n  }\n": types.SpamMessagesDocument,
    "\n  mutation createSpamMessage($createSpamMessageInput: CreateMessageInput!) {\n    createSpamMessage(createSpamMessageInput: $createSpamMessageInput) {\n      id\n      text\n      type\n      db_name\n    }\n  }\n": types.CreateSpamMessageDocument,
    "\n  mutation updateSpamMessage(\n    $id: String!\n    $updateSpamMessageInput: CreateMessageInput!\n  ) {\n    updateSpamMessage(id: $id, updateSpamMessageInput: $updateSpamMessageInput) {\n      id\n      text\n      type\n      db_name\n    }\n  }\n": types.UpdateSpamMessageDocument,
    "\n  mutation removeSpamMessage($id: String!) {\n    removeSpamMessage(id: $id)\n  }\n": types.RemoveSpamMessageDocument,
    "\n  query spamMessagesByDbName($db_name: String!) {\n    spamMessagesByDbName(db_name: $db_name) {\n      id\n      text\n      type\n      db_name\n    }\n  }\n": types.SpamMessagesByDbNameDocument,
    "\n  mutation joinGroups($joinGroupsInput: JoinGroupsInput!) {\n    joinGroups(JoinGroupsInput: $joinGroupsInput) {\n      bot {\n        api_id\n      }\n      joining_groups\n    }\n  }\n": types.JoinGroupsDocument,
    "\n  query startBots {\n    startBots {\n      api_id\n    }\n  }\n": types.StartBotsDocument,
    "\n  query stopBots {\n    stopBots {\n      api_id\n    }\n  }\n": types.StopBotsDocument,
    "\n  query startBotsImmediately {\n    startBotsImmediately {\n      api_id\n    }\n  }\n": types.StartBotsImmediatelyDocument,
    "\n  mutation providePhoneNumber($api_id: Int!, $phoneNumber: String!) {\n    providePhoneNumber(api_id: $api_id, phoneNumber: $phoneNumber) {\n      bot {\n        api_id\n        api_hash\n      }\n      requestedPhoneNumber\n      requestedPhoneCode\n      isRunning\n      isStarted\n      isStopped\n      eventLogs {\n        log_event\n        event_date\n        event_message\n      }\n      childProcess {\n        pid\n      }\n    }\n  }\n": types.ProvidePhoneNumberDocument,
    "\n  mutation providePhoneCode($api_id: Int!, $phoneCode: String!) {\n    providePhoneCode(api_id: $api_id, phoneCode: $phoneCode) {\n      bot {\n        api_id\n        api_hash\n      }\n      requestedPhoneNumber\n      requestedPhoneCode\n      isRunning\n      isStarted\n      isStopped\n      eventLogs {\n        log_event\n        event_date\n        event_message\n      }\n      childProcess {\n        pid\n      }\n    }\n  }\n": types.ProvidePhoneCodeDocument,
    "\n  mutation provide2FACode($api_id: Int!, $code: String!) {\n    provide2FACode(api_id: $api_id, code: $code) {\n      bot {\n        api_id\n        api_hash\n      }\n      requestedPhoneNumber\n      requestedPhoneCode\n      isRunning\n      isStarted\n      isStopped\n      eventLogs {\n        log_event\n        event_date\n        event_message\n      }\n      childProcess {\n        pid\n      }\n    }\n  }\n": types.Provide2FaCodeDocument,
    "\n  query globalLog($limit: Int!) {\n    globalLog(limit: $limit) {\n      id\n      event_message\n      log_event\n      event_date\n      details\n      api_id\n    }\n  }\n": types.GlobalLogDocument,
    "\n  query globalLogFromDate($date: DateTime!) {\n    globalLogFromDate(date: $date) {\n      id\n      event_message\n      log_event\n      event_date\n      details\n      api_id\n    }\n  }\n": types.GlobalLogFromDateDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Bot($api_id: Int!) {\n    bot(api_id: $api_id) {\n      afterTaskDelay\n      afterTaskIdleTime\n      answersDb\n      api_hash\n      api_id\n      behaviorModel\n      botName\n      clientState\n      clientStateUpdateTime\n      copyFrom\n      readDelay\n      replacements\n      dmScenarioNames\n      sessionString\n      spamDBname\n      taskOrder\n      typeDelayMultiplier\n      voice\n    }\n  }\n"): (typeof documents)["\n  query Bot($api_id: Int!) {\n    bot(api_id: $api_id) {\n      afterTaskDelay\n      afterTaskIdleTime\n      answersDb\n      api_hash\n      api_id\n      behaviorModel\n      botName\n      clientState\n      clientStateUpdateTime\n      copyFrom\n      readDelay\n      replacements\n      dmScenarioNames\n      sessionString\n      spamDBname\n      taskOrder\n      typeDelayMultiplier\n      voice\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBot($api_id: Int!, $updateBotInput: UpdateBotInput!) {\n    updateBot(api_id: $api_id, updateBotInput: $updateBotInput) {\n      afterTaskDelay\n      afterTaskIdleTime\n      answersDb\n      api_hash\n      api_id\n      behaviorModel\n      botName\n      clientState\n      copyFrom\n      readDelay\n      replacements\n      dmScenarioNames\n      sessionString\n      spamDBname\n      taskOrder\n      voice\n    }\n  }\n"): (typeof documents)["\n  mutation updateBot($api_id: Int!, $updateBotInput: UpdateBotInput!) {\n    updateBot(api_id: $api_id, updateBotInput: $updateBotInput) {\n      afterTaskDelay\n      afterTaskIdleTime\n      answersDb\n      api_hash\n      api_id\n      behaviorModel\n      botName\n      clientState\n      copyFrom\n      readDelay\n      replacements\n      dmScenarioNames\n      sessionString\n      spamDBname\n      taskOrder\n      voice\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation setPhoto($api_id: Int!, $photoName: String!) {\n    setPhoto(api_id: $api_id, photoName: $photoName) {\n      bot {\n        api_id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation setPhoto($api_id: Int!, $photoName: String!) {\n    setPhoto(api_id: $api_id, photoName: $photoName) {\n      bot {\n        api_id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removePhotos($api_id: Int!) {\n    removePhotos(api_id: $api_id) {\n      bot {\n        api_id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation removePhotos($api_id: Int!) {\n    removePhotos(api_id: $api_id) {\n      bot {\n        api_id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation setBio($api_id: Int!, $firstName: String!, $lastName: String!, $about: String!) {\n    setBio(api_id: $api_id, firstName: $firstName, lastName: $lastName, about: $about) {\n      bot {\n        api_id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation setBio($api_id: Int!, $firstName: String!, $lastName: String!, $about: String!) {\n    setBio(api_id: $api_id, firstName: $firstName, lastName: $lastName, about: $about) {\n      bot {\n        api_id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation hidePhoneNumber($api_id: Int!) {\n    hidePhoneNumber(api_id: $api_id) {\n      bot {\n        api_id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation hidePhoneNumber($api_id: Int!) {\n    hidePhoneNumber(api_id: $api_id) {\n      bot {\n        api_id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Bots {\n    bots {\n      afterTaskDelay\n      afterTaskIdleTime\n      answersDb\n      api_hash\n      api_id\n      behaviorModel\n      botName\n      clientState\n      clientStateUpdateTime\n      copyFrom\n      readDelay\n      replacements\n      dmScenarioNames\n      sessionString\n      spamDBname\n      taskOrder\n      typeDelayMultiplier\n      voice\n    }\n  }\n"): (typeof documents)["\n  query Bots {\n    bots {\n      afterTaskDelay\n      afterTaskIdleTime\n      answersDb\n      api_hash\n      api_id\n      behaviorModel\n      botName\n      clientState\n      clientStateUpdateTime\n      copyFrom\n      readDelay\n      replacements\n      dmScenarioNames\n      sessionString\n      spamDBname\n      taskOrder\n      typeDelayMultiplier\n      voice\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateBot($createBotInput: CreateBotInput!) {\n    createBot(createBotInput: $createBotInput) {\n      afterTaskDelay\n      afterTaskIdleTime\n      answersDb\n      api_hash\n      api_id\n      behaviorModel\n      botName\n      clientState\n      clientStateUpdateTime\n      copyFrom\n      readDelay\n      replacements\n      dmScenarioNames\n      sessionString\n      spamDBname\n      taskOrder\n      typeDelayMultiplier\n      voice\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBot($createBotInput: CreateBotInput!) {\n    createBot(createBotInput: $createBotInput) {\n      afterTaskDelay\n      afterTaskIdleTime\n      answersDb\n      api_hash\n      api_id\n      behaviorModel\n      botName\n      clientState\n      clientStateUpdateTime\n      copyFrom\n      readDelay\n      replacements\n      dmScenarioNames\n      sessionString\n      spamDBname\n      taskOrder\n      typeDelayMultiplier\n      voice\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeBot($api_id: Int!) {\n    removeBot(api_id: $api_id) {\n      api_id\n    }\n  }\n"): (typeof documents)["\n  mutation removeBot($api_id: Int!) {\n    removeBot(api_id: $api_id) {\n      api_id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getState {\n    getBotStates {\n      bot {\n        api_id\n        api_hash\n      }\n      requestedPhoneNumber\n      requestedPhoneCode\n      isRunning\n      isStarted\n      isStopped\n      eventLogs {\n        log_event\n        event_date\n        event_message\n      }\n      childProcess {\n        pid\n      }\n    }\n  }\n"): (typeof documents)["\n  query getState {\n    getBotStates {\n      bot {\n        api_id\n        api_hash\n      }\n      requestedPhoneNumber\n      requestedPhoneCode\n      isRunning\n      isStarted\n      isStopped\n      eventLogs {\n        log_event\n        event_date\n        event_message\n      }\n      childProcess {\n        pid\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation restartBot($api_id: Int!) {\n    restartBot(api_id: $api_id) {\n      api_id\n    }\n  }\n"): (typeof documents)["\n  mutation restartBot($api_id: Int!) {\n    restartBot(api_id: $api_id) {\n      api_id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation stopBot($api_id: Int!) {\n    stopBot(api_id: $api_id) {\n      isRunning\n    }\n  }\n"): (typeof documents)["\n  mutation stopBot($api_id: Int!) {\n    stopBot(api_id: $api_id) {\n      isRunning\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getBotState($api_id: Int!) {\n    getBotState(id: $api_id) {\n      bot {\n        api_id\n        api_hash\n      }\n      requestedPhoneNumber\n      requestedPhoneCode\n      requested2FACode\n      isRunning\n      isStarted\n      isStopped\n      eventLogs {\n        log_event\n        event_date\n        event_message\n      }\n      childProcess {\n        pid\n      }\n    }\n  }\n"): (typeof documents)["\n  query getBotState($api_id: Int!) {\n    getBotState(id: $api_id) {\n      bot {\n        api_id\n        api_hash\n      }\n      requestedPhoneNumber\n      requestedPhoneCode\n      requested2FACode\n      isRunning\n      isStarted\n      isStopped\n      eventLogs {\n        log_event\n        event_date\n        event_message\n      }\n      childProcess {\n        pid\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getBotStateLogs($api_id: Int!) {\n    getBotState(id: $api_id) {\n      eventLogs {\n        log_event\n        event_date\n        event_message\n      }\n    }\n  }\n"): (typeof documents)["\n  query getBotStateLogs($api_id: Int!) {\n    getBotState(id: $api_id) {\n      eventLogs {\n        log_event\n        event_date\n        event_message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query scenarios {\n    scenarios {\n      id\n      description\n      createdAt\n      branches {\n        id\n        choices {\n          id\n          request\n          nextBranchId\n          responses {\n            text\n            audio\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query scenarios {\n    scenarios {\n      id\n      description\n      createdAt\n      branches {\n        id\n        choices {\n          id\n          request\n          nextBranchId\n          responses {\n            text\n            audio\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query scenario($id: String!) {\n    scenario(id: $id) {\n      db_name\n      updatedAt\n      maxConversationLength\n      id\n      description\n      createdAt\n      branches {\n        index\n        id\n        choices {\n          index\n          id\n          request\n          nextBranchId\n          responses {\n            index\n            id\n            text\n            type\n            photo\n            video\n            audio\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query scenario($id: String!) {\n    scenario(id: $id) {\n      db_name\n      updatedAt\n      maxConversationLength\n      id\n      description\n      createdAt\n      branches {\n        index\n        id\n        choices {\n          index\n          id\n          request\n          nextBranchId\n          responses {\n            index\n            id\n            text\n            type\n            photo\n            video\n            audio\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeScenario($id: String!) {\n    removeScenario(id: $id)\n  }\n"): (typeof documents)["\n  mutation removeScenario($id: String!) {\n    removeScenario(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createScenario($createScenarioInput: CreateScenarioInput!) {\n    createScenario(scenarioInput: $createScenarioInput) {\n      id\n      branches {\n        id\n        description\n        choices {\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createScenario($createScenarioInput: CreateScenarioInput!) {\n    createScenario(scenarioInput: $createScenarioInput) {\n      id\n      branches {\n        id\n        description\n        choices {\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query spamMessages {\n    spamMessages {\n      id\n      text\n      type\n      db_name\n      scenarioIdForSpam\n    }\n  }\n"): (typeof documents)["\n  query spamMessages {\n    spamMessages {\n      id\n      text\n      type\n      db_name\n      scenarioIdForSpam\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createSpamMessage($createSpamMessageInput: CreateMessageInput!) {\n    createSpamMessage(createSpamMessageInput: $createSpamMessageInput) {\n      id\n      text\n      type\n      db_name\n    }\n  }\n"): (typeof documents)["\n  mutation createSpamMessage($createSpamMessageInput: CreateMessageInput!) {\n    createSpamMessage(createSpamMessageInput: $createSpamMessageInput) {\n      id\n      text\n      type\n      db_name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateSpamMessage(\n    $id: String!\n    $updateSpamMessageInput: CreateMessageInput!\n  ) {\n    updateSpamMessage(id: $id, updateSpamMessageInput: $updateSpamMessageInput) {\n      id\n      text\n      type\n      db_name\n    }\n  }\n"): (typeof documents)["\n  mutation updateSpamMessage(\n    $id: String!\n    $updateSpamMessageInput: CreateMessageInput!\n  ) {\n    updateSpamMessage(id: $id, updateSpamMessageInput: $updateSpamMessageInput) {\n      id\n      text\n      type\n      db_name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeSpamMessage($id: String!) {\n    removeSpamMessage(id: $id)\n  }\n"): (typeof documents)["\n  mutation removeSpamMessage($id: String!) {\n    removeSpamMessage(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query spamMessagesByDbName($db_name: String!) {\n    spamMessagesByDbName(db_name: $db_name) {\n      id\n      text\n      type\n      db_name\n    }\n  }\n"): (typeof documents)["\n  query spamMessagesByDbName($db_name: String!) {\n    spamMessagesByDbName(db_name: $db_name) {\n      id\n      text\n      type\n      db_name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation joinGroups($joinGroupsInput: JoinGroupsInput!) {\n    joinGroups(JoinGroupsInput: $joinGroupsInput) {\n      bot {\n        api_id\n      }\n      joining_groups\n    }\n  }\n"): (typeof documents)["\n  mutation joinGroups($joinGroupsInput: JoinGroupsInput!) {\n    joinGroups(JoinGroupsInput: $joinGroupsInput) {\n      bot {\n        api_id\n      }\n      joining_groups\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query startBots {\n    startBots {\n      api_id\n    }\n  }\n"): (typeof documents)["\n  query startBots {\n    startBots {\n      api_id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query stopBots {\n    stopBots {\n      api_id\n    }\n  }\n"): (typeof documents)["\n  query stopBots {\n    stopBots {\n      api_id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query startBotsImmediately {\n    startBotsImmediately {\n      api_id\n    }\n  }\n"): (typeof documents)["\n  query startBotsImmediately {\n    startBotsImmediately {\n      api_id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation providePhoneNumber($api_id: Int!, $phoneNumber: String!) {\n    providePhoneNumber(api_id: $api_id, phoneNumber: $phoneNumber) {\n      bot {\n        api_id\n        api_hash\n      }\n      requestedPhoneNumber\n      requestedPhoneCode\n      isRunning\n      isStarted\n      isStopped\n      eventLogs {\n        log_event\n        event_date\n        event_message\n      }\n      childProcess {\n        pid\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation providePhoneNumber($api_id: Int!, $phoneNumber: String!) {\n    providePhoneNumber(api_id: $api_id, phoneNumber: $phoneNumber) {\n      bot {\n        api_id\n        api_hash\n      }\n      requestedPhoneNumber\n      requestedPhoneCode\n      isRunning\n      isStarted\n      isStopped\n      eventLogs {\n        log_event\n        event_date\n        event_message\n      }\n      childProcess {\n        pid\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation providePhoneCode($api_id: Int!, $phoneCode: String!) {\n    providePhoneCode(api_id: $api_id, phoneCode: $phoneCode) {\n      bot {\n        api_id\n        api_hash\n      }\n      requestedPhoneNumber\n      requestedPhoneCode\n      isRunning\n      isStarted\n      isStopped\n      eventLogs {\n        log_event\n        event_date\n        event_message\n      }\n      childProcess {\n        pid\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation providePhoneCode($api_id: Int!, $phoneCode: String!) {\n    providePhoneCode(api_id: $api_id, phoneCode: $phoneCode) {\n      bot {\n        api_id\n        api_hash\n      }\n      requestedPhoneNumber\n      requestedPhoneCode\n      isRunning\n      isStarted\n      isStopped\n      eventLogs {\n        log_event\n        event_date\n        event_message\n      }\n      childProcess {\n        pid\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation provide2FACode($api_id: Int!, $code: String!) {\n    provide2FACode(api_id: $api_id, code: $code) {\n      bot {\n        api_id\n        api_hash\n      }\n      requestedPhoneNumber\n      requestedPhoneCode\n      isRunning\n      isStarted\n      isStopped\n      eventLogs {\n        log_event\n        event_date\n        event_message\n      }\n      childProcess {\n        pid\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation provide2FACode($api_id: Int!, $code: String!) {\n    provide2FACode(api_id: $api_id, code: $code) {\n      bot {\n        api_id\n        api_hash\n      }\n      requestedPhoneNumber\n      requestedPhoneCode\n      isRunning\n      isStarted\n      isStopped\n      eventLogs {\n        log_event\n        event_date\n        event_message\n      }\n      childProcess {\n        pid\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query globalLog($limit: Int!) {\n    globalLog(limit: $limit) {\n      id\n      event_message\n      log_event\n      event_date\n      details\n      api_id\n    }\n  }\n"): (typeof documents)["\n  query globalLog($limit: Int!) {\n    globalLog(limit: $limit) {\n      id\n      event_message\n      log_event\n      event_date\n      details\n      api_id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query globalLogFromDate($date: DateTime!) {\n    globalLogFromDate(date: $date) {\n      id\n      event_message\n      log_event\n      event_date\n      details\n      api_id\n    }\n  }\n"): (typeof documents)["\n  query globalLogFromDate($date: DateTime!) {\n    globalLogFromDate(date: $date) {\n      id\n      event_message\n      log_event\n      event_date\n      details\n      api_id\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;