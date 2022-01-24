export default function chatMessagesReducer(chatMessages = null, action) {
    if (action.type === "chat-messages") {
        action.payload.chatMessages;
    }
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
