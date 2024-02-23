import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { BotsQuery } from "../../../../apollo/codegen/graphql";
import { Clickable } from "../../../shared/Clickable/Clickable";
import { TextInput } from "../../../shared/Input/TextInput";
import { useState } from "react";
import {
  mutationJoinGroups,
  queryStartBotsDelayed,
  queryStartBotsImmediately,
  queryStopBots,
} from "./gql";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { MdOutlineRestartAlt } from "react-icons/md";
import { VscDebugRestartFrame } from "react-icons/Vsc";

type BotsIndexPanelProps = {
  selectedBots: BotsQuery["bots"];
};
export const BotsIndexPanel = ({ selectedBots }: BotsIndexPanelProps) => {
  const api_ids = selectedBots.map((bot) => bot.api_id);
  console.log("running selectedBots: ", selectedBots);
  const [joinGroupsLinks, setJoinGroupsLinks] = useState<string[]>([]);
  const [panelShown, setPanelShown] = useState(false);

  // mutationJoinGroups
  const [joinGroups] = useMutation(mutationJoinGroups);
  // queryStopBots
  const [stopBots] = useLazyQuery(queryStopBots);
  // queryStartBotsDelayed
  const [startBotsDelayed] = useLazyQuery(queryStartBotsDelayed);
  // queryStartBotsImmediately
  const [startBotsImmediately] = useLazyQuery(queryStartBotsImmediately);

  const linksToJoin = joinGroupsLinks.filter((link) => link !== "");
  const panel = panelShown ? (
    <div className="flex mb-2 gap-1">
      <TextInput
        area
        label="Join Groups Links"
        placeholder="Enter group links separated by new line"
        value={joinGroupsLinks.join("\n")}
        onChange={(v) => {
          const links = v.split("\n");
          setJoinGroupsLinks(links);
        }}
      />
      <Clickable
        disabled={api_ids.length === 0 || linksToJoin.length === 0}
        primary
        text="Join Groups"
        onClick={() => {
          joinGroups({
            variables: {
              joinGroupsInput: {
                api_ids: api_ids.map((i) => parseInt(i)),
                chatNames: linksToJoin,
              },
            },
          });
          console.log("api_ids", api_ids, "joinGroupsLinks", joinGroupsLinks);
        }}
      />
    </div>
  ) : null;
  return (
    <div>
      <h1>Bot Index Panel</h1>
      <div className="flex gap-1 mb-2">
        <Clickable
          icon={VscDebugRestartFrame}
          text="Restart All Delayed"
          primary
          onClick={async () => {
            await stopBots();
            await startBotsDelayed();
          }}
        />
        <Clickable
          icon={MdOutlineRestartAlt}
          text="Restart All Immediate"
          primary
          onClick={async () => {
            await stopBots();
            await startBotsImmediately();
          }}
        />
      </div>
      {/* show panel */}
      <Clickable
        primary
        icon={panelShown ? BiChevronUp : BiChevronDown}
        text={panelShown ? "Hide panel" : "Show panel"}
        onClick={() => {
          setPanelShown(!panelShown);
        }}
      />
      {/* join groups */}
      {panel}
      {/* <TextInput
        area
        label="Join Groups Links"
        placeholder="Enter group links separated by new line"
        value={joinGroupsLinks.join("\n")}
        onChange={(v) => {
          const links = v.split("\n");
          setJoinGroupsLinks(links);
        }}
      />
      <Clickable
        disabled={api_ids.length === 0 || linksToJoin.length === 0}
        primary
        text="Join Groups"
        onClick={() => {
          console.log("api_ids", api_ids, "joinGroupsLinks", joinGroupsLinks);
        }}
      /> */}
    </div>
  );
};
