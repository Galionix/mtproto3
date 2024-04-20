import { NextPage } from "next";
import dynamic from "next/dynamic";
import { Layout } from "../../src/shared/Layout/Layout";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  mutationCreateSpamMessage,
  mutationRemoveSpamMessage,
  querySpamMessages,
  querySpamMessagesByDbName,
} from "./gql";
import { MessageRenderer } from "../../src/domains/spam/MessageRenderer";
import {
  TextInput,
  TextInputWithChoicesList,
} from "../../src/shared/Input/TextInput";
import { CreateMessageInput } from "../../apollo/codegen/graphql";
import { useCallback, useState } from "react";
import { AScenarioElementType, EScenarioElementType } from "@core/types/client";
import { Clickable } from "../../src/shared/Clickable/Clickable";
import { debounce } from "lodash";
import { NoData } from "../../src/shared/NoData/NoData";
import { getBasicScenariosDetailsQuery } from "../scenarios/gql";

const SpamPage: NextPage = () => {
  // querySpamMessages
  const { data } = useQuery(querySpamMessages);

  const [createSpamMessageInput, setCreateSpamMessageInput] = useState<
    Partial<CreateMessageInput>
  >({
    type: EScenarioElementType.TEXT,
    isSpam: true,
    db_name: "group_spam_db",
    scenarioIdForSpam: "",
  });

  const [filterDbName, setFilterDbName] = useState<string>("");

  // mutationCreateSpamMessage
  const [createSpamMessage] = useMutation(mutationCreateSpamMessage);
  // mutationRemoveSpamMessage
  const [removeSpamMessage] = useMutation(mutationRemoveSpamMessage);
  const removeFunction = useCallback(
    async (id: string) => {
      await removeSpamMessage({
        variables: {
          id,
        },
        refetchQueries: [
          {
            query: querySpamMessages,
          },
        ],
      });
    },
    [removeSpamMessage]
  );

  // querySpamMessagesByDbName lazyQuery
  const [getSpamMessagesByDbName, { data: spamMessagesByDbName }] =
    useLazyQuery(querySpamMessagesByDbName);

  const messagesToShow = filterDbName
    ? spamMessagesByDbName?.spamMessagesByDbName
    : data?.spamMessages;
  console.log("messagesToShow: ", messagesToShow);
  const debouncedDBNameSearch = useCallback(
    debounce((e) => {
      getSpamMessagesByDbName({ variables: { db_name: e } });
    }, 500),
    []
  );

  const { data: basicScenariosInfo, loading } = useQuery(
    getBasicScenariosDetailsQuery
  );

  const scenaroisChoices = basicScenariosInfo?.scenarios?.map(
    (scenario) => scenario.id
  );

  return (
    <Layout>
      <h1>Spam</h1>

      <form className="flex gap-2 items-center">
        <TextInputWithChoicesList
          required
          label="Type"
          defaultValue={EScenarioElementType.TEXT}
          choices={AScenarioElementType}
          value={createSpamMessageInput.type}
          onChange={(e) => {
            setCreateSpamMessageInput({ ...createSpamMessageInput, type: e });
          }}
        />
        {/* db_name */}
        <TextInput
          label="DB Name"
          type="text"
          value={createSpamMessageInput.db_name}
          onChange={(e) => {
            setCreateSpamMessageInput({
              ...createSpamMessageInput,
              db_name: e,
            });
          }}
        />
        <TextInput
          label="Text"
          type="text"
          value={createSpamMessageInput.text}
          onChange={(e) => {
            setCreateSpamMessageInput({ ...createSpamMessageInput, text: e });
          }}
        />
        {!loading && (
          <TextInputWithChoicesList
            // required
            loading={loading}
            label="Scenario Id For Spam"
            defaultValue={""}
            choices={scenaroisChoices}
            value={createSpamMessageInput.scenarioIdForSpam}
            // choices={AScenarioElementType}
            // value={createSpamMessageInput.type}
            onChange={(e) => {
              setCreateSpamMessageInput({
                ...createSpamMessageInput,
                scenarioIdForSpam: e,
              });
            }}
          />
        )}
        <Clickable
          primary
          text="Create"
          onClick={async (e) => {
            e.preventDefault();
            console.log("createSpamMessageInput: ", createSpamMessageInput);
            await createSpamMessage({
              variables: {
                createSpamMessageInput:
                  createSpamMessageInput as CreateMessageInput,
              },
              refetchQueries: [
                {
                  query: querySpamMessages,
                },
              ],
            });
            setCreateSpamMessageInput({ ...createSpamMessageInput, text: "" });
          }}
        />
      </form>
      <section>
        <TextInput
          label="Filter by DB Name"
          type="text"
          value={filterDbName}
          onChange={(e) => {
            setFilterDbName(e);
            debouncedDBNameSearch(e);
          }}
        />
      </section>
      <ul>
        {messagesToShow && messagesToShow.length !== 0 ? (
          messagesToShow.map((spamMessage) => (
            <li key={spamMessage.id}>
              <MessageRenderer
                message={spamMessage}
                removeFunction={removeFunction}
              />
            </li>
          ))
        ) : (
          <NoData
            title={
              filterDbName
                ? `spam messages for ${filterDbName}`
                : "spam messages"
            }
          />
        )}
      </ul>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(SpamPage), {
  ssr: false,
});
