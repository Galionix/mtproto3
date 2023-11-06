import { Dispatch, useEffect, useReducer, useState } from "react";
import { Clickable } from "../../src/shared/Clickable/Clickable";
import { Layout } from "../../src/shared/Layout/Layout";

import { BiSave } from "react-icons/bi";
import { useRouter } from "next/router";
import {
  TextInput,
  TextInputWithChoicesList,
} from "../../src/shared/Input/TextInput";
import { isEqual } from "lodash";
import { BsFillPlusCircleFill, BsTrashFill } from "react-icons/bs";
import {
  CreateAnswerEntityInput,
  CreateMessageInput,
  CreateScenarioBranchInput,
  CreateScenarioInput,
} from "@core/types/server";
import { v4 as uuidv4 } from "uuid";
import { FaTrash } from "react-icons/fa";
import { AScenarioElementType, EScenarioElementType } from "@core/types/client";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { TestScenario } from "./components/TestScenario";
import { useMutation } from "@apollo/client";
import { createScenarioMutation, getBasicScenariosDetailsQuery } from "./gql";
import { VscDebugStart } from "react-icons/Vsc";
import {
  getPreparedData,
  updateBranchId,
  updateBranchDescription,
  deleteBranch,
  updateNextBranchId,
  updateRequest,
  updateResponseType,
  updateResponseText,
  updateResponseDescription,
  updateResponseCaption,
  updateResponseDbName,
  updateResponseCoefficient,
  deleteResponse,
  addResponseToChoice,
  deleteChoice,
  addChoiceToBranch,
} from "./createUtils";
// import { tempScenario } from "./temp";
import {
  createScenarioInitialData,
  useCreateScenarioStore,
} from "./createScenarioStore";
import cx from "classnames";
export type TResponse = CreateMessageInput & {
  key: string;
};

export type TChoice = {
  key: string;
  responses: TResponse[];
} & Omit<CreateAnswerEntityInput, "responses">;
export type TBranch = Omit<CreateScenarioBranchInput, "choices"> & {
  key?: string;
  choices: TChoice[];
};

export type TCreateScenarioFormData = {
  description: string;
  branches: TBranch[];
  maxConversationLength: string;
  db_name: string;
};
// const initialState: TCreateScenarioFormData = {
//   description: "",
//   branches: [],
//   maxConversationLength: "100",
//   db_name: "",
// };

const CreateScenarioPage = () => {
  // const
  const router = useRouter();
  const [testScenario, setTestScenario] = useState(false);
  const [hiddenBranches, setHiddenBranches] = useState<string[]>([]);
  const [hiddenChoices, setHiddenChoices] = useState<string[]>([]);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [fullyVisibleResponses, setFullyVisibleResponses] = useState<string[]>(
    []
  );
  const [invalidIds, setInvalidIds] = useState<string[]>([]);
  const incorrectChoisesIds = invalidIds.filter((id) => id.includes("choice_"));

  const [arbitraryRawData, setArbitraryRawData] = useState<any>({} as any);

  const [showRawData, setShowRawData] = useState(false);
  const [incorrectBranchIds, setIncorrectBranchIds] = useState<string[]>([]);

  const [createScenario, { data, loading, error }] = useMutation(
    createScenarioMutation
  );
  const { scenario, setScenario, clearScenario } = useCreateScenarioStore();

  const [formData, dispatch] = useReducer(
    (
      state: TCreateScenarioFormData,
      newState: Partial<TCreateScenarioFormData>
    ) => {
      const result = { ...state, ...newState };

      setUnsavedChanges(!isEqual(result, scenario));
      setScenario(result);
      return result;
    },
    scenario
  );

  const choices = formData.branches.flatMap((branch) => branch.choices);

  const incorrectChoisesValues = choices
    .filter((choice) => incorrectChoisesIds.includes("choice_" + choice.key))
    .map((choice) => choice.nextBranchId);

  const branchIds = formData.branches.map((branch) => branch.id);

  //   const warningText =
  //     "You have unsaved changes - are you sure you wish to leave this page?";

  //   useEffect(() => {
  //     const handleWindowClose = (e) => {
  //       if (!unsavedChanges) return;
  //       e.preventDefault();
  //       return (e.returnValue = warningText);
  //     };
  //     const handleBrowseAway = () => {
  //       if (!unsavedChanges) return;
  //       if (window.confirm(warningText)) return;
  //       router.events.emit("routeChangeError");
  //       throw "routeChange aborted.";
  //     };
  //     window.addEventListener("beforeunload", handleWindowClose);
  //     router.events.on("routeChangeStart", handleBrowseAway);
  //     return () => {
  //       window.removeEventListener("beforeunload", handleWindowClose);
  //       router.events.off("routeChangeStart", handleBrowseAway);
  //     };
  //   }, [router.events, unsavedChanges]);

  return (
    <Layout
      outside={
        <>
          <div
            className={cx(
              "fixed border-2 border-black p-2 border-4  m-1 rounded top-20 bg-gray-100 left-0 z-10"
            )}
          >
            <p>Icorrect branch ids:</p>
            <ul>
              {incorrectChoisesValues.map((id) => (
                <li
                  key={id}
                  // className={cx({
                  //   "text-red-500": incorrectBranchIds.includes(id),
                  // })}
                >
                  {id}
                </li>
              ))}
            </ul>
          </div>
        </>
      }
    >
      <div className="flex flex-row gap-2">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between gap-2 flex-row items-center">
            <h1>Create Scenario Page</h1>
            {/* clear scenario */}
            <Clickable
              danger
              primary={unsavedChanges}
              disabled={!unsavedChanges}
              className="ml-auto"
              icon={BsTrashFill}
              text="Clear Scenario"
              onClick={() => {
                clearScenario();
                dispatch(createScenarioInitialData);
              }}
            />
            <Clickable
              className="ml-auto"
              icon={VscDebugStart}
              text="Test Scenario"
              onClick={() => {
                setTestScenario(!testScenario);
              }}
            />

            <Clickable
              icon={BiSave}
              primary={unsavedChanges}
              disabled={!unsavedChanges}
              text="Save"
              onClick={async () => {
                const preparedFormData = getPreparedData(formData);

                await createScenario({
                  variables: {
                    createScenarioInput: preparedFormData,
                  },
                  refetchQueries: [
                    {
                      query: getBasicScenariosDetailsQuery,
                    },
                  ],
                });

                if (!error) {
                  dispatch(createScenarioInitialData);
                  clearScenario();
                  setUnsavedChanges(false);
                  router.push("/scenarios");
                }
              }}
            />
          </div>
          <div>
            <TextInput
              required
              label="Scenario Description"
              value={formData.description}
              onChange={(value) => {
                dispatch({ description: value });
              }}
            />
            <TextInput
              label="Scenario Database Name"
              required
              value={formData.db_name}
              onChange={(value) => {
                dispatch({ db_name: value });
              }}
            />

            <TextInput
              label="Max Conversation Length"
              required
              value={formData.maxConversationLength}
              onChange={(value) => {
                dispatch({ maxConversationLength: value });
              }}
            />
          </div>

          <div>
            {formData.branches?.map((branch, index) => {
              const branchInvalid = invalidIds.includes(branch.id);
              const choicesHidden = hiddenBranches.includes(branch.key);
              return (
                <div
                  className={cx(
                    "border-2 border-black p-2 border-4  m-1 rounded",
                    {
                      "border-red-500": branchInvalid,
                      "border-indigo-500": !branchInvalid,
                    }
                  )}
                  key={branch.key}
                >
                  <div className="flex flex-row gap-1 items-center justify-between">
                    <TextInput
                      required
                      label="Branch Id"
                      value={branch.id}
                      onChange={updateBranchId(
                        dispatch,
                        formData,
                        index,
                        branch
                      )}
                    />
                    <TextInput
                      required
                      label="Branch Description"
                      value={branch.description}
                      onChange={updateBranchDescription(
                        dispatch,
                        formData,
                        index,
                        branch
                      )}
                    />

                    <Clickable
                      primary={choicesHidden}
                      icon={choicesHidden ? AiFillEyeInvisible : AiFillEye}
                      text="Toggle Choices"
                      onClick={() => {
                        if (choicesHidden) {
                          setHiddenBranches(
                            hiddenBranches.filter((b) => b !== branch.key)
                          );
                        } else {
                          setHiddenBranches([...hiddenBranches, branch.key]);
                        }
                      }}
                    />

                    <Clickable
                      danger
                      icon={FaTrash}
                      title="Delete Branch"
                      onClick={deleteBranch(dispatch, formData, index)}
                    />
                  </div>
                  {choicesHidden && <div>Choices: {branch.choices.length}</div>}
                  {!choicesHidden && (
                    <div>
                      {branch.choices?.map((choice, choiceIndex) => {
                        const choiceHidden = hiddenChoices.includes(choice.key);

                        if (choiceHidden)
                          return (
                            <div
                              className="border-2 border-black p-2 border-4 border-sky-300 m-1 rounded flex flex-row gap-2"
                              key={choice.key}
                            >
                              <span>
                                Choice {choiceIndex + 1} of{" "}
                                {branch.choices.length}
                              </span>
                              <span>Responses: {choice.responses.length}</span>
                              <Clickable
                                primary
                                className="ml-auto"
                                title="Show Choice"
                                icon={AiFillEye}
                                onClick={() => {
                                  setHiddenChoices(
                                    hiddenChoices.filter(
                                      (c) => c !== choice.key
                                    )
                                  );
                                }}
                              />
                            </div>
                          );

                        return (
                          <div
                            // className="border-2 border-black p-2 border-4 border-sky-300 m-1 rounded"
                            className={cx(
                              "border-2 border-black p-2 border-4  m-1 rounded",
                              {
                                "border-red-500": invalidIds.includes(
                                  "choice_" + choice.key
                                ),
                                "border-sky-300": !invalidIds.includes(
                                  "choice_" + choice.key
                                ),
                              }
                            )}
                            key={choice.key}
                          >
                            <div className="flex gap-1">
                              <span>
                                Choice {choiceIndex + 1} of{" "}
                                {branch.choices.length}
                              </span>
                              <Clickable
                                className="ml-auto"
                                title="Hide Choice"
                                icon={AiFillEyeInvisible}
                                onClick={() => {
                                  setHiddenChoices([
                                    ...hiddenChoices,
                                    choice.key,
                                  ]);
                                }}
                              />
                            </div>
                            <TextInputWithChoicesList
                              required
                              label="Next Branch Id"
                              value={choice.nextBranchId}
                              onChange={(val) => {
                                updateNextBranchId(
                                  dispatch,

                                  formData,
                                  index,
                                  branch,
                                  choiceIndex,
                                  choice
                                )(val);
                              }}
                              onError={() => {
                                setInvalidIds([
                                  ...invalidIds,
                                  branch.id,
                                  "choice_" + choice.key,
                                ]);
                              }}
                              onClearError={
                                invalidIds.includes(branch.id)
                                  ? () => {
                                      setInvalidIds(
                                        invalidIds.filter(
                                          (id) =>
                                            id !== branch.id &&
                                            id !== "choice_" + choice.key
                                        )
                                      );
                                    }
                                  : undefined
                              }
                              choices={branchIds}
                            />
                            <TextInput
                              required
                              label="Request"
                              fullWidth
                              value={choice.request.join(",")}
                              onChange={updateRequest(
                                dispatch,
                                formData,
                                index,
                                branch,
                                choiceIndex,
                                choice
                              )}
                            />
                            <div>
                              <div className="flex flex-col gap-1 justify-center">
                                <h1>Responses</h1>
                              </div>
                              {choice.responses.map(
                                (response, responseIndex) => {
                                  const responseHidden =
                                    fullyVisibleResponses.includes(
                                      response.key
                                    );

                                  return (
                                    <div
                                      className="flex flex-row gap-2 border-2 border-black p-2 border-4 border-teal-300 m-1 rounded"
                                      key={responseIndex}
                                    >
                                      <section className="w-full ">
                                        <TextInput
                                          className="w-full !max-w-full"
                                          required={
                                            response.type ===
                                            EScenarioElementType.TEXT
                                          }
                                          label="Response Text"
                                          value={response.text}
                                          onChange={updateResponseText(
                                            dispatch,
                                            formData,
                                            index,
                                            branch,
                                            choiceIndex,
                                            choice,
                                            responseIndex,
                                            response
                                          )}
                                        />
                                        {responseHidden && (
                                          <>
                                            <TextInputWithChoicesList
                                              choices={AScenarioElementType}
                                              required
                                              className="w-full"
                                              label="Response Type"
                                              value={response.type}
                                              defaultValue={
                                                EScenarioElementType.TEXT
                                              }
                                              onChange={updateResponseType(
                                                dispatch,
                                                formData,
                                                index,
                                                branch,
                                                choiceIndex,
                                                choice,
                                                responseIndex,
                                                response
                                              )}
                                            />
                                            <TextInput
                                              className="w-full"
                                              label="Response Description"
                                              value={response.description}
                                              onChange={updateResponseDescription(
                                                dispatch,
                                                formData,
                                                index,
                                                choiceIndex,
                                                responseIndex
                                              )}
                                            />
                                            <TextInput
                                              className="w-full"
                                              label="Response Caption"
                                              value={response.caption}
                                              onChange={updateResponseCaption(
                                                dispatch,
                                                formData,
                                                index,
                                                choiceIndex,
                                                responseIndex
                                              )}
                                            />
                                            <TextInput
                                              className="w-full"
                                              label="Response DB Name"
                                              value={response.db_name}
                                              onChange={updateResponseDbName(
                                                dispatch,
                                                formData,
                                                index,
                                                choiceIndex,
                                                responseIndex
                                              )}
                                            />
                                            <TextInput
                                              className="w-full"
                                              label="Response Coefficient"
                                              value={response.coefficient}
                                              onChange={updateResponseCoefficient(
                                                dispatch,
                                                formData,
                                                index,
                                                choiceIndex,
                                                responseIndex
                                              )}
                                            />
                                          </>
                                        )}
                                      </section>
                                      <Clickable
                                        className="ml-auto !w-full max-w-fit"
                                        //   primary={responseHidden}
                                        icon={
                                          responseHidden
                                            ? AiFillEyeInvisible
                                            : AiFillEye
                                        }
                                        text="Additional Fields"
                                        onClick={() => {
                                          if (responseHidden) {
                                            setFullyVisibleResponses(
                                              fullyVisibleResponses.filter(
                                                (r) => r !== response.key
                                              )
                                            );
                                          } else {
                                            setFullyVisibleResponses([
                                              ...fullyVisibleResponses,
                                              response.key,
                                            ]);
                                          }
                                        }}
                                      />
                                      <Clickable
                                        className={`ml-3`}
                                        title="Delete Response"
                                        danger
                                        icon={FaTrash}
                                        onClick={deleteResponse(
                                          dispatch,
                                          formData,
                                          index,
                                          branch,
                                          choiceIndex,
                                          choice,
                                          responseIndex
                                        )}
                                      />
                                    </div>
                                  );
                                }
                              )}
                              <Clickable
                                className="w-fit-content mr-auto"
                                primary
                                icon={BsFillPlusCircleFill}
                                text="Add Response"
                                onClick={addResponseToChoice(
                                  dispatch,
                                  formData,
                                  index,
                                  branch,
                                  choiceIndex,
                                  choice
                                )}
                              />
                            </div>
                            <Clickable
                              className="ml-auto"
                              title="Delete Choice"
                              danger
                              icon={FaTrash}
                              onClick={deleteChoice(
                                dispatch,
                                formData,
                                index,
                                branch,
                                choiceIndex
                              )}
                            />
                          </div>
                        );
                      })}
                      <Clickable
                        primary
                        icon={BsFillPlusCircleFill}
                        text="Add Choice"
                        onClick={addChoiceToBranch(
                          dispatch,
                          formData,
                          index,
                          branch
                        )}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <Clickable
            primary
            className="mr-auto"
            icon={BsFillPlusCircleFill}
            text="Add Branch"
            onClick={() => {
              dispatch({
                branches: [
                  ...formData.branches,
                  {
                    key: uuidv4(),
                    id:
                      incorrectChoisesValues.length > 0
                        ? incorrectChoisesValues[0]
                        : uuidv4(),
                    choices: [],
                  },
                ],
              });
            }}
          />
          <Clickable
            className="ml-auto"
            text="Show Raw Data"
            onClick={() => {
              setShowRawData(!showRawData);
            }}
          />
          {showRawData && (
            <div className="border-2 border-black p-2 border-4 border-teal-300 m-1 rounded">
              <pre>{JSON.stringify(getPreparedData(formData), null, 2)}</pre>
              <p>Set arbitrary raw data</p>

              <textarea
                name=""
                id=""
                cols={30}
                rows={10}
                value={arbitraryRawData}
                onChange={(e) => {
                  setArbitraryRawData(e.target.value);
                }}
              ></textarea>
              {/* apply arbitrary raw data */}
              <Clickable
                primary
                text="Apply"
                onClick={() => {
                  dispatch(JSON.parse(arbitraryRawData));
                }}
              />
            </div>
          )}
        </div>
        {testScenario && <TestScenario scenario={formData as any} />}
      </div>
    </Layout>
  );
};

export default CreateScenarioPage;
