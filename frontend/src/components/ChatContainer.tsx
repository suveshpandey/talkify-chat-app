import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore"
import {ThreeDot} from "react-loading-indicators"
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

import { RxCross2 } from "react-icons/rx";


const ChatContainer = () => {
    const {messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unSubscribeFromMessages} = useChatStore();
    const {authUser} = useAuthStore();
    const messageEndRef = useRef<HTMLDivElement | null>(null);
    const [zoomImage, setZoomImage] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleZoomImage = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        setZoomImage(true);
    }
    const handleCloseZoom = () => {
        setSelectedImage(null);
        setZoomImage(false);
    }

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
            {selectedImage && zoomImage && <div 
                    className="fixed top-0 inset-0 bg-black/70 dark:bg-black/80 z-50 flex justify-center items-center p-4 cursor-pointer"
                    onClick={handleCloseZoom}
                >
                    <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={selectedImage}
                            alt="Zoomed content"
                            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-xl"
                        />
                        <button
                            onClick={handleCloseZoom}
                            className="absolute -top-3 -right-3 bg-red-400 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                            <RxCross2 />
                        </button>
                    </div>
                </div>
            }
            <>
                <ChatHeader />
                {/* Messages container with custom scrollbar */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto styled-scrollbar bg-slate-200 dark:bg-slate-800/95 transition-all duration-200">
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
                                            ? 'dark:bg-[#364156] bg-[#bdc7d1] dark:text-white text-slate-800 '
                                            : 'dark:bg-gray-700 bg-slate-300 dark:text-white text-slate-800'
                                    }`}>
                                        {message.image && (
                                            <img
                                                onClick={() => handleZoomImage(message.image)}
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
            </>
            
        </div>
    );
}

export default ChatContainer
