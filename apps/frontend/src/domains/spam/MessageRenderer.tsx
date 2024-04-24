import {
  CreateMessageInput,
  ScenarioEntity,
  TMessageEntity,
} from "@core/types/server";
import {
  mutationUpdateSpamMessage,
  querySpamMessages,
} from "../../../pages/spam/gql";
import { Clickable } from "../../shared/Clickable/Clickable";
import { FaTrash } from "react-icons/fa";
import { PiFilmScriptFill } from "react-icons/pi";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import {
  TextInput,
  TextInputWithChoicesList,
} from "../../shared/Input/TextInput";
import { AScenarioElementType, EScenarioElementType } from "@core/types/client";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { getBasicScenariosDetailsQuery } from "../../../pages/scenarios/gql";
import { PreviewScenarioButton } from "../scenarios/PreviewScenarioButton/PreviewScenarioButton";

export const MessageRenderer = ({
  message,
  removeFunction,
  scenarios,
}: {
  scenarios: ScenarioEntity[];
  message: Partial<TMessageEntity>;
  removeFunction: (id: string) => void;
}) => {
  const { type, text, audio, db_name, scenarioIdForSpam } = message;
  // updateSpamMessage
  const [updateSpamMessage] = useMutation(mutationUpdateSpamMessage);
  const [editingMessage, setEditingMessage] = useState(false);
  const [editedMessage, setEditedMessage] =
    useState<Partial<TMessageEntity>>(message);
  const [loadScenarios, { called, loading, data: basicScenariosInfo }] =
    useLazyQuery(getBasicScenariosDetailsQuery);

  const scenaroisChoices = basicScenariosInfo?.scenarios?.map(
    (scenario) => scenario.id
  );

  // we need to extract __typename and id from editedMessage
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { __typename, id, ...updateMessageData } = editedMessage;
  return (
    <div className="flex items-center justify-between p-2 border-b gap-1">
      {!editingMessage ? (
        <>
          <b className="text-gray-500 text-xs">{type}</b>
          <span className="text-gray-500  text-xs">{db_name}</span>
          {text && <p className="mr-auto">{text}</p>}
          {audio && <audio className="mr-auto" src={audio} controls></audio>}
        </>
      ) : (
        <>
          <TextInputWithChoicesList
            required
            label="Type"
            defaultValue={editedMessage.type}
            choices={AScenarioElementType}
            value={editedMessage.type}
            onChange={(e) => {
              setEditedMessage({ ...editedMessage, type: e });
            }}
          />
          {/* db_name */}
          <TextInput
            label="DB Name"
            type="text"
            value={editedMessage.db_name}
            onChange={(e) => {
              setEditedMessage({
                ...editedMessage,
                db_name: e,
              });
            }}
          />
          <TextInput
            label="Text"
            type="text"
            value={editedMessage.text}
            onChange={(e) => {
              setEditedMessage({ ...editedMessage, text: e });
            }}
          />
          {!loading && (
            <TextInputWithChoicesList
              loading={loading}
              label="Scenario Id For Spam"
              defaultValue={""}
              choices={scenaroisChoices}
              value={editedMessage.scenarioIdForSpam}
              // choices={AScenarioElementType}
              // value={createSpamMessageInput.type}
              onChange={(e) => {
                setEditedMessage({
                  ...editedMessage,
                  scenarioIdForSpam: e,
                });
              }}
            />
          )}
          {/* <TextInputWithChoicesList
              value={editedMessage.text}
              onChange={(e) =>
                setEditedMessage({ ...editedMessage, type: e })
              }
              choices={["text", "audio", "video", "photo"]}
            /> */}
        </>
      )}
      {editingMessage && (
        <>
          <Clickable
            className="ml-auto"
            title="Save"
            primary
            icon={FaRegSave}
            onClick={async () => {
              await updateSpamMessage({
                variables: {
                  id: message.id,
                  updateSpamMessageInput:
                    updateMessageData as CreateMessageInput,
                },
                refetchQueries: [
                  {
                    query: querySpamMessages,
                  },
                ],
              });
              setEditingMessage(!editingMessage);
            }}
          />
          <Clickable
            title="Cancel"
            danger
            icon={MdCancel}
            onClick={() => setEditingMessage(!editingMessage)}
          />
        </>
      )}

      {/* edit message */}
      {!editingMessage && (
        <>
          {scenarioIdForSpam && (
            <>
              <PreviewScenarioButton
                showDescription
                scenario={
                  scenarios?.find(
                    (scenario) => scenario.id === scenarioIdForSpam
                  ) as ScenarioEntity
                }
              />
              <Clickable
                text="Edit scenario"
                // className="ml-auto"
                comp="link"
                title="Edit scenario"
                icon={PiFilmScriptFill}
                href={"scenarios/" + id + "/edit"}
                // onClick={() => removeFunction(message.id as string)}
              />
            </>
          )}
          <Clickable
            title="Edit"
            warning
            icon={CiEdit}
            onClick={() => {
              loadScenarios();
              setEditingMessage(!editingMessage);
            }}
            // href={"messages/" + id + "/edit"}
            // onClick={() => removeFunction(message.id as string)}
          />

          <Clickable
            // className="ml-auto"
            title="Remove"
            danger
            icon={FaTrash}
            onClick={() => removeFunction(message.id as string)}
          />
        </>
      )}
    </div>
  );
};
