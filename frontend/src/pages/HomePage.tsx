import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";
import Sidebar from "../components/Sidebar";
import { useChatStore } from "../store/useChatStore"

const home = () => {
    const { selectedUser, isSidebarOpen } = useChatStore();
    return (
        <div className="bg-slate-800 h-[calc(100vh-4rem)] w-[100%] lg:w-[75%] mx-auto flex ">
            {isSidebarOpen && <Sidebar />}
            <div className="w-[100%] h-[100%] flex justify-center items-center ">
                {true ? <NoChatSelected /> : <ChatContainer />}
            </div>
        </div>
    )
}

export default home
