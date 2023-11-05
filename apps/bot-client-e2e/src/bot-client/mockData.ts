import {
  EMessageType,
  EScenarioElementType,
  ETaskType,
} from "@core/types/client";

const date = new Date();

export const sampleDb = [
  {
    id: "1",
    request: ["hi", "hello"],
    responses: [
      {
        type: EMessageType.TEXT,
        text: "hi",
        id: "1",
        createdAt: date,
        updatedAt: date,
        coefficient: "",
        db_name: "base",
        answer: null,
      },
    ],
    createdAt: date,
    updatedAt: date,
    base_probability: "1",
    db_name: "base",
    branch: {
      id: "1",
      description: "",
      scenario: null,
      choices: null,
    },
  },
  // some dumb data with other request text and responses text
  {
    id: "2",
    request: ["how are you", "how are you doing"],
    responses: [
      {
        type: EMessageType.TEXT,
        text: "fine",
        id: "2",
        createdAt: date,
        updatedAt: date,
        coefficient: "",
        db_name: "base",
        answer: null,
      },
    ],
    createdAt: date,
    updatedAt: date,
    base_probability: "1",
    db_name: "base",
    branch: {
      id: "2",
      description: "",
      scenario: null,
      choices: null,
    },
  },
  {
    id: "3",
    request: ["what is your name", "what is your name?"],
    responses: [
      {
        type: EMessageType.TEXT,
        text: "bot",
        id: "3",
        createdAt: date,
        updatedAt: date,
        coefficient: "",
        db_name: "base",
        answer: null,
      },
    ],
    createdAt: date,
    updatedAt: date,
    base_probability: "1",
    db_name: "base",
    branch: {
      id: "3",
      description: "",
      scenario: null,
      choices: null,
    },
  },
  {
    id: "4",
    request: ["what is your name", "what is your name?"],
    responses: [
      {
        type: EMessageType.TEXT,
        text: "bot",
        id: "4",
        createdAt: date,
        updatedAt: date,
        coefficient: "",
        db_name: "base",
        answer: null,
      },
    ],
    createdAt: date,
    updatedAt: date,
    base_probability: "1",
    db_name: "base",
    branch: {
      id: "4",
      description: "",
      scenario: null,
      choices: null,
    },
  },
];
export const sampleSpamDb = [
  {
    id: "1",
    type: EMessageType.TEXT,
    text: "spam",
    createdAt: date,
    updatedAt: date,
    coefficient: "",
    db_name: "spam",

    answer: {
      id: "1",
      description: "",
      request: ["hi", "hello"],
      responses: [
        {
          id: "1",
          type: EMessageType.TEXT,
          text: "hi",
          createdAt: date,
          updatedAt: date,
          coefficient: "",
          db_name: "base",
          answer: null,
        },
      ],
      createdAt: date,
      updatedAt: date,
      isDmAnswer: false,
      isGroupAnswer: false,
      isChannelAnswer: false,
      base_probability: "1",
      db_name: "spam",
      nextBranchId: "",
      branch: {
        id: "1",
        description: "",
        scenario: null,
        choices: null,
      },
    },
  },
  {
    id: "2",
    type: EMessageType.TEXT,
    text: "spam",
    createdAt: date,
    updatedAt: date,
    coefficient: "",
    db_name: "spam",

    answer: {
      id: "2",
      description: "",
      request: ["how are you", "how are you doing"],
      responses: [
        {
          id: "2",
          type: EMessageType.TEXT,
          text: "fine",
          createdAt: date,
          updatedAt: date,
          coefficient: "",
          db_name: "base",
          answer: null,
        },
      ],
      createdAt: date,
      updatedAt: date,
      isDmAnswer: false,
      isGroupAnswer: false,
      isChannelAnswer: false,
      base_probability: "1",
      db_name: "spam",
      nextBranchId: "",
      branch: {
        id: "2",
        description: "",
        scenario: null,
        choices: null,
      },
    },
  },
  {
    id: "3",
    type: EMessageType.TEXT,
    text: "spam",
    createdAt: date,
    updatedAt: date,
    coefficient: "",
    db_name: "spam",

    answer: {
      id: "3",
      description: "",
      request: ["what is your name", "what is your name?"],
      responses: [
        {
          id: "3",
          type: EMessageType.TEXT,
          text: "monika",
          createdAt: date,
          updatedAt: date,
          coefficient: "",
          db_name: "base",
          answer: null,
        },
      ],
      createdAt: date,
      updatedAt: date,
      isDmAnswer: false,
      isGroupAnswer: false,
      isChannelAnswer: false,
      base_probability: "1",
      db_name: "spam",
      nextBranchId: "",
      branch: {
        id: "3",
        description: "",
        scenario: null,
        choices: null,
      },
    },
  },
];

export const temporaryTaskOrder = [
  ETaskType.RESPOND_TO_DM_MESSAGE,
  ETaskType.SPAM_TO_GROUP,
  ETaskType.GROUP_JOIN,
  ETaskType.GROUP_LEAVE,
  ETaskType.RESPOND_TO_GROUP_MESSAGE,
];

export const temporaryScenario = [
  {
    type: EScenarioElementType.VOICE,
    fileName: "step1.ogg",
  },
  {
    type: EScenarioElementType.VOICE,
    fileName: "step2.ogg",
  },
  {
    type: EScenarioElementType.VOICE,
    fileName: "step3.ogg",
  },
  {
    type: EScenarioElementType.VOICE,
    fileName: "step4.ogg",
  },
  {
    type: EScenarioElementType.TEXT,
    text: "смотри, мой ник там ##botName##\r\nhttps://meetka1.name/?r=1515&sk=586\r\nможешь при регистрации пропускать все поля, это не важно)",
  },
  {
    type: EScenarioElementType.TEXT,
    text: "прости, не могу говорить, я уже в эфире",
  },
  {
    type: EScenarioElementType.TEXT,
    text: "если не сложно добавь меня в какой-то чатик для общения а то тут стало скучно😘",
  },
];

export const temporaryReplacements = {
  botName: "monika",
};

// export const mockData = {
//   sampleDb,
//   sampleSpamDb,
//   temporaryTaskOrder,
//   temporaryScenario,
//   temporaryReplacements,
// };
