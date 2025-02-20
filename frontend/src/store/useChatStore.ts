import { create } from "zustand";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { axiosInstance } from "../lib/axios";
import { Types } from "mongoose";
import { User } from "../lib/types";

interface ChatStoreState {
    messages: any[];
    users: User[]
    selectedUser: User | null;
    isUsersLoading: boolean;
    isMessagesLoading: boolean;
    isSidebarOpen: boolean,
    getUsers: () => Promise<void>;
    getMessages: (userId: Types.ObjectId | string) => Promise<void>;
    sendMessage: (messageData: any) => Promise<void>;
    setSelectedUser: (selectedUser: User | null) => void;
    toggleSidebar: () => void
}

export const useChatStore = create<ChatStoreState>((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: true,
    isMessagesLoading: false,
    isSidebarOpen: false,

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
        try{
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages: res.data});
        }
        catch(error){
            const err = error as AxiosError<{ message: string }>;
            toast.error(err.response?.data?.message || "Failed to fetch messages");
            console.log("Couldn't fetch messages");
        }
        finally{
            set({isMessagesLoading: false});
        }
    },
    sendMessage: async (messageData: any) => {
        const {selectedUser, messages} = get();
        try{
            const res = await axiosInstance.post(`/messages/send/${selectedUser?._id}`, messageData)
            set({messages: [...messages, res.data]});
        }
        catch(error){
            const err = error as AxiosError<{ message: string }>;
            // toast.error("Failed to fetch messages");
            console.log("Couldn't fetch messages", err);
        }
    },

    //todo: optimize this later
    setSelectedUser: (selectedUser: User| null) => set({selectedUser}),
    toggleSidebar: () => set((state) => ({isSidebarOpen: !state.isSidebarOpen}))

}))