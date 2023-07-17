import { NextPage } from "next";
import { Layout } from "../../src/shared/Layout/Layout";
import { CreateBotInput } from "@core/types/server";
import { useMutation } from "@apollo/client";
import { createBotMutation, getBotsQuery } from "./gql";
import { TextInput } from "../../src/shared/Input/TextInput";
import { Clickable } from "../../src/shared/Clickable/Clickable";
import { useReducer } from "react";
import { useRouter } from "next/router";

const defaultCreateBotData: CreateBotInput = {
  api_id: 0,
  api_hash: "",
  botName: "",
  behaviorModel: "",
  sessionString: "",
};

const CreateBotPage: NextPage = () => {
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
        <Clickable
          primary
          text="Create Bot"
          onClick={async () => {
            await createBot({
              variables: {
                createBotInput: createBotData,
              },
              refetchQueries: [
                {
                  query: getBotsQuery,
                },
              ],
            });
            router.push("/bots");
          }}
        />
      </form>
      {createBotError && <pre>{JSON.stringify(createBotError, null, 2)}</pre>}
      <pre>{JSON.stringify(createBotData, null, 2)}</pre>
    </Layout>
  );
};

export default CreateBotPage;
