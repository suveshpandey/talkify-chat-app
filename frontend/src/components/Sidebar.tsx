import { ImUsers } from "react-icons/im";
import { BsCircleFill } from "react-icons/bs";
import { useChatStore } from "../store/useChatStore";
import { useEffect, useState } from "react";
import { User } from "../lib/types";
import { useAuthStore } from "../store/useAuthStore";

interface UserInterface {
    user: User,
    selectedUser: User | null,
    setSelectedUser: (user: User) => void,
    onlineUsers: string[],
    toggleSidebar: () => void
}

const ContactCard = ({ user, setSelectedUser, selectedUser, onlineUsers, toggleSidebar }: UserInterface) => {
    return (
        <div 
            className={`flex items-center mt-2 p-3 pl-6 cursor-pointer transition-all duration-300 rounded-lg
                ${selectedUser?._id === user._id 
                    ? "bg-slate-300 dark:bg-slate-700" 
                    : "hover:bg-slate-300 dark:hover:bg-slate-700"}`} 
            onClick={() => {
                setSelectedUser(user);
                if (window.innerWidth < 640) { // Tailwind's 'sm' breakpoint (640px)
                    toggleSidebar();
                }
            }}
        >
            <div className="relative">
                <img
                    src={user.profilePic || "./avatar.png"}
                    className="w-10 h-10 rounded-full object-cover border-2 border-slate-100 dark:border-slate-600"
                    alt={user.username}
                />
                <BsCircleFill className={`absolute bottom-0 right-0 ${
                    onlineUsers.includes(user._id?.toString() || "") 
                    ? 'text-green-500' 
                    : 'text-slate-400 dark:text-slate-600'
                } text-xs`} />
            </div>
            <div className="ml-3 flex-1">
                <h3 className="text-md font-medium text-slate-800 dark:text-slate-200 truncate">
                    {user.username}
                </h3>
            </div>
        </div>
    );
};

const SkeletonContactCard = () => {
    return (
        <div className="flex items-center mt-1 p-3 pl-6 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer transition-all duration-300 rounded-lg">
            <div className="relative">
                <div className="w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-600 animate-pulse"></div>
            </div>
            <div className="ml-3 flex-1 space-y-2">
                <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded animate-pulse w-3/4"></div>
            </div>
        </div>
    );
};

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading, toggleSidebar } = useChatStore();
    const { onlineUsers } = useAuthStore();
    const [showOnlineUsersOnly, setShowOnlineUsersOnly] = useState(false);
    const onlineFilteredUsers = showOnlineUsersOnly ? 
        users.filter(user => onlineUsers.includes(user._id?.toString() || "")) : 
        users;

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    if (isUsersLoading) {
        return (
            <div className="w-[400px] h-[calc(100vh-4rem)] bg-slate-200 dark:bg-slate-800 border-r border-slate-300 dark:border-slate-700 flex flex-col overflow-y-scroll transition-colors duration-300">
                <div className="p-4 border-b border-slate-300 dark:border-slate-700 flex items-center gap-x-2">
                    <ImUsers className="size-6 ml-3 text-slate-600 dark:text-slate-400" />
                    <h1 className="text-2xl font-bold text-slate-600 dark:text-slate-400">Users</h1>
                </div>
                <div>
                    {[...Array(6)].map((_, i) => <SkeletonContactCard key={i} />)}
                </div>
            </div>
        );
    }

    return (
        <div className="sm:w-[400px] w-[80%] h-[calc(100vh-4rem)] sm:pl-3 bg-slate-200 dark:bg-slate-800 border-r border-slate-300 dark:border-slate-700 flex sm:relative absolute flex-col overflow-y-scroll z-10 transition-colors duration-300">
            <div className="p-4 border-b border-slate-300 dark:border-slate-700 flex items-center gap-x-2">
                <ImUsers className="size-6 ml-3 text-slate-600 dark:text-slate-400" />
                <h1 className="text-2xl font-bold text-slate-600 dark:text-slate-400">Users</h1>
            </div>

            <div className="mt-3 hidden lg:flex items-center justify-center gap-2 ">
                <label className="cursor-pointer flex items-center justify-center">
                    <input 
                        type="checkbox"
                        checked={showOnlineUsersOnly}
                        onChange={(e) => setShowOnlineUsersOnly(e.target.checked)}
                        className="checkbox checkbox-sm bg-slate-100 dark:bg-slate-700 border-slate-400 dark:border-slate-500"
                    />
                    <p className="opacity-60 ml-1 text-slate-600 dark:text-slate-400">
                        Show online users only
                    </p>
                </label>
                <span className="text-green-500 opacity-70">
                    ({onlineUsers.length - 1} online)
                </span>
            </div>

            <div className="flex-1 overflow-y-auto">
                {Array.isArray(users) && onlineFilteredUsers.map((user) => (
                    <ContactCard 
                        key={user._id?.toString()}
                        user={user}
                        selectedUser={selectedUser}
                        setSelectedUser={() => setSelectedUser(user)}
                        onlineUsers={onlineUsers}
                        toggleSidebar={toggleSidebar}
                    />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;