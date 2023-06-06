import { EMessageType, MessageTypeValues } from "@core/types/client";
import { CreateSpamMessageInput } from "@core/types/server";

const validateMessageInput = (input: CreateSpamMessageInput, keyName: string) => {
    if(!(keyName in input)) {
        throw new Error(`Invalid message input: ${JSON.stringify(input)}, must have a ${keyName} property`);
    }
    if(input[keyName].length === 0) {
        throw new Error(`Invalid message input: ${JSON.stringify(input)}, ${keyName} property must not be empty`);
    }
}




export const validateMessageInputByType = (input: CreateSpamMessageInput) => {
    const { type } = input;
    if(!MessageTypeValues.includes(type as EMessageType)) {
        throw new Error(`Invalid message type: ${type}, must be one of ${MessageTypeValues.join(", ")}`);
    }
    switch(type) {
        case EMessageType.TEXT: 
            validateMessageInput(input, "text");
            break;
        case EMessageType.PHOTO:
            validateMessageInput(input, "photo");
            break;
        case EMessageType.VIDEO:
            validateMessageInput(input, "video");
            break;
        case EMessageType.AUDIO:
            validateMessageInput(input, "audio");
            break;
        case EMessageType.STICKER:
            validateMessageInput(input, "sticker");
            break;
        case EMessageType.REACTION:
            validateMessageInput(input, "reaction");
            break;
    }
};
