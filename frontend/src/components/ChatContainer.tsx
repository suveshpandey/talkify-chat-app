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
        <div className="h-[calc(100vh-4rem)] w-full flex flex-col justify-between bg-slate-200 dark:bg-slate-800 transition-colors duration-300">
            <ChatHeader />
            
            {/* Messages container with custom scrollbar */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto styled-scrollbar bg-slate-200 dark:bg-slate-800/95">
                {messages.length > 0 ? (
                    messages.map((message) => {
                        const isUserMessage = message.senderId === authUser?._id;
                        return (
                            <div
                                key={message._id?.toString()}
                                className={`chat ${isUserMessage ? 'chat-end' : 'chat-start'}`}
                                ref={messageEndRef}
                            >
                                {/* Avatar */}
                                <div className="chat-image avatar">
                                    <div className="size-10 rounded-full cursor-pointer border-2 border-slate-100 dark:border-slate-700">
                                        <img
                                            className="cursor-pointer"
                                            src={
                                                isUserMessage
                                                    ? authUser.profilePic || "/avatar.png"
                                                    : selectedUser?.profilePic || "/avatar.png"
                                            }
                                            alt="profile pic"
                                        />
                                    </div>
                                </div>

                                {/* Timestamp */}
                                <div className="chat-header mb-1">
                                    <time className="text-xs opacity-70 ml-1 text-slate-600 dark:text-slate-400">
                                        {formatMessageTime(message.createdAt)}
                                    </time>
                                </div>

                                {/* Message bubble (original styling preserved) */}
                                <div className={`chat-bubble flex flex-col ${
                                    isUserMessage
                                        ? 'dark:bg-[#364156] bg-[#adb5bd] dark:text-white text-slate-800 '
                                        : 'dark:bg-gray-700 bg-slate-300 dark:text-white text-slate-800'
                                }`}>
                                    {message.image && (
                                        <img
                                            src={message.image}
                                            alt="Attachment"
                                            className="sm:max-w-[200px] rounded-lg mb-2 cursor-pointer"
                                        />
                                    )}
                                    {message.text && <p>{message.text}</p>}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center text-slate-500 dark:text-slate-400 mt-4">
                        No messages found
                    </div>
                )}
            </div>

            <ChatInput />
        </div>
    );
}

export default ChatContainer

