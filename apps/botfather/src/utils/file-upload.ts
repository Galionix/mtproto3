import { TResponsesData } from "@core/types/client";
import { AnswerEntity, CreateAnswerEntityInput } from "@core/types/server";

const isKeyPresent = (key: string, keys: string[]): boolean => {
  return keys.includes(key);
};

const isResponseValid = (response: TResponsesData): boolean => {
  const keys = Object.keys(response);
  const requiredKeys = ["a", "p"];

  const isKeyPresent = (key: string): boolean => {
    return keys.includes(key);
  };

  const isAllKeysPresent = requiredKeys.every(isKeyPresent);

  if (!isAllKeysPresent) {
    return false;
  }

  return true;
};

export const validateAnswers = (
  answers: AnswerEntity[]
): {
  isValid: boolean;
  error: string;
} => {
  const isAnswerValid = (
    answer: CreateAnswerEntityInput
  ): {
    isValid: boolean;
    error: string;
  } => {
    //   validate that all keys from CreateAnswerEntityInput are present
    let error = null;
    const keys = Object.keys(answer);
    const requiredKeys = Object.keys(CreateAnswerEntityInput);

    const isAllKeysPresent = requiredKeys.every((key) =>
      isKeyPresent(key, keys)
    );

    if (!isAllKeysPresent) {
      error = "Not all keys are present in the answer: " + answer.request;
      return {
        isValid: false,
        error,
      };
    }

    //   validate responses

    const responses = JSON.parse(answer.response.replace(/'/g, '"'));

    const isResponsesValid = responses.every(isResponseValid);

    if (!isResponsesValid) {
      error = "Invalid responses in the answer: " + answer.request;
    }

    return {
      isValid: isResponsesValid,
      error,
    };
  };

  const isAnswersValid = answers.every((a) => isAnswerValid(a).isValid);

  if (!isAnswersValid) {
    const invalidAnswers = answers.filter((a) => !isAnswerValid(a).isValid);
    const invalidAnswersRequests = invalidAnswers.map((a) => a.request);
    const error = "Invalid answers: " + invalidAnswersRequests.join(", ");
    return {
      isValid: false,
      error,
    };
  }

  return {
    isValid: isAnswersValid,
    error: null,
  };
};
