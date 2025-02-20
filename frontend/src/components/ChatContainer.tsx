import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore"
import {ThreeDot} from "react-loading-indicators"
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";

const ChatContainer = () => {
    const {messages, getMessages, isMessagesLoading, selectedUser} = useChatStore();
    
    useEffect(() => {
        //@ts-ignore
        getMessages(selectedUser?._id);
    },[selectedUser?._id, getMessages])

    if(isMessagesLoading) return <div className="flex flex-col justify-center items-center gap-y-3">
        <ThreeDot color="#94aeba" size="large" text="" textColor="" />
        <p>Loading Chats . . .</p>
    </div>
    
    
    
    return (
        <div className="flex-1 h-[100%] flex-col overflow-auto">
            <ChatHeader />
            <p>messages...</p>
            <ChatInput />
        </div>
    )
}

export default ChatContainer
