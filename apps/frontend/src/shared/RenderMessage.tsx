import { MessageEntity } from "@core/types/server";

export const RenderMessage = ({
  message,
  sender,
}: {
  message: MessageEntity;
  sender: "bot" | "user";
}) => {
  if (!message || !sender) return null;
  if (message.type === "TEXT") {
    return (
      <span
        className={
          sender === "bot"
            ? "text-blue-500 w-fit"
            : "ml-auto w-fit text-green-500"
        }
      >
        {message.text}
      </span>
    );
  }
};
