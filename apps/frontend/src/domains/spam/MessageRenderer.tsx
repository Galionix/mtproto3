import { TMessageEntity } from "@core/types/server";
import { querySpamMessages } from "../../../pages/spam/gql";
import { Clickable } from "../../shared/Clickable/Clickable";
import { FaTrash } from "react-icons/fa";
import { PiFilmScriptFill } from "react-icons/pi";

export const MessageRenderer = ({
  message,
  removeFunction,
}: {
  message: Partial<TMessageEntity>;
  removeFunction: (id: string) => void;
}) => {
  const { type, text, audio, db_name, scenarioIdForSpam, id } = message;
  return (
    <div className="flex items-center justify-between p-2 border-b gap-1">
      <b className="text-gray-500 text-xs">{type}</b>
      <span className="text-gray-500  text-xs">{db_name}</span>
      {text && <p className="mr-auto">{text}</p>}
      {audio && <audio className="mr-auto" src={audio} controls></audio>}
      {scenarioIdForSpam && (
        <Clickable
          title="Edit scenario"
          className="ml-auto"
          icon={PiFilmScriptFill}
          href={"scenarios/" + id + "/edit"}
          // onClick={() => removeFunction(message.id as string)}
        />
      )}
      <Clickable
        // className="ml-auto"
        title="Remove"
        danger
        icon={FaTrash}
        onClick={() => removeFunction(message.id as string)}
      />
    </div>
  );
};
