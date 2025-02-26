import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore"

import { RxCross2 } from "react-icons/rx";

const ChatHeader = () => {
    const {selectedUser, setSelectedUser} = useChatStore();
    const {onlineUsers} = useAuthStore();


    return (
        <div className="h-16 w-full dark:bg-slate-600 bg-slate-300 px-5 flex justify-between items-center ">
            <div className="flex gap-3">
                <img src={selectedUser?.profilePic || "./avatar.png"} alt="" className="size-12 rounded-full cursor-pointer " />
                <div>
                    <p className="text-lg font-bold dark:text-slate-200 text-slate-600">{selectedUser?.username}</p>
                    <p className="" >{onlineUsers.includes(selectedUser?._id?.toString() || "") ? <span className="text-green-500">online</span> : <span className="text-gray-400">offline</span>}</p>
                </div>
            </div>
            <RxCross2 
                className="dark:text-red-200 text-gray-400 font-bold size-10 cursor-pointer hover:ring-1 dark:ring-orange-300 hover:ring-gray-400 rounded-full p-1 transition-all duration-300" 
                onClick={() => setSelectedUser(null)}    
            />
        </div>
    )
}

export default ChatHeader
