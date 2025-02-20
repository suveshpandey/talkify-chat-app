import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore"

import { RxCross2 } from "react-icons/rx";

const ChatHeader = () => {
    const {selectedUser, setSelectedUser} = useChatStore();
    const {onlineUsers} = useAuthStore();


    return (
        <div className="h-16 w-[100%] bg-slate-600 px-5 flex justify-between items-center ">
            <div className="flex gap-3">
                <img src={selectedUser?.profilePic} alt="" className="size-12 rounded-full cursor-pointer " />
                <div>
                    <p className="text-lg font-bold text-slate-200">{selectedUser?.username}</p>
                    <p className="text-green-400">online</p>
                </div>
            </div>
            <RxCross2 
                className="text-red-200 font-bold size-10 cursor-pointer hover:ring-1 ring-orange-300 rounded-full p-1 transition-all duration-300" 
                onClick={() => setSelectedUser(null)}    
            />
        </div>
    )
}

export default ChatHeader
