import ChatContainer from "../components/ChatContainer";
// import ImageZoom from "../components/ImageZoom";
import NoChatSelected from "../components/NoChatSelected";
import Sidebar from "../components/Sidebar";
import { useChatStore } from "../store/useChatStore"

const home = () => {
    const { selectedUser, isSidebarOpen } = useChatStore();
    return (
        <div className="bg-slate-100 dark:bg-slate-900 h-[calc(100vh-4rem)] w-[100%] lg:w-[75%] mx-auto flex transition-colors duration-300">
            {isSidebarOpen && <Sidebar />}
            <div className={`w-[100%] h-[100%] flex justify-center items-center ${isSidebarOpen ? `hidden sm:block` : ``}`}>
                {selectedUser ? <ChatContainer /> : <NoChatSelected />}
            </div>
        </div>
    )
}

export default home;