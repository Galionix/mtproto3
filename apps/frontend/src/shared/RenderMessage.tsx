import { MessageEntity } from "@core/types/server";
import { Clickable } from "./Clickable/Clickable";

export const RenderMessage = ({
  message,
  choiceKey,
  sender,
}: {
  message: MessageEntity;
  choiceKey: string;
  sender: "bot" | "user";
}) => {
  const scrollToChoice = () => {
    const choice = document.getElementById("choice_" + choiceKey);
    console.log('"choice_" + choiceKey: ', "choice_" + choiceKey);
    if (!choice) return;
    choice.scrollIntoView({ behavior: "smooth" });
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
