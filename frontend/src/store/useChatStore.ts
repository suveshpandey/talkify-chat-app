import { create } from "zustand";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { axiosInstance } from "../lib/axios";
import { Types } from "mongoose";
import { User, Message } from "../lib/types";
import { useAuthStore } from "./useAuthStore";

interface ChatStoreState {
    messages: Message[];
    users: User[]
    selectedUser: User | null;
    isUsersLoading: boolean;
    isMessagesLoading: boolean;
    isSidebarOpen: boolean,
    getUsers: () => Promise<void>;
    getMessages: (userId: Types.ObjectId) => Promise<void>;
    sendMessage: (messageData: any) => Promise<void>;
    subscribeToMessages: () => void;
    unSubscribeFromMessages: () => void;
    setSelectedUser: (selectedUser: User | null) => void;
    toggleSidebar: () => void,
}

export const useChatStore = create<ChatStoreState>((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: true,
    isMessagesLoading: false,
    isSidebarOpen: true,

    getUsers: async () => {
        set({isUsersLoading: true});
        try{
            const res = await axiosInstance.get("/messages/users");
            set({users: res.data.filteredUsers });
        }
        catch(error){
            const err = error as AxiosError<{ message: string }>;
            toast.error(err.response?.data?.message || "Failed to fetch users");
            console.log("Couldn't fetch users", error);
        }
        finally{
            set({isUsersLoading: false});
        }
    },

    getMessages: async (userId: Types.ObjectId | string) => {
        set({isMessagesLoading: true});
        console.log("Fetching messages for user:", userId);  // <-- Debug log
        try{
            const res = await axiosInstance.get(`/messages/${userId}`);
            console.log("API Response Messages:", res.data.messages);  // <-- Debug log
            set({messages: res.data.messages});
        }
        catch(error){
            const err = error as AxiosError<{ message: string }>;
            toast.error(err.response?.data?.message || "Failed to fetch messages");
            console.log("Couldn't fetch messages", error);
        }
        finally{
            set({isMessagesLoading: false});
        }
    },    

    sendMessage: async (messageData: any) => {
        const {selectedUser, messages} = get();
        try{
            const res = await axiosInstance.post(`/messages/send/${selectedUser?._id}`, messageData)
            console.log("sent")
            set({messages: [...messages, res.data.message]});
        }
        catch(error){
            const err = error as AxiosError<{ message: string }>;
            console.log("Couldn't fetch messages", err);
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket?.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
            if(!isMessageSentFromSelectedUser) return;

            set({
                messages: [...get().messages, newMessage],
            });
        });
    },

    unSubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket?.off("newMessage");

    },

    //todo: optimize this later
    setSelectedUser: (selectedUser: User| null) => set({selectedUser}),
    toggleSidebar: () => set((state) => ({isSidebarOpen: !state.isSidebarOpen}))

}))