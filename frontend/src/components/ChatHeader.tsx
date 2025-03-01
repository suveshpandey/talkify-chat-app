import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore"

import { RxCross2 } from "react-icons/rx";

const ChatHeader = () => {
    const {selectedUser, setSelectedUser} = useChatStore();
    const {onlineUsers} = useAuthStore();

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

    return (
        <div className="h-16 w-full dark:bg-slate-600 bg-slate-300 px-5 flex justify-between items-center ">
            {selectedImage && zoomImage && <div 
                    className="fixed top-0 inset-0 bg-black/70 dark:bg-black/80 z-50 flex justify-center items-center p-4 cursor-pointer "
                    onClick={handleCloseZoom}
                >
                    <div className="relative max-w-full max-h-full h-[300px] w-[300px] rounded-full" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={selectedImage}
                            alt="Zoomed content"
                            className="h-[300px] w-[300px] object-cover rounded-full shadow-xl"
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
            <div className="flex gap-3">
                <img src={selectedUser?.profilePic || "./avatar.png"} alt="" className="size-12 rounded-full cursor-pointer " onClick={() => handleZoomImage(selectedUser?.profilePic || "")} />
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
