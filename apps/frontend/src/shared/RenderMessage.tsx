import { MessageEntity } from "@core/types/server";
import { Clickable } from "./Clickable/Clickable";

export const RenderMessage = ({
  message,
  choiceKey,
  sender,
  branchId,
}: {
  message: MessageEntity;
  choiceKey: string;
  sender: "bot" | "user";
  branchId?: string;
}) => {
  const scrollToChoice = () => {
    const choice1 = document.getElementById("choice_" + choiceKey);
    const choice = document.getElementById("shown_choice_" + choiceKey);
    // console.log("choice: ", choice);
    // if (!choice) return;
    choice?.scrollIntoView();
    choice1?.scrollIntoView();
  };
  if (!message || !sender) return null;
  if (message.type === "TEXT") {
    if (sender === "bot") {
      return (
        <Clickable onClick={scrollToChoice} className={"text-blue-500 w-fit"}>
          {message.text}
        </Clickable>
      );
    }
    return (
      <span className={"ml-auto w-fit text-green-500"}>{message.text}</span>
    );
  }
};
