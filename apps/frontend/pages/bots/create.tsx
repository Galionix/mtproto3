import { NextPage } from "next";
import { Layout } from "../../src/shared/Layout/Layout";
import { CreateBotInput } from "@core/types/server";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import {
  createBotMutation,
  getAvailableBotsByFilesQuery,
  getBotStateQuery,
  getBotStatesQuery,
  getBotsQuery,
} from "./gql";
import { TextInput } from "../../src/shared/Input/TextInput";
import { Clickable } from "../../src/shared/Clickable/Clickable";
import { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/router";
import { InitBot } from "./InitBot";
import { SessionStringRestore } from "../../src/shared/BotSessionStringRestore/BotSessionStringRestore";
import { BooleanInput } from "../../src/shared/BooleanInput/BooleanInput";
import { generateFromEmail, generateUsername } from "unique-username-generator";
import { IoIosRefresh } from "react-icons/io";

const defaultCreateBotData: CreateBotInput = {
  api_id: -1,
  api_hash: "",
  botName: "",
  behaviorModel: "base",
  sessionString: "",
  fromFile: true,
};

const CreateBotPage: NextPage = () => {
  const client = useApolloClient();
  const [
    createBot,
    {
      data: createBotDataResult,
      loading: createBotLoading,
      error: createBotError,
    },
  ] = useMutation(createBotMutation);

  // getAvailableBotsByFilesQuery
  const { data: availableBotsByFilesData } = useQuery(
    getAvailableBotsByFilesQuery
  );
  // console.log("availableBotsByFilesData: ", availableBotsByFilesData);

  const router = useRouter();

  const [createBotData, dispatch] = useReducer(
    (state: CreateBotInput, newState: Partial<CreateBotInput>) => ({
      ...state,
      ...newState,
    }),
    defaultCreateBotData
  );

  useEffect(() => {
    dispatch({ botName: generateUsername() });
  }, []);

  return (
    <Layout>
      <h1>Create Bot</h1>
      <div>
        <h2>Available Bots</h2>
        {availableBotsByFilesData?.getAvailableBotsByFiles?.map((bot) => (
          <div key={bot}>
            <Clickable
              text={bot}
              onClick={() => {
                dispatch({
                  api_hash: bot,
                  fromFile: true,
                });
              }}
            />
          </div>
        ))}
        {/* <pre>{JSON.stringify(availableBotsByFilesData, null, 2)}</pre> */}
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
        }}
      >
        <div className="flex items-center gap-4">
          {/* <InitBot /> */}
          <TextInput
            label="botName"
            type="text"
            placeholder="botName"
            required
            value={createBotData.botName}
            onChange={(e) => {
              dispatch({ botName: e });
            }}
          />
          <Clickable
            warning
            // text="Generate botName"
            icon={IoIosRefresh}
            onClick={() => {
              dispatch({ botName: generateUsername() });
            }}
          />
        </div>
        {!createBotData.fromFile && (
          <>
            <TextInput
              value={createBotData.api_id.toString()}
              onChange={(e) => {
                dispatch({ api_id: parseInt(e) });
              }}
              label="api_id"
              // type="string"
              placeholder="api_id"
              required
            />
            <TextInput
              label="api_hash"
              type="text"
              placeholder="api_hash"
              required
              value={createBotData.api_hash}
              onChange={(e) => {
                dispatch({ api_hash: e });
              }}
            />
            <TextInput
              label="sessionString"
              type="text"
              placeholder="sessionString"
              required
              value={createBotData.sessionString}
              onChange={(e) => {
                dispatch({ sessionString: e });
              }}
            />
            {/* <SessionStringRestore
              api_id={createBotData.api_id}
              requestedPhone={true}
            /> */}
          </>
        )}
        {createBotData.fromFile && (
          <TextInput
            label="FileName"
            type="text"
            placeholder="Digits"
            required
            value={createBotData.api_hash}
            onChange={(e) => {
              dispatch({ api_hash: e });
            }}
          />
        )}
        <TextInput
          label="behaviorModel"
          type="text"
          placeholder="behaviorModel"
          required
          value={createBotData.behaviorModel}
          onChange={(e) => {
            dispatch({ behaviorModel: e });
          }}
        />

        <BooleanInput
          // fromFile
          label="fromFile"
          value={createBotData.fromFile}
          onChange={(e) => {
            dispatch({ fromFile: e });
          }}
        />

        <Clickable
          primary
          text="Create Bot"
          onClick={async () => {
            const res = await createBot({
              variables: {
                createBotInput: createBotData,
              },
              refetchQueries: [
                {
                  query: getBotsQuery,
                },
                {
                  query: getAvailableBotsByFilesQuery,
                },
              ],
            });
            console.log("res: ", res);
            // router.push("/bots");
          }}
        />
        <Clickable
          // getBotStateQuery
          primary
          text="Get Bot State"
          onClick={async () => {
            await client.refetchQueries({
              include: [getBotStateQuery],
            });
            // const res = await getBotStateQuery.refetch();
            // console.log("res: ", res.data.getBotState);
            // router.push("/bots");
          }}
        />
      </form>
      {createBotError && <pre>{JSON.stringify(createBotError, null, 2)}</pre>}
      <pre>{JSON.stringify(createBotData, null, 2)}</pre>
    </Layout>
  );
};

export default CreateBotPage;
