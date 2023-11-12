import { NextPage } from "next";
import { Layout } from "../../src/shared/Layout/Layout";
import { CreateBotInput } from "@core/types/server";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import {
  createBotMutation,
  getBotStateQuery,
  getBotStatesQuery,
  getBotsQuery,
} from "./gql";
import { TextInput } from "../../src/shared/Input/TextInput";
import { Clickable } from "../../src/shared/Clickable/Clickable";
import { useReducer, useState } from "react";
import { useRouter } from "next/router";
import { InitBot } from "./InitBot";
import { SessionStringRestore } from "../../src/shared/BotSessionStringRestore/BotSessionStringRestore";

const defaultCreateBotData: CreateBotInput = {
  api_id: 26411752,
  api_hash: "848d6968bf2786c0ebd73be6b2d3279e",
  botName: "andromeda",
  behaviorModel: "base",
  sessionString: "",
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

  const router = useRouter();

  const [createBotData, dispatch] = useReducer(
    (state: CreateBotInput, newState: Partial<CreateBotInput>) => ({
      ...state,
      ...newState,
    }),
    defaultCreateBotData
  );

  return (
    <Layout>
      <h1>Create Bot</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
        }}
      >
        {/* <InitBot /> */}
        <TextInput
          value={createBotData.api_id.toString()}
          onChange={(e) => {
            dispatch({ api_id: parseInt(e) });
          }}
          label="api_id"
          type="number"
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
          label="botName"
          type="text"
          placeholder="botName"
          required
          value={createBotData.botName}
          onChange={(e) => {
            dispatch({ botName: e });
          }}
        />
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
        {/* <TextInput
          label="sessionString"
          type="text"
          placeholder="sessionString"
          required
          value={createBotData.sessionString}
          onChange={(e) => {
            dispatch({ sessionString: e });
          }}
        /> */}
        <SessionStringRestore api_id={createBotData.api_id} />
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
