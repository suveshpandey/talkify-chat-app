import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore"
import {ThreeDot} from "react-loading-indicators"
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
    const {messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unSubscribeFromMessages} = useChatStore();
    const {authUser} = useAuthStore();
    const messageEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (selectedUser?._id) getMessages(selectedUser._id);
        subscribeToMessages();

        return () => unSubscribeFromMessages();

    }, [selectedUser?._id, getMessages, subscribeToMessages, unSubscribeFromMessages]);
    
    useEffect(() => {
        if(messageEndRef.current && messages) messageEndRef.current.scrollIntoView({behavior: "smooth"})
    }, [messages])

    if(isMessagesLoading) return <div className="h-full w-full flex flex-col justify-center items-center gap-y-3">
        <ThreeDot color="#94aeba" size="large" text="" textColor="" />
    </div>
    
    
    return (
        <div className="h-[calc(100vh-4rem)] w-full flex flex-col justify-between ">
            <ChatHeader />

            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {messages.length > 0 ? (
                    messages.map((message) => {
                        return (
                            <div 
                                key={message._id && message._id.toString()} 
                                className={`chat ${message.senderId === authUser?._id ? `chat-end` : `chat-start`}`}
                                ref={messageEndRef}
                            >
                                <div className="chat-image avatar">
                                    <div className="size-10 rounded-full">
                                        <img 
                                            src={message.senderId === authUser?._id 
                                                ? authUser.profilePic || `/avatar.png` 
                                                : selectedUser?.profilePic || `/avatar.png`} 
                                            alt="profile pic" 
                                        />
                                    </div>
                                </div>
                                <div className="chat-header mb-1">
                                    <time className="text-xs opacity-50 ml-1">{formatMessageTime(message.createdAt)}</time>
                                </div>
                                <div className="chat-bubble flex flex-col">
                                    {message.image && (
                                        <img 
                                            src={message.image}
                                            alt="Attachment"
                                            className="sm:max-w-[200px] rounded-md mb-2 "
                                        />
                                    )}
                                    {message.text && <p>{message.text}</p>}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center text-gray-500 mt-4">No messages found</div>
                )}
            </div>

            <ChatInput />
        </div>
    )
}

export default ChatContainer
