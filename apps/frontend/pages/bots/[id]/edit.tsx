/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextPage } from "next";
import {
  BotStateEntity,
  CreateBotInput,
  UpdateBotInput,
} from "@core/types/server";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/router";
import { Layout } from "../../../src/shared/Layout/Layout";
import { getBotQuery, updateBotMutation } from "./gql";
import { TextInput } from "../../../src/shared/Input/TextInput";
import { EditableList } from "../../../src/shared/EditableList/EditableList";
import { Clickable } from "../../../src/shared/Clickable/Clickable";

// const defaultCreateBotData: CreateBotInput = {
//   api_id: 0,
//   api_hash: "",
//   botName: "",
//   behaviorModel: "",
//   sessionString: "",
// };

const EditBotPage: NextPage = () => {
  //   const [
  //     createBot,
  //     {
  //       data: createBotDataResult,
  //       loading: createBotLoading,
  //       error: createBotError,
  //     },
  //   ] = useMutation(createBotMutation);
  const router = useRouter();
  const { id } = router.query;
  const { data: { bot } = { bot: null } } = useQuery(getBotQuery, {
    variables: { api_id: parseInt(`${id}`) },
  });
  console.log("bot: ", bot);
  console.log("bot?.typeDelayMultiplier: ", bot?.typeDelayMultiplier);
  const preparedBotData = {
    ...bot,
    // dmScenarioNames: bot?.dmScenarioNames?.join(","),
    typeDelayMultiplier: 1,
  };

  // updateBotMutation
  const [
    updateBot,
    {
      data: updateBotDataResult,
      loading: updateBotLoading,
      error: updateBotError,
    },
  ] = useMutation(updateBotMutation);

  const [updateBotData, dispatch] = useReducer(
    (state: Partial<UpdateBotInput>, newState: Partial<UpdateBotInput>) => ({
      ...state,
      ...newState,
    }),
    preparedBotData
  );

  useEffect(() => {
    dispatch(preparedBotData);
  }, [bot]);
  console.log("updateBotData: ", updateBotData);

  // useEffect(() => {
  //   dispatch(preparedBotData);
  // }, [bot]);
  console.log("updateBotData: ", updateBotData);
  //   console.log("bot: ", bot);
  //   const botData: BotStateEntity = null;

  //   const [editBotData, dispatch] = useReducer(
  //     (state: CreateBotInput, newState: Partial<CreateBotInput>) => ({
  //       ...state,
  //       ...newState,
  //     }),
  //     defaultCreateBotData
  //   );
  const [taskOrder, setTaskOrder] = useState(
    bot?.taskOrder ? bot.taskOrder.split(",") : []
  );
  console.log(bot?.taskOrder);
  console.log("taskOrder: ", taskOrder);
  const [error, setError] = useState("");
  console.log("error: ", error);
  // const [editBotData, dispatch] = useReducer(
  //     (state: CreateBotInput, newState: Partial<CreateBotInput>) => ({
  //       ...state,
  //       ...newState,
  //     }),
  //     bot
  //   );
  if (!bot)
    return (
      <Layout>
        <h1>Bot not found</h1>
      </Layout>
    );

  return (
    <Layout>
      <h1>Edit Bot {bot.botName}</h1>
      <TextInput
        label="api_id"
        type="number"
        placeholder="api_id"
        required
        value={bot.api_id.toString()}
        disabled
      />
      {/* api_hash */}
      <TextInput
        label="api_hash"
        type="text"
        placeholder="api_hash"
        required
        value={bot.api_hash}
        disabled
      />
      <TextInput
        label="botName"
        type="text"
        placeholder="botName"
        required
        value={bot.botName}
      />
      {/* answersDb */}
      <TextInput
        label="answersDb"
        type="text"
        placeholder="answersDb"
        required
        value={bot.answersDb}
      />
      {/* behaviorModel */}
      <TextInput
        label="behaviorModel"
        type="text"
        placeholder="behaviorModel"
        required
        value={bot.behaviorModel}
      />
      {/* taskOrder */}
      <TextInput
        label="taskOrder"
        type="text"
        placeholder="taskOrder"
        required
        value={bot.taskOrder}
      />
      {/* dmScenarioNames */}
      <TextInput
        label="dmScenarioNames"
        type="text"
        placeholder="dmScenarioNames"
        required
        value={updateBotData.dmScenarioNames?.join(",")}
        onChange={(e) => {
          dispatch({ dmScenarioNames: e.split(",") });
        }}
      />
      {/* <EditableList
        label="taskOrder"
        type="text"
        placeholder="taskOrder"
        required
        items={taskOrder}
        onChange={(items) => {
          setTaskOrder(items);
        }}
        onAdd={(item) => {
          setTaskOrder([...taskOrder, item]);
        }}
        onRemove={(index) => {
          setTaskOrder(taskOrder.filter((_, i) => i !== index));
        }}
        onMove={(from, to) => {
          const newTaskOrder = [...taskOrder];
          newTaskOrder.splice(to, 0, newTaskOrder.splice(from, 1)[0]);
          setTaskOrder(newTaskOrder);
        }}
        onEdit={(index, item) => {
          const newTaskOrder = [...taskOrder];
          newTaskOrder[index] = item;
          setTaskOrder(newTaskOrder);
        }}
        onClearError={() => {
          setError("");
        }}
        onError={(error) => {
          setError(error);
        }}
      /> */}

      {/* <form
        onSubmit={async (e) => {
          e.preventDefault();
        }}
      >
        <TextInput
          value={editBotData.api_id.toString()}
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
          value={editBotData.api_hash}
          onChange={(e) => {
            dispatch({ api_hash: e });
          }}
        />

        <TextInput
          label="behaviorModel"
          type="text"
          placeholder="behaviorModel"
          required
          value={editBotData.behaviorModel}
          onChange={(e) => {
            dispatch({ behaviorModel: e });
          }}
        />
        <TextInput
          label="sessionString"
          type="text"
          placeholder="sessionString"
          required
          value={editBotData.sessionString}
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
                createBotInput: editBotData,
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
      {createBotError && <pre>{JSON.stringify(createBotError, null, 2)}</pre>} */}
      {/* <pre>{JSON.stringify(editBotData, null, 2)}</pre> */}
      <Clickable
        primary
        text="Update Bot"
        onClick={async () => {
          const {
            // @ts-ignore
            __typename,
            // @ts-ignore
            api_hash,
            // @ts-ignore
            api_id,
            // @ts-ignore
            clientStateUpdateTime,
            ...rest
          } = updateBotData;

          const preparedUpdateBotData = {
            ...rest,
            typeDelayMultiplier: `${rest.typeDelayMultiplier}`,
          };
          await updateBot({
            variables: {
              api_id: parseInt(`${id}`),
              updateBotInput: preparedUpdateBotData,
            },
          });
          router.push("/bots");
        }}
      />
    </Layout>
  );
};

export default EditBotPage;
