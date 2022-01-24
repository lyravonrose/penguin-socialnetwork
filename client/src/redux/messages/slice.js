export default function chatMessagesReducer(chatMessages = null, action) {
    if (action.type === "chat-messages") {
        return action.payload.chatMessages;
    }
    if (action.type === "chat-message") {
        return [action.payload.chatMessage, ...chatMessages];
    }
    return chatMessages;
}

export function chatMessagesReceived(chatMessages) {
    return {
        type: "chat-messages",
        payload: { chatMessages },
    };
}

export function chatMessageReceived(chatMessage) {
    return {
        type: "chat-message",
        payload: { chatMessage },
    };
}
