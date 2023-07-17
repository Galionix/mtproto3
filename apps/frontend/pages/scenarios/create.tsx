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
import { BsFillPlusCircleFill } from "react-icons/bs";
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

type TResponse = CreateMessageInput & {
  key: string;
};

type TChoice = {
  key: string;
  responses: TResponse[];
} & Omit<CreateAnswerEntityInput, "responses">;
type TBranch = Omit<CreateScenarioBranchInput, "choices"> & {
  key?: string;
  choices: TChoice[];
};

type TFormData = {
  description: string;
  branches: TBranch[];
  maxConversationLength: string;
  db_name: string;
};
const initialState: TFormData = {
  description: "",
  branches: [],
  maxConversationLength: "100",
  db_name: "",
};

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

  const [showRawData, setShowRawData] = useState(false);

  const [createScenario, { data, loading, error }] = useMutation(
    createScenarioMutation
  );

  const [formData, dispatch] = useReducer(
    (state: TFormData, newState: Partial<TFormData>) => {
      const result = { ...state, ...newState };

      setUnsavedChanges(!isEqual(result, initialState));

      return result;
    },
    initialState
  );

  const branchIds = formData.branches.map((branch) => branch.id);

  const warningText =
    "You have unsaved changes - are you sure you wish to leave this page?";

  useEffect(() => {
    const handleWindowClose = (e) => {
      if (!unsavedChanges) return;
      e.preventDefault();
      return (e.returnValue = warningText);
    };
    const handleBrowseAway = () => {
      if (!unsavedChanges) return;
      if (window.confirm(warningText)) return;
      router.events.emit("routeChangeError");
      throw "routeChange aborted.";
    };
    window.addEventListener("beforeunload", handleWindowClose);
    router.events.on("routeChangeStart", handleBrowseAway);
    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
      router.events.off("routeChangeStart", handleBrowseAway);
    };
  }, [router.events, unsavedChanges]);

  return (
    <Layout>
      <div className="flex flex-row gap-2">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between flex-row items-center">
            <h1>Create Scenario Page</h1>
            {/* test */}
            <Clickable
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
                  dispatch(initialState);
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
              const choicesHidden = hiddenBranches.includes(branch.key);
              return (
                <div
                  className="border-2 border-black p-2 border-4 border-indigo-500 m-1 rounded"
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
                            className="border-2 border-black p-2 border-4 border-sky-300 m-1 rounded"
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
                              onChange={updateNextBranchId(
                                dispatch,

                                formData,
                                index,
                                branch,
                                choiceIndex,
                                choice
                              )}
                              choices={branchIds}
                            />
                            {/* requests */}
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
                            {/* responses */}
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
                                      className="border-2 border-black p-2 border-4 border-teal-300 m-1 rounded"
                                      key={responseIndex}
                                    >
                                      <Clickable
                                        className="mt-3 ml-auto"
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
                                      {/*
                                  description,
                                  caption,
                                  dbName
                                  coefficient
                                  */}
                                      <TextInputWithChoicesList
                                        choices={AScenarioElementType}
                                        required
                                        label="Response Type"
                                        value={EScenarioElementType.TEXT}
                                        defaultValue={"TEXT"}
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
                                          <TextInput
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
                                      <Clickable
                                        className={`ml-auto`}
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
                  { key: uuidv4(), id: uuidv4(), choices: [] },
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
            </div>
          )}
        </div>
        {testScenario && <TestScenario scenario={formData as any} />}
      </div>
    </Layout>
  );
};

export default CreateScenarioPage;

function updateResponseDescription(
  dispatch: Dispatch<Partial<TFormData>>,
  formData: { description: string; branches: TBranch[] },
  index: number,
  choiceIndex: number,
  responseIndex: number
): (value: string) => void {
  return (value) => {
    dispatch({
      branches: formData.branches.map((b, i) => {
        if (i !== index) return b;
        return {
          ...b,
          choices: b.choices.map((c, ci) => {
            if (ci !== choiceIndex) return c;
            return {
              ...c,
              responses: c.responses.map((r, ri) => {
                if (ri !== responseIndex) return r;
                return {
                  ...r,
                  description: value,
                };
              }),
            };
          }),
        };
      }),
    });
  };
}

function updateResponseCaption(
  dispatch: Dispatch<Partial<TFormData>>,
  formData: { description: string; branches: TBranch[] },
  index: number,
  choiceIndex: number,
  responseIndex: number
): (value: string) => void {
  return (value) => {
    dispatch({
      branches: formData.branches.map((b, i) => {
        if (i !== index) return b;
        return {
          ...b,
          choices: b.choices.map((c, ci) => {
            if (ci !== choiceIndex) return c;
            return {
              ...c,
              responses: c.responses.map((r, ri) => {
                if (ri !== responseIndex) return r;
                return {
                  ...r,
                  caption: value,
                };
              }),
            };
          }),
        };
      }),
    });
  };
}

function updateResponseCoefficient(
  dispatch: Dispatch<Partial<TFormData>>,
  formData: { description: string; branches: TBranch[] },
  index: number,
  choiceIndex: number,
  responseIndex: number
): (value: string) => void {
  return (value) => {
    dispatch({
      branches: formData.branches.map((b, i) => {
        if (i !== index) return b;
        return {
          ...b,
          choices: b.choices.map((c, ci) => {
            if (ci !== choiceIndex) return c;
            return {
              ...c,
              responses: c.responses.map((r, ri) => {
                if (ri !== responseIndex) return r;
                return {
                  ...r,
                  coefficient: value,
                };
              }),
            };
          }),
        };
      }),
    });
  };
}

function updateResponseDbName(
  dispatch: Dispatch<Partial<TFormData>>,
  formData: { description: string; branches: TBranch[] },
  index: number,
  choiceIndex: number,
  responseIndex: number
): (value: string) => void {
  return (value) => {
    dispatch({
      branches: formData.branches.map((b, i) => {
        if (i !== index) return b;
        return {
          ...b,
          choices: b.choices.map((c, ci) => {
            if (ci !== choiceIndex) return c;
            return {
              ...c,
              responses: c.responses.map((r, ri) => {
                if (ri !== responseIndex) return r;
                return {
                  ...r,
                  db_name: value,
                };
              }),
            };
          }),
        };
      }),
    });
  };
}

function updateRequest(
  dispatch: Dispatch<Partial<TFormData>>,
  formData: { description: string; branches: TBranch[] },
  index: number,
  branch: TBranch,
  choiceIndex: number,
  choice: TChoice
): (value: string) => void {
  return (value) => {
    dispatch({
      branches: [
        ...formData.branches.slice(0, index),
        {
          ...branch,
          choices: [
            ...branch.choices.slice(0, choiceIndex),
            {
              ...choice,
              request: value.split(","),
            },
            ...branch.choices.slice(choiceIndex + 1),
          ],
        },
        ...formData.branches.slice(index + 1),
      ],
    });
  };
}

function updateResponseType(
  dispatch: Dispatch<Partial<TFormData>>,
  formData: { description: string; branches: TBranch[] },
  index: number,
  branch: TBranch,
  choiceIndex: number,
  choice: TChoice,
  responseIndex: number,
  response: TResponse
): (value: string) => void {
  return (value) => {
    dispatch({
      branches: [
        ...formData.branches.slice(0, index),
        {
          ...branch,
          choices: [
            ...branch.choices.slice(0, choiceIndex),
            {
              ...choice,
              responses: [
                ...choice.responses.slice(0, responseIndex),
                {
                  ...response,
                  type: value,
                },
                ...choice.responses.slice(responseIndex + 1),
              ],
            },
            ...branch.choices.slice(choiceIndex + 1),
          ],
        },
        ...formData.branches.slice(index + 1),
      ],
    });
  };
}

function updateResponseText(
  dispatch: Dispatch<Partial<TFormData>>,
  formData: { description: string; branches: TBranch[] },
  index: number,
  branch: TBranch,
  choiceIndex: number,
  choice: TChoice,
  responseIndex: number,
  response: TResponse
): (value: string) => void {
  return (value) => {
    dispatch({
      branches: [
        ...formData.branches.slice(0, index),
        {
          ...branch,
          choices: [
            ...branch.choices.slice(0, choiceIndex),
            {
              ...choice,
              responses: [
                ...choice.responses.slice(0, responseIndex),
                {
                  ...response,
                  text: value,
                },
                ...choice.responses.slice(responseIndex + 1),
              ],
            },
            ...branch.choices.slice(choiceIndex + 1),
          ],
        },
        ...formData.branches.slice(index + 1),
      ],
    });
  };
}

function deleteResponse(
  dispatch: Dispatch<Partial<TFormData>>,
  formData: { description: string; branches: TBranch[] },
  index: number,
  branch: TBranch,
  choiceIndex: number,
  choice: TChoice,
  responseIndex: number
): () => void {
  return () => {
    dispatch({
      branches: [
        ...formData.branches.slice(0, index),
        {
          ...branch,
          choices: [
            ...branch.choices.slice(0, choiceIndex),
            {
              ...choice,
              responses: [
                ...choice.responses.slice(0, responseIndex),
                ...choice.responses.slice(responseIndex + 1),
              ],
            },
            ...branch.choices.slice(choiceIndex + 1),
          ],
        },
        ...formData.branches.slice(index + 1),
      ],
    });
  };
}

function addResponseToChoice(
  dispatch: Dispatch<Partial<TFormData>>,
  formData: { description: string; branches: TBranch[] },
  index: number,
  branch: TBranch,
  choiceIndex: number,
  choice: TChoice
): () => void {
  return () => {
    dispatch({
      branches: [
        ...formData.branches.slice(0, index),
        {
          ...branch,
          choices: [
            ...branch.choices.slice(0, choiceIndex),
            {
              ...choice,
              responses: [
                ...choice.responses,
                {
                  type: "",
                  text: "",
                  key: uuidv4(),
                },
              ],
            },
            ...branch.choices.slice(choiceIndex + 1),
          ],
        },
        ...formData.branches.slice(index + 1),
      ],
    });
  };
}

function updateBranchDescription(
  dispatch: Dispatch<Partial<TFormData>>,
  formData: { description: string; branches: TBranch[] },
  index: number,
  branch: TBranch
): (value: string) => void {
  return (value) => {
    dispatch({
      branches: [
        ...formData.branches.slice(0, index),
        { ...branch, description: value },
        ...formData.branches.slice(index + 1),
      ],
    });
  };
}

function updateBranchId(
  dispatch: Dispatch<Partial<TFormData>>,
  formData: { description: string; branches: TBranch[] },
  index: number,
  branch: TBranch
): (value: string) => void {
  return (value) => {
    dispatch({
      branches: [
        ...formData.branches.slice(0, index),
        { ...branch, id: value, description: value },
        ...formData.branches.slice(index + 1),
      ],
    });
  };
}

function deleteBranch(
  dispatch: Dispatch<Partial<TFormData>>,
  formData: { description: string; branches: TBranch[] },
  index: number
): () => void {
  return () => {
    dispatch({
      branches: [
        ...formData.branches.slice(0, index),
        ...formData.branches.slice(index + 1),
      ],
    });
  };
}

function addChoiceToBranch(
  dispatch: Dispatch<Partial<TFormData>>,
  formData: { description: string; branches: TBranch[] },
  index: number,
  branch: TBranch
): () => void {
  return () => {
    dispatch({
      branches: [
        ...formData.branches.slice(0, index),
        {
          ...branch,
          choices: [
            ...branch.choices,
            {
              key: uuidv4(),
              request: [],
              responses: [],
              nextBranchId: "",
            },
          ],
        },
        ...formData.branches.slice(index + 1),
      ],
    });
  };
}

function updateNextBranchId(
  dispatch: Dispatch<Partial<TFormData>>,
  formData: { description: string; branches: TBranch[] },
  index: number,
  branch: TBranch,
  choiceIndex: number,
  choice: TChoice
): (value: string) => void {
  return (value) => {
    dispatch({
      branches: [
        ...formData.branches.slice(0, index),
        {
          ...branch,
          choices: [
            ...branch.choices.slice(0, choiceIndex),
            { ...choice, nextBranchId: value },
            ...branch.choices.slice(choiceIndex + 1),
          ],
        },
        ...formData.branches.slice(index + 1),
      ],
    });
  };
}

function deleteChoice(
  dispatch: Dispatch<Partial<TFormData>>,
  formData: { description: string; branches: TBranch[] },
  index: number,
  branch: TBranch,
  choiceIndex: number
): () => void {
  return () => {
    dispatch({
      branches: [
        ...formData.branches.slice(0, index),
        {
          ...branch,
          choices: [
            ...branch.choices.slice(0, choiceIndex),
            ...branch.choices.slice(choiceIndex + 1),
          ],
        },
        ...formData.branches.slice(index + 1),
      ],
    });
  };
}

function getPreparedData(formData: TFormData): CreateScenarioInput {
  return {
    ...formData,
    maxConversationLength: parseInt(formData.maxConversationLength) || 0,
    branches: formData.branches.map(({ key, ...branch }) => ({
      ...branch,
      choices: branch.choices.map(({ key, ...choice }) => ({
        ...choice,
        responses: choice.responses.map(({ key, ...response }) => ({
          ...response,
        })),
      })),
    })),
  };
}
