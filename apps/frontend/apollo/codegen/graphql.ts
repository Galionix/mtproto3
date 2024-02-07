/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AnswerEntity = {
  __typename?: 'AnswerEntity';
  base_probability?: Maybe<Scalars['String']['output']>;
  /** scenario branch relation */
  branch?: Maybe<ScenarioBranchEntity>;
  db_name?: Maybe<Scalars['String']['output']>;
  /** notes */
  description?: Maybe<Scalars['String']['output']>;
  /** entity id */
  id?: Maybe<Scalars['ID']['output']>;
  /** index */
  index?: Maybe<Scalars['Float']['output']>;
  isChannelAnswer?: Maybe<Scalars['Boolean']['output']>;
  isDmAnswer?: Maybe<Scalars['Boolean']['output']>;
  isGroupAnswer?: Maybe<Scalars['Boolean']['output']>;
  /** next scenario branch id */
  nextBranchId?: Maybe<Scalars['String']['output']>;
  /** request */
  request?: Maybe<Array<Scalars['String']['output']>>;
  /** responses */
  responses?: Maybe<Array<MessageEntity>>;
};

export type BotEntity = {
  __typename?: 'BotEntity';
  afterTaskDelay?: Maybe<Scalars['Int']['output']>;
  afterTaskIdleTime?: Maybe<Scalars['Int']['output']>;
  answersDb?: Maybe<Scalars['String']['output']>;
  api_hash?: Maybe<Scalars['String']['output']>;
  api_id?: Maybe<Scalars['String']['output']>;
  behaviorModel?: Maybe<Scalars['String']['output']>;
  botName?: Maybe<Scalars['String']['output']>;
  clientState?: Maybe<Scalars['String']['output']>;
  clientStateUpdateTime?: Maybe<Scalars['String']['output']>;
  copyFrom?: Maybe<Scalars['Int']['output']>;
  dmScenarioNames?: Maybe<Array<Scalars['String']['output']>>;
  readDelay?: Maybe<Scalars['Int']['output']>;
  replacements?: Maybe<Scalars['String']['output']>;
  sessionString?: Maybe<Scalars['String']['output']>;
  spamDBname?: Maybe<Scalars['String']['output']>;
  taskOrder?: Maybe<Scalars['String']['output']>;
  typeDelayMultiplier?: Maybe<Scalars['String']['output']>;
  voice?: Maybe<Scalars['String']['output']>;
};

export type BotEvent = {
  __typename?: 'BotEvent';
  event_date?: Maybe<Scalars['Float']['output']>;
  event_message?: Maybe<Scalars['String']['output']>;
  log_event?: Maybe<Scalars['String']['output']>;
};

export type BotStateEntity = {
  __typename?: 'BotStateEntity';
  bot?: Maybe<BotEntity>;
  childProcess?: Maybe<ChildProcessEntity>;
  error?: Maybe<Scalars['String']['output']>;
  eventLogs?: Maybe<Array<BotEvent>>;
  isErrored?: Maybe<Scalars['Boolean']['output']>;
  isRunning?: Maybe<Scalars['Boolean']['output']>;
  isStarted?: Maybe<Scalars['Boolean']['output']>;
  isStopped?: Maybe<Scalars['Boolean']['output']>;
  joining_groups?: Maybe<Scalars['Boolean']['output']>;
  joining_groups_chat_ids?: Maybe<Array<Scalars['String']['output']>>;
  lastMessage?: Maybe<Scalars['String']['output']>;
  lastUpdate?: Maybe<Scalars['Float']['output']>;
  leaving_groups?: Maybe<Scalars['Boolean']['output']>;
  leaving_groups_chat_ids?: Maybe<Array<Scalars['String']['output']>>;
  requested2FACode?: Maybe<Scalars['Boolean']['output']>;
  requestedPhoneCode?: Maybe<Scalars['Boolean']['output']>;
  requestedPhoneNumber?: Maybe<Scalars['Boolean']['output']>;
  startedDate?: Maybe<Scalars['Float']['output']>;
  stoppedDate?: Maybe<Scalars['Float']['output']>;
};

export type ChildProcessEntity = {
  __typename?: 'ChildProcessEntity';
  connected?: Maybe<Scalars['Boolean']['output']>;
  exitCode?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  killed?: Maybe<Scalars['Boolean']['output']>;
  pid?: Maybe<Scalars['Float']['output']>;
  signalCode?: Maybe<Scalars['String']['output']>;
  spawnfile?: Maybe<Scalars['String']['output']>;
};

export type CreateAnswerEntityInput = {
  /** base_probability */
  base_probability?: InputMaybe<Scalars['String']['input']>;
  /** db_name */
  db_name?: InputMaybe<Scalars['String']['input']>;
  /** description */
  description?: InputMaybe<Scalars['String']['input']>;
  /** index */
  index?: InputMaybe<Scalars['Float']['input']>;
  /** isChannelAnswer */
  isChannelAnswer?: InputMaybe<Scalars['Boolean']['input']>;
  /** isDmAnswer */
  isDmAnswer?: InputMaybe<Scalars['Boolean']['input']>;
  /** isGroupAnswer */
  isGroupAnswer?: InputMaybe<Scalars['Boolean']['input']>;
  /** next branch id */
  nextBranchId: Scalars['String']['input'];
  /** request */
  request: Array<Scalars['String']['input']>;
  /** response */
  responses: Array<CreateMessageInput>;
};

export type CreateBotInput = {
  afterTaskDelay?: InputMaybe<Scalars['Int']['input']>;
  afterTaskIdleTime?: InputMaybe<Scalars['Int']['input']>;
  answersDb?: InputMaybe<Scalars['String']['input']>;
  api_hash?: InputMaybe<Scalars['String']['input']>;
  api_id?: InputMaybe<Scalars['Int']['input']>;
  behaviorModel?: InputMaybe<Scalars['String']['input']>;
  botName?: InputMaybe<Scalars['String']['input']>;
  copyFrom?: InputMaybe<Scalars['Int']['input']>;
  readDelay?: InputMaybe<Scalars['Int']['input']>;
  replacements?: InputMaybe<Scalars['String']['input']>;
  scenario?: InputMaybe<Scalars['String']['input']>;
  sessionString?: InputMaybe<Scalars['String']['input']>;
  taskOrder?: InputMaybe<Scalars['String']['input']>;
  typeDelayMultiplier?: InputMaybe<Scalars['Int']['input']>;
  voice?: InputMaybe<Scalars['String']['input']>;
};

export type CreateMessageInput = {
  /** payload of audio for message */
  audio?: InputMaybe<Scalars['String']['input']>;
  /** payload of caption for message */
  caption?: InputMaybe<Scalars['String']['input']>;
  /** coefficient for message */
  coefficient?: InputMaybe<Scalars['String']['input']>;
  /** db_name */
  db_name?: InputMaybe<Scalars['String']['input']>;
  /** notes */
  description?: InputMaybe<Scalars['String']['input']>;
  /** index */
  index?: InputMaybe<Scalars['Float']['input']>;
  /** payload of photo for message */
  photo?: InputMaybe<Scalars['String']['input']>;
  /** payload of reaction for message */
  reaction?: InputMaybe<Scalars['String']['input']>;
  /** payload of sticker for message */
  sticker?: InputMaybe<Scalars['String']['input']>;
  /** payload of text for message */
  text?: InputMaybe<Scalars['String']['input']>;
  /** value of EMessageType */
  type?: InputMaybe<Scalars['String']['input']>;
  /** payload of video for message */
  video?: InputMaybe<Scalars['String']['input']>;
};

export type CreateScenarioBranchInput = {
  /** choices */
  choices?: InputMaybe<Array<CreateAnswerEntityInput>>;
  /** notes */
  description?: InputMaybe<Scalars['String']['input']>;
  /** id */
  id?: InputMaybe<Scalars['String']['input']>;
  /** index */
  index?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateScenarioInput = {
  /** branches */
  branches?: InputMaybe<Array<CreateScenarioBranchInput>>;
  /** db_name */
  db_name?: InputMaybe<Scalars['String']['input']>;
  /** notes */
  description?: InputMaybe<Scalars['String']['input']>;
  /** maxConversationLength */
  maxConversationLength?: InputMaybe<Scalars['Float']['input']>;
};

export type JoinGroupsInput = {
  api_ids: Array<Scalars['Int']['input']>;
  behavior_model?: InputMaybe<Scalars['String']['input']>;
  chatNames: Array<Scalars['String']['input']>;
  join_delay?: InputMaybe<Scalars['Int']['input']>;
  processing_enabled?: InputMaybe<Scalars['Boolean']['input']>;
  spam_frequency?: InputMaybe<Scalars['Int']['input']>;
};

export type LeaveGroupsInput = {
  api_ids: Array<Scalars['Int']['input']>;
  chatNames: Array<Scalars['String']['input']>;
};

export type MessageEntity = {
  __typename?: 'MessageEntity';
  /** answer */
  answer?: Maybe<AnswerEntity>;
  /** payload of audio for message */
  audio?: Maybe<Scalars['String']['output']>;
  /** payload of caption for message */
  caption?: Maybe<Scalars['String']['output']>;
  /** coefficient for message */
  coefficient?: Maybe<Scalars['String']['output']>;
  /** db_name */
  db_name?: Maybe<Scalars['String']['output']>;
  /** notes */
  description?: Maybe<Scalars['String']['output']>;
  /** entity id */
  id?: Maybe<Scalars['ID']['output']>;
  /** index */
  index?: Maybe<Scalars['Float']['output']>;
  /** payload of photo for message */
  photo?: Maybe<Scalars['String']['output']>;
  /** payload of reaction for message */
  reaction?: Maybe<Scalars['String']['output']>;
  /** payload of sticker for message */
  sticker?: Maybe<Scalars['String']['output']>;
  /** payload of text for message */
  text?: Maybe<Scalars['String']['output']>;
  /** value of EMessageType */
  type?: Maybe<Scalars['String']['output']>;
  /** payload of video for message */
  video?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addBranchToScenario: ScenarioEntity;
  addChoiceToBranch: ScenarioBranchEntity;
  createAnswer: AnswerEntity;
  createBot: BotEntity;
  createManyMessages: Array<MessageEntity>;
  createMessage: MessageEntity;
  createScenario: ScenarioEntity;
  createSpamMessage: MessageEntity;
  joinGroups: Array<BotStateEntity>;
  leaveGroups: Array<BotStateEntity>;
  provide2FACode: BotStateEntity;
  providePhoneCode: BotStateEntity;
  providePhoneNumber: BotStateEntity;
  removeAnswer: Scalars['Int']['output'];
  removeBot: BotEntity;
  removeMessages: Scalars['Int']['output'];
  removePhotos: BotStateEntity;
  removeScenario: Scalars['String']['output'];
  restartBot: BotEntity;
  setPhoto: BotStateEntity;
  setUsername: Scalars['String']['output'];
  stopBot: BotStateEntity;
  updateAnswer: AnswerEntity;
  updateBot: BotEntity;
  updateMessage: MessageEntity;
};


export type MutationAddBranchToScenarioArgs = {
  createScenarioBranchInput: CreateScenarioBranchInput;
  scenarioId: Scalars['String']['input'];
};


export type MutationAddChoiceToBranchArgs = {
  createScenarioBranchInput: CreateAnswerEntityInput;
  scenarioBranchId: Scalars['String']['input'];
};


export type MutationCreateAnswerArgs = {
  createAnswerInput: CreateAnswerEntityInput;
};


export type MutationCreateBotArgs = {
  createBotInput: CreateBotInput;
};


export type MutationCreateManyMessagesArgs = {
  createManyMessagesInput: Array<CreateMessageInput>;
};


export type MutationCreateMessageArgs = {
  createMessageInput: CreateMessageInput;
};


export type MutationCreateScenarioArgs = {
  scenarioInput: CreateScenarioInput;
};


export type MutationCreateSpamMessageArgs = {
  createSpamMessageInput: CreateMessageInput;
};


export type MutationJoinGroupsArgs = {
  JoinGroupsInput: JoinGroupsInput;
};


export type MutationLeaveGroupsArgs = {
  input: LeaveGroupsInput;
};


export type MutationProvide2FaCodeArgs = {
  api_id: Scalars['Int']['input'];
  code: Scalars['String']['input'];
};


export type MutationProvidePhoneCodeArgs = {
  api_id: Scalars['Int']['input'];
  phoneCode: Scalars['String']['input'];
};


export type MutationProvidePhoneNumberArgs = {
  api_id: Scalars['Int']['input'];
  phoneNumber: Scalars['String']['input'];
};


export type MutationRemoveAnswerArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveBotArgs = {
  api_id: Scalars['Int']['input'];
};


export type MutationRemoveMessagesArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type MutationRemovePhotosArgs = {
  api_id: Scalars['Int']['input'];
};


export type MutationRemoveScenarioArgs = {
  id: Scalars['String']['input'];
};


export type MutationRestartBotArgs = {
  api_id: Scalars['Int']['input'];
};


export type MutationSetPhotoArgs = {
  api_id: Scalars['Int']['input'];
  photoName: Scalars['String']['input'];
};


export type MutationSetUsernameArgs = {
  api_id: Scalars['Int']['input'];
  username: Scalars['String']['input'];
};


export type MutationStopBotArgs = {
  api_id: Scalars['Int']['input'];
};


export type MutationUpdateAnswerArgs = {
  updateAnswerInput: UpdateAnswersRepositoryInput;
};


export type MutationUpdateBotArgs = {
  api_id: Scalars['Int']['input'];
  updateBotInput: UpdateBotInput;
};


export type MutationUpdateMessageArgs = {
  id: Scalars['String']['input'];
  updateMessageInput: UpdateMessageInput;
};

export type Query = {
  __typename?: 'Query';
  answer?: Maybe<AnswerEntity>;
  answers: Array<AnswerEntity>;
  batchFind: Array<MessageEntity>;
  bot: BotEntity;
  bots: Array<BotEntity>;
  getBotState: BotStateEntity;
  getBotStates: Array<BotStateEntity>;
  getProcessesCount: Scalars['Int']['output'];
  message: MessageEntity;
  messages: Array<MessageEntity>;
  reloadStates: Array<BotStateEntity>;
  scenario: ScenarioEntity;
  scenarios: Array<ScenarioEntity>;
  someAnswers: Array<AnswerEntity>;
  spamMessages: Array<MessageEntity>;
  startBot: BotEntity;
  startBots: Array<BotEntity>;
  stopBots: Array<BotEntity>;
};


export type QueryAnswerArgs = {
  id: Scalars['String']['input'];
};


export type QueryBatchFindArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type QueryBotArgs = {
  api_id: Scalars['Int']['input'];
};


export type QueryGetBotStateArgs = {
  id: Scalars['Int']['input'];
};


export type QueryMessageArgs = {
  id: Scalars['String']['input'];
};


export type QueryScenarioArgs = {
  id: Scalars['String']['input'];
};


export type QuerySomeAnswersArgs = {
  findSomeAnswersInput: UpdateAnswersRepositoryInput;
};


export type QueryStartBotArgs = {
  api_id: Scalars['Int']['input'];
};

export type ScenarioBranchEntity = {
  __typename?: 'ScenarioBranchEntity';
  /** choices */
  choices?: Maybe<Array<AnswerEntity>>;
  /** notes */
  description?: Maybe<Scalars['String']['output']>;
  /** entity id */
  id?: Maybe<Scalars['String']['output']>;
  /** index */
  index?: Maybe<Scalars['Float']['output']>;
  /** scenario */
  scenario?: Maybe<ScenarioEntity>;
};

export type ScenarioEntity = {
  __typename?: 'ScenarioEntity';
  branches: Array<ScenarioBranchEntity>;
  /** createdAt */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** db_name */
  db_name?: Maybe<Scalars['String']['output']>;
  /** notes */
  description?: Maybe<Scalars['String']['output']>;
  /** entity id */
  id: Scalars['ID']['output'];
  /** maxConversationLength */
  maxConversationLength?: Maybe<Scalars['Float']['output']>;
  /** updatedAt */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UpdateAnswersRepositoryInput = {
  /** base_probability */
  base_probability?: InputMaybe<Scalars['String']['input']>;
  /** db_name */
  db_name?: InputMaybe<Scalars['String']['input']>;
  /** description */
  description?: InputMaybe<Scalars['String']['input']>;
  /** entity id */
  id: Scalars['String']['input'];
  /** index */
  index?: InputMaybe<Scalars['Float']['input']>;
  /** isChannelAnswer */
  isChannelAnswer?: InputMaybe<Scalars['Boolean']['input']>;
  /** isDmAnswer */
  isDmAnswer?: InputMaybe<Scalars['Boolean']['input']>;
  /** isGroupAnswer */
  isGroupAnswer?: InputMaybe<Scalars['Boolean']['input']>;
  /** next branch id */
  nextBranchId?: InputMaybe<Scalars['String']['input']>;
  /** request */
  request?: InputMaybe<Array<Scalars['String']['input']>>;
  /** response */
  responses?: InputMaybe<Array<CreateMessageInput>>;
};

export type UpdateBotInput = {
  afterTaskDelay?: InputMaybe<Scalars['Int']['input']>;
  afterTaskIdleTime?: InputMaybe<Scalars['Int']['input']>;
  answersDb?: InputMaybe<Scalars['String']['input']>;
  behaviorModel?: InputMaybe<Scalars['String']['input']>;
  botName?: InputMaybe<Scalars['String']['input']>;
  clientState?: InputMaybe<Scalars['String']['input']>;
  copyFrom?: InputMaybe<Scalars['Int']['input']>;
  dmScenarioNames?: InputMaybe<Array<Scalars['String']['input']>>;
  readDelay?: InputMaybe<Scalars['Int']['input']>;
  replacements?: InputMaybe<Scalars['String']['input']>;
  sessionString?: InputMaybe<Scalars['String']['input']>;
  spamDBname?: InputMaybe<Scalars['String']['input']>;
  taskOrder?: InputMaybe<Scalars['String']['input']>;
  typeDelayMultiplier?: InputMaybe<Scalars['String']['input']>;
  voice?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMessageInput = {
  /** payload of audio for message */
  audio?: InputMaybe<Scalars['String']['input']>;
  /** payload of caption for message */
  caption?: InputMaybe<Scalars['String']['input']>;
  /** coefficient for message */
  coefficient?: InputMaybe<Scalars['String']['input']>;
  /** db_name */
  db_name?: InputMaybe<Scalars['String']['input']>;
  /** notes */
  description?: InputMaybe<Scalars['String']['input']>;
  /** index */
  index?: InputMaybe<Scalars['Float']['input']>;
  /** payload of photo for message */
  photo?: InputMaybe<Scalars['String']['input']>;
  /** payload of reaction for message */
  reaction?: InputMaybe<Scalars['String']['input']>;
  /** payload of sticker for message */
  sticker?: InputMaybe<Scalars['String']['input']>;
  /** payload of text for message */
  text?: InputMaybe<Scalars['String']['input']>;
  /** value of EMessageType */
  type?: InputMaybe<Scalars['String']['input']>;
  /** payload of video for message */
  video?: InputMaybe<Scalars['String']['input']>;
};

export type BotQueryVariables = Exact<{
  api_id: Scalars['Int']['input'];
}>;


export type BotQuery = { __typename?: 'Query', bot: { __typename?: 'BotEntity', afterTaskDelay?: number | null, afterTaskIdleTime?: number | null, answersDb?: string | null, api_hash?: string | null, api_id?: string | null, behaviorModel?: string | null, botName?: string | null, clientState?: string | null, clientStateUpdateTime?: string | null, copyFrom?: number | null, readDelay?: number | null, replacements?: string | null, dmScenarioNames?: Array<string> | null, sessionString?: string | null, spamDBname?: string | null, taskOrder?: string | null, typeDelayMultiplier?: string | null, voice?: string | null } };

export type UpdateBotMutationVariables = Exact<{
  api_id: Scalars['Int']['input'];
  updateBotInput: UpdateBotInput;
}>;


export type UpdateBotMutation = { __typename?: 'Mutation', updateBot: { __typename?: 'BotEntity', afterTaskDelay?: number | null, afterTaskIdleTime?: number | null, answersDb?: string | null, api_hash?: string | null, api_id?: string | null, behaviorModel?: string | null, botName?: string | null, clientState?: string | null, copyFrom?: number | null, readDelay?: number | null, replacements?: string | null, dmScenarioNames?: Array<string> | null, sessionString?: string | null, spamDBname?: string | null, taskOrder?: string | null, voice?: string | null } };

export type SetPhotoMutationVariables = Exact<{
  api_id: Scalars['Int']['input'];
  photoName: Scalars['String']['input'];
}>;


export type SetPhotoMutation = { __typename?: 'Mutation', setPhoto: { __typename?: 'BotStateEntity', bot?: { __typename?: 'BotEntity', api_id?: string | null } | null } };

export type RemovePhotosMutationVariables = Exact<{
  api_id: Scalars['Int']['input'];
}>;


export type RemovePhotosMutation = { __typename?: 'Mutation', removePhotos: { __typename?: 'BotStateEntity', bot?: { __typename?: 'BotEntity', api_id?: string | null } | null } };

export type BotsQueryVariables = Exact<{ [key: string]: never; }>;


export type BotsQuery = { __typename?: 'Query', bots: Array<{ __typename?: 'BotEntity', afterTaskDelay?: number | null, afterTaskIdleTime?: number | null, answersDb?: string | null, api_hash?: string | null, api_id?: string | null, behaviorModel?: string | null, botName?: string | null, clientState?: string | null, clientStateUpdateTime?: string | null, copyFrom?: number | null, readDelay?: number | null, replacements?: string | null, dmScenarioNames?: Array<string> | null, sessionString?: string | null, spamDBname?: string | null, taskOrder?: string | null, typeDelayMultiplier?: string | null, voice?: string | null }> };

export type CreateBotMutationVariables = Exact<{
  createBotInput: CreateBotInput;
}>;


export type CreateBotMutation = { __typename?: 'Mutation', createBot: { __typename?: 'BotEntity', afterTaskDelay?: number | null, afterTaskIdleTime?: number | null, answersDb?: string | null, api_hash?: string | null, api_id?: string | null, behaviorModel?: string | null, botName?: string | null, clientState?: string | null, clientStateUpdateTime?: string | null, copyFrom?: number | null, readDelay?: number | null, replacements?: string | null, dmScenarioNames?: Array<string> | null, sessionString?: string | null, spamDBname?: string | null, taskOrder?: string | null, typeDelayMultiplier?: string | null, voice?: string | null } };

export type RemoveBotMutationVariables = Exact<{
  api_id: Scalars['Int']['input'];
}>;


export type RemoveBotMutation = { __typename?: 'Mutation', removeBot: { __typename?: 'BotEntity', api_id?: string | null } };

export type GetStateQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStateQuery = { __typename?: 'Query', getBotStates: Array<{ __typename?: 'BotStateEntity', requestedPhoneNumber?: boolean | null, requestedPhoneCode?: boolean | null, isRunning?: boolean | null, isStarted?: boolean | null, isStopped?: boolean | null, bot?: { __typename?: 'BotEntity', api_id?: string | null, api_hash?: string | null } | null, eventLogs?: Array<{ __typename?: 'BotEvent', log_event?: string | null, event_date?: number | null, event_message?: string | null }> | null, childProcess?: { __typename?: 'ChildProcessEntity', pid?: number | null } | null }> };

export type RestartBotMutationVariables = Exact<{
  api_id: Scalars['Int']['input'];
}>;


export type RestartBotMutation = { __typename?: 'Mutation', restartBot: { __typename?: 'BotEntity', api_id?: string | null } };

export type StopBotMutationVariables = Exact<{
  api_id: Scalars['Int']['input'];
}>;


export type StopBotMutation = { __typename?: 'Mutation', stopBot: { __typename?: 'BotStateEntity', isRunning?: boolean | null } };

export type GetBotStateQueryVariables = Exact<{
  api_id: Scalars['Int']['input'];
}>;


export type GetBotStateQuery = { __typename?: 'Query', getBotState: { __typename?: 'BotStateEntity', requestedPhoneNumber?: boolean | null, requestedPhoneCode?: boolean | null, requested2FACode?: boolean | null, isRunning?: boolean | null, isStarted?: boolean | null, isStopped?: boolean | null, bot?: { __typename?: 'BotEntity', api_id?: string | null, api_hash?: string | null } | null, eventLogs?: Array<{ __typename?: 'BotEvent', log_event?: string | null, event_date?: number | null, event_message?: string | null }> | null, childProcess?: { __typename?: 'ChildProcessEntity', pid?: number | null } | null } };

export type GetBotStateLogsQueryVariables = Exact<{
  api_id: Scalars['Int']['input'];
}>;


export type GetBotStateLogsQuery = { __typename?: 'Query', getBotState: { __typename?: 'BotStateEntity', eventLogs?: Array<{ __typename?: 'BotEvent', log_event?: string | null, event_date?: number | null, event_message?: string | null }> | null } };

export type ScenariosQueryVariables = Exact<{ [key: string]: never; }>;


export type ScenariosQuery = { __typename?: 'Query', scenarios: Array<{ __typename?: 'ScenarioEntity', id: string, description?: string | null, createdAt?: any | null, branches: Array<{ __typename?: 'ScenarioBranchEntity', id?: string | null, choices?: Array<{ __typename?: 'AnswerEntity', id?: string | null, request?: Array<string> | null, responses?: Array<{ __typename?: 'MessageEntity', text?: string | null }> | null }> | null }> }> };

export type ScenarioQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ScenarioQuery = { __typename?: 'Query', scenario: { __typename?: 'ScenarioEntity', db_name?: string | null, updatedAt?: any | null, maxConversationLength?: number | null, id: string, description?: string | null, createdAt?: any | null, branches: Array<{ __typename?: 'ScenarioBranchEntity', index?: number | null, id?: string | null, choices?: Array<{ __typename?: 'AnswerEntity', index?: number | null, id?: string | null, request?: Array<string> | null, nextBranchId?: string | null, responses?: Array<{ __typename?: 'MessageEntity', index?: number | null, id?: string | null, text?: string | null, type?: string | null, photo?: string | null, video?: string | null, audio?: string | null }> | null }> | null }> } };

export type RemoveScenarioMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveScenarioMutation = { __typename?: 'Mutation', removeScenario: string };

export type CreateScenarioMutationVariables = Exact<{
  createScenarioInput: CreateScenarioInput;
}>;


export type CreateScenarioMutation = { __typename?: 'Mutation', createScenario: { __typename?: 'ScenarioEntity', id: string, branches: Array<{ __typename?: 'ScenarioBranchEntity', id?: string | null, description?: string | null, choices?: Array<{ __typename?: 'AnswerEntity', id?: string | null }> | null }> } };

export type ProvidePhoneNumberMutationVariables = Exact<{
  api_id: Scalars['Int']['input'];
  phoneNumber: Scalars['String']['input'];
}>;


export type ProvidePhoneNumberMutation = { __typename?: 'Mutation', providePhoneNumber: { __typename?: 'BotStateEntity', requestedPhoneNumber?: boolean | null, requestedPhoneCode?: boolean | null, isRunning?: boolean | null, isStarted?: boolean | null, isStopped?: boolean | null, bot?: { __typename?: 'BotEntity', api_id?: string | null, api_hash?: string | null } | null, eventLogs?: Array<{ __typename?: 'BotEvent', log_event?: string | null, event_date?: number | null, event_message?: string | null }> | null, childProcess?: { __typename?: 'ChildProcessEntity', pid?: number | null } | null } };

export type ProvidePhoneCodeMutationVariables = Exact<{
  api_id: Scalars['Int']['input'];
  phoneCode: Scalars['String']['input'];
}>;


export type ProvidePhoneCodeMutation = { __typename?: 'Mutation', providePhoneCode: { __typename?: 'BotStateEntity', requestedPhoneNumber?: boolean | null, requestedPhoneCode?: boolean | null, isRunning?: boolean | null, isStarted?: boolean | null, isStopped?: boolean | null, bot?: { __typename?: 'BotEntity', api_id?: string | null, api_hash?: string | null } | null, eventLogs?: Array<{ __typename?: 'BotEvent', log_event?: string | null, event_date?: number | null, event_message?: string | null }> | null, childProcess?: { __typename?: 'ChildProcessEntity', pid?: number | null } | null } };

export type Provide2FaCodeMutationVariables = Exact<{
  api_id: Scalars['Int']['input'];
  code: Scalars['String']['input'];
}>;


export type Provide2FaCodeMutation = { __typename?: 'Mutation', provide2FACode: { __typename?: 'BotStateEntity', requestedPhoneNumber?: boolean | null, requestedPhoneCode?: boolean | null, isRunning?: boolean | null, isStarted?: boolean | null, isStopped?: boolean | null, bot?: { __typename?: 'BotEntity', api_id?: string | null, api_hash?: string | null } | null, eventLogs?: Array<{ __typename?: 'BotEvent', log_event?: string | null, event_date?: number | null, event_message?: string | null }> | null, childProcess?: { __typename?: 'ChildProcessEntity', pid?: number | null } | null } };


export const BotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Bot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"api_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"api_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"api_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"afterTaskDelay"}},{"kind":"Field","name":{"kind":"Name","value":"afterTaskIdleTime"}},{"kind":"Field","name":{"kind":"Name","value":"answersDb"}},{"kind":"Field","name":{"kind":"Name","value":"api_hash"}},{"kind":"Field","name":{"kind":"Name","value":"api_id"}},{"kind":"Field","name":{"kind":"Name","value":"behaviorModel"}},{"kind":"Field","name":{"kind":"Name","value":"botName"}},{"kind":"Field","name":{"kind":"Name","value":"clientState"}},{"kind":"Field","name":{"kind":"Name","value":"clientStateUpdateTime"}},{"kind":"Field","name":{"kind":"Name","value":"copyFrom"}},{"kind":"Field","name":{"kind":"Name","value":"readDelay"}},{"kind":"Field","name":{"kind":"Name","value":"replacements"}},{"kind":"Field","name":{"kind":"Name","value":"dmScenarioNames"}},{"kind":"Field","name":{"kind":"Name","value":"sessionString"}},{"kind":"Field","name":{"kind":"Name","value":"spamDBname"}},{"kind":"Field","name":{"kind":"Name","value":"taskOrder"}},{"kind":"Field","name":{"kind":"Name","value":"typeDelayMultiplier"}},{"kind":"Field","name":{"kind":"Name","value":"voice"}}]}}]}}]} as unknown as DocumentNode<BotQuery, BotQueryVariables>;
export const UpdateBotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateBot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"api_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateBotInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBotInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"api_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"api_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateBotInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateBotInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"afterTaskDelay"}},{"kind":"Field","name":{"kind":"Name","value":"afterTaskIdleTime"}},{"kind":"Field","name":{"kind":"Name","value":"answersDb"}},{"kind":"Field","name":{"kind":"Name","value":"api_hash"}},{"kind":"Field","name":{"kind":"Name","value":"api_id"}},{"kind":"Field","name":{"kind":"Name","value":"behaviorModel"}},{"kind":"Field","name":{"kind":"Name","value":"botName"}},{"kind":"Field","name":{"kind":"Name","value":"clientState"}},{"kind":"Field","name":{"kind":"Name","value":"copyFrom"}},{"kind":"Field","name":{"kind":"Name","value":"readDelay"}},{"kind":"Field","name":{"kind":"Name","value":"replacements"}},{"kind":"Field","name":{"kind":"Name","value":"dmScenarioNames"}},{"kind":"Field","name":{"kind":"Name","value":"sessionString"}},{"kind":"Field","name":{"kind":"Name","value":"spamDBname"}},{"kind":"Field","name":{"kind":"Name","value":"taskOrder"}},{"kind":"Field","name":{"kind":"Name","value":"voice"}}]}}]}}]} as unknown as DocumentNode<UpdateBotMutation, UpdateBotMutationVariables>;
export const SetPhotoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"setPhoto"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"api_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"photoName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setPhoto"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"api_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"api_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"photoName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"photoName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"api_id"}}]}}]}}]}}]} as unknown as DocumentNode<SetPhotoMutation, SetPhotoMutationVariables>;
export const RemovePhotosDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removePhotos"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"api_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removePhotos"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"api_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"api_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"api_id"}}]}}]}}]}}]} as unknown as DocumentNode<RemovePhotosMutation, RemovePhotosMutationVariables>;
export const BotsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Bots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"afterTaskDelay"}},{"kind":"Field","name":{"kind":"Name","value":"afterTaskIdleTime"}},{"kind":"Field","name":{"kind":"Name","value":"answersDb"}},{"kind":"Field","name":{"kind":"Name","value":"api_hash"}},{"kind":"Field","name":{"kind":"Name","value":"api_id"}},{"kind":"Field","name":{"kind":"Name","value":"behaviorModel"}},{"kind":"Field","name":{"kind":"Name","value":"botName"}},{"kind":"Field","name":{"kind":"Name","value":"clientState"}},{"kind":"Field","name":{"kind":"Name","value":"clientStateUpdateTime"}},{"kind":"Field","name":{"kind":"Name","value":"copyFrom"}},{"kind":"Field","name":{"kind":"Name","value":"readDelay"}},{"kind":"Field","name":{"kind":"Name","value":"replacements"}},{"kind":"Field","name":{"kind":"Name","value":"dmScenarioNames"}},{"kind":"Field","name":{"kind":"Name","value":"sessionString"}},{"kind":"Field","name":{"kind":"Name","value":"spamDBname"}},{"kind":"Field","name":{"kind":"Name","value":"taskOrder"}},{"kind":"Field","name":{"kind":"Name","value":"typeDelayMultiplier"}},{"kind":"Field","name":{"kind":"Name","value":"voice"}}]}}]}}]} as unknown as DocumentNode<BotsQuery, BotsQueryVariables>;
export const CreateBotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createBotInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBotInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createBotInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createBotInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"afterTaskDelay"}},{"kind":"Field","name":{"kind":"Name","value":"afterTaskIdleTime"}},{"kind":"Field","name":{"kind":"Name","value":"answersDb"}},{"kind":"Field","name":{"kind":"Name","value":"api_hash"}},{"kind":"Field","name":{"kind":"Name","value":"api_id"}},{"kind":"Field","name":{"kind":"Name","value":"behaviorModel"}},{"kind":"Field","name":{"kind":"Name","value":"botName"}},{"kind":"Field","name":{"kind":"Name","value":"clientState"}},{"kind":"Field","name":{"kind":"Name","value":"clientStateUpdateTime"}},{"kind":"Field","name":{"kind":"Name","value":"copyFrom"}},{"kind":"Field","name":{"kind":"Name","value":"readDelay"}},{"kind":"Field","name":{"kind":"Name","value":"replacements"}},{"kind":"Field","name":{"kind":"Name","value":"dmScenarioNames"}},{"kind":"Field","name":{"kind":"Name","value":"sessionString"}},{"kind":"Field","name":{"kind":"Name","value":"spamDBname"}},{"kind":"Field","name":{"kind":"Name","value":"taskOrder"}},{"kind":"Field","name":{"kind":"Name","value":"typeDelayMultiplier"}},{"kind":"Field","name":{"kind":"Name","value":"voice"}}]}}]}}]} as unknown as DocumentNode<CreateBotMutation, CreateBotMutationVariables>;
export const RemoveBotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeBot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"api_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeBot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"api_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"api_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"api_id"}}]}}]}}]} as unknown as DocumentNode<RemoveBotMutation, RemoveBotMutationVariables>;
export const GetStateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getState"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBotStates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"api_id"}},{"kind":"Field","name":{"kind":"Name","value":"api_hash"}}]}},{"kind":"Field","name":{"kind":"Name","value":"requestedPhoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"requestedPhoneCode"}},{"kind":"Field","name":{"kind":"Name","value":"isRunning"}},{"kind":"Field","name":{"kind":"Name","value":"isStarted"}},{"kind":"Field","name":{"kind":"Name","value":"isStopped"}},{"kind":"Field","name":{"kind":"Name","value":"eventLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"log_event"}},{"kind":"Field","name":{"kind":"Name","value":"event_date"}},{"kind":"Field","name":{"kind":"Name","value":"event_message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"childProcess"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pid"}}]}}]}}]}}]} as unknown as DocumentNode<GetStateQuery, GetStateQueryVariables>;
export const RestartBotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"restartBot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"api_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"restartBot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"api_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"api_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"api_id"}}]}}]}}]} as unknown as DocumentNode<RestartBotMutation, RestartBotMutationVariables>;
export const StopBotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"stopBot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"api_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stopBot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"api_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"api_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRunning"}}]}}]}}]} as unknown as DocumentNode<StopBotMutation, StopBotMutationVariables>;
export const GetBotStateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBotState"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"api_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBotState"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"api_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"api_id"}},{"kind":"Field","name":{"kind":"Name","value":"api_hash"}}]}},{"kind":"Field","name":{"kind":"Name","value":"requestedPhoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"requestedPhoneCode"}},{"kind":"Field","name":{"kind":"Name","value":"requested2FACode"}},{"kind":"Field","name":{"kind":"Name","value":"isRunning"}},{"kind":"Field","name":{"kind":"Name","value":"isStarted"}},{"kind":"Field","name":{"kind":"Name","value":"isStopped"}},{"kind":"Field","name":{"kind":"Name","value":"eventLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"log_event"}},{"kind":"Field","name":{"kind":"Name","value":"event_date"}},{"kind":"Field","name":{"kind":"Name","value":"event_message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"childProcess"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pid"}}]}}]}}]}}]} as unknown as DocumentNode<GetBotStateQuery, GetBotStateQueryVariables>;
export const GetBotStateLogsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBotStateLogs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"api_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBotState"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"api_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"log_event"}},{"kind":"Field","name":{"kind":"Name","value":"event_date"}},{"kind":"Field","name":{"kind":"Name","value":"event_message"}}]}}]}}]}}]} as unknown as DocumentNode<GetBotStateLogsQuery, GetBotStateLogsQueryVariables>;
export const ScenariosDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"scenarios"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scenarios"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"branches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"choices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"request"}},{"kind":"Field","name":{"kind":"Name","value":"responses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ScenariosQuery, ScenariosQueryVariables>;
export const ScenarioDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"scenario"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scenario"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"db_name"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"maxConversationLength"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"branches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"choices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"request"}},{"kind":"Field","name":{"kind":"Name","value":"nextBranchId"}},{"kind":"Field","name":{"kind":"Name","value":"responses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"video"}},{"kind":"Field","name":{"kind":"Name","value":"audio"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ScenarioQuery, ScenarioQueryVariables>;
export const RemoveScenarioDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeScenario"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeScenario"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveScenarioMutation, RemoveScenarioMutationVariables>;
export const CreateScenarioDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createScenario"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createScenarioInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateScenarioInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createScenario"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"scenarioInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createScenarioInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"branches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"choices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateScenarioMutation, CreateScenarioMutationVariables>;
export const ProvidePhoneNumberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"providePhoneNumber"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"api_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phoneNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"providePhoneNumber"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"api_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"api_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"phoneNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phoneNumber"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"api_id"}},{"kind":"Field","name":{"kind":"Name","value":"api_hash"}}]}},{"kind":"Field","name":{"kind":"Name","value":"requestedPhoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"requestedPhoneCode"}},{"kind":"Field","name":{"kind":"Name","value":"isRunning"}},{"kind":"Field","name":{"kind":"Name","value":"isStarted"}},{"kind":"Field","name":{"kind":"Name","value":"isStopped"}},{"kind":"Field","name":{"kind":"Name","value":"eventLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"log_event"}},{"kind":"Field","name":{"kind":"Name","value":"event_date"}},{"kind":"Field","name":{"kind":"Name","value":"event_message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"childProcess"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pid"}}]}}]}}]}}]} as unknown as DocumentNode<ProvidePhoneNumberMutation, ProvidePhoneNumberMutationVariables>;
export const ProvidePhoneCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"providePhoneCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"api_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phoneCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"providePhoneCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"api_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"api_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"phoneCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phoneCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"api_id"}},{"kind":"Field","name":{"kind":"Name","value":"api_hash"}}]}},{"kind":"Field","name":{"kind":"Name","value":"requestedPhoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"requestedPhoneCode"}},{"kind":"Field","name":{"kind":"Name","value":"isRunning"}},{"kind":"Field","name":{"kind":"Name","value":"isStarted"}},{"kind":"Field","name":{"kind":"Name","value":"isStopped"}},{"kind":"Field","name":{"kind":"Name","value":"eventLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"log_event"}},{"kind":"Field","name":{"kind":"Name","value":"event_date"}},{"kind":"Field","name":{"kind":"Name","value":"event_message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"childProcess"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pid"}}]}}]}}]}}]} as unknown as DocumentNode<ProvidePhoneCodeMutation, ProvidePhoneCodeMutationVariables>;
export const Provide2FaCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"provide2FACode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"api_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"provide2FACode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"api_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"api_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"api_id"}},{"kind":"Field","name":{"kind":"Name","value":"api_hash"}}]}},{"kind":"Field","name":{"kind":"Name","value":"requestedPhoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"requestedPhoneCode"}},{"kind":"Field","name":{"kind":"Name","value":"isRunning"}},{"kind":"Field","name":{"kind":"Name","value":"isStarted"}},{"kind":"Field","name":{"kind":"Name","value":"isStopped"}},{"kind":"Field","name":{"kind":"Name","value":"eventLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"log_event"}},{"kind":"Field","name":{"kind":"Name","value":"event_date"}},{"kind":"Field","name":{"kind":"Name","value":"event_message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"childProcess"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pid"}}]}}]}}]}}]} as unknown as DocumentNode<Provide2FaCodeMutation, Provide2FaCodeMutationVariables>;