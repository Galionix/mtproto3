import { useMutation, useQuery } from "@apollo/client";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { CiEdit } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import { useModal } from "../../src/Modal/Modal";
import { Clickable } from "../../src/shared/Clickable/Clickable";
import { Layout } from "../../src/shared/Layout/Layout";
import { Table } from "../../src/shared/Table/Table";
import {
  getBotStatesQuery,
  getBotsQuery,
  removeBotMutation,
  restartBotMutation,
  stopBotMutation,
} from "./gql";
import { BsStopCircle } from "react-icons/bs";
import { VscDebugStart } from "react-icons/Vsc";

const BotsPage: NextPage = () => {
  const { data } = useQuery(getBotsQuery);
  const { data: botStates } = useQuery(getBotStatesQuery, {
    pollInterval: 1000,
  });

  const [restartBot, { data: restartBotData }] =
    useMutation(restartBotMutation);
  const [stopBot, { data: stopBotData }] = useMutation(stopBotMutation);

  const [removeBot, { data: removeBotData, loading, error }] =
    useMutation(removeBotMutation);
  const [DeleteModal, { showModal }] = useModal<string>({
    id: "deleteModal",
    children: (id) => {
      return (
        <div>
          <span>Are you sure you want to delete this bot?</span>
          <h2>Api_ID: {id}</h2>
        </div>
      );
    },
    danger: true,
    onSubmit: (id: string) => {
      removeBot({
        variables: {
          api_id: parseInt(id),
        },
        refetchQueries: [
          {
            query: getBotsQuery,
          },
        ],
      });
    },
  });

  const botsForTable =
    data?.bots.map((bot) => {
      const botState = botStates?.getBotStates.find(
        (botState) => botState.bot.api_id === bot.api_id
      );
      return {
        id: bot.api_id,
        botState,
        ...bot,
      };
    }) || [];

  return (
    <Layout>
      <h1>Bots</h1>
      {DeleteModal}
      <Clickable primary text="Create New Bot" href="/bots/create" />
      <Table
        columns={["api_id", "botName", "api_hash", "behaviorModel"]}
        data={botsForTable}
        rowLeftControls={(bot) => [
          <Clickable
            key={bot.api_id}
            danger={!bot.botState?.isRunning}
            primary={bot.botState?.isRunning}
            icon={bot.botState?.isRunning ? BsStopCircle : VscDebugStart}
            title={bot.botState?.isRunning ? "stop" : "start"}
            onClick={() => {
              if (bot.botState?.isRunning) {
                stopBot({
                  variables: {
                    api_id: parseInt(bot.api_id),
                  },
                  refetchQueries: [
                    {
                      query: getBotStatesQuery,
                    },
                  ],
                });
                // console.log("stop bot");
              } else {
                restartBot({
                  variables: {
                    api_id: parseInt(bot.api_id),
                  },
                  refetchQueries: [
                    {
                      query: getBotStatesQuery,
                    },
                  ],
                });
              }
            }}
          />,
        ]}
        rowControls={(bot) => [
          <Clickable
            key={bot.api_id}
            primary
            icon={CiEdit}
            href={`/bots/${bot.api_id}/edit`}
            title="edit"
          />,
          <Clickable
            key={"delete"}
            danger
            icon={FaTrash}
            title="delete"
            onClick={() => {
              showModal(bot.api_id);
            }}
          />,
        ]}
      />
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(BotsPage), {
  ssr: false,
});
