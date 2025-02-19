import { BiSolidContact } from "react-icons/bi";
import { BsCircleFill } from "react-icons/bs";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { User } from "../lib/types";
import { useAuthStore } from "../store/useAuthStore";

interface UserInterface {
    user: User,
    selectedUser: User | null,
    setSelectedUser: (user: User) => void
}

const ContactCard = ({ user, setSelectedUser, selectedUser }: UserInterface) => {
    return (
        <div 
            className={`flex items-center mt-1 p-3 pl-6 cursor-pointer transition-all duration-300 rounded-lg
                ${selectedUser?._id === user._id ? "bg-gray-700" : "hover:bg-gray-700"}`} 
            onClick={() => setSelectedUser(user)} // Set selected user on click
        >
            <div className="relative">
                <img
                    src={user.profilePic || "./avatar.png"}
                    className="w-10 h-10 rounded-full object-cover"
                />
                {true && (
                    <BsCircleFill className="absolute bottom-0 right-0 text-green-500 text-xs" />
                )}
            </div>
            <div className="ml-3 flex-1">
                <h3 className="text-md font-medium text-gray-300 truncate">{user.username}</h3>
                <p className="text-xs text-gray-500 truncate">{"No messages yet"}</p>
            </div>
        </div>
    );
};

const SkeletonContactCard = () => {
    return (
        <div className="flex items-center mt-1 p-3 pl-6 hover:bg-gray-700 cursor-pointer transition-all duration-300 rounded-lg">
            <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse"></div>
            </div>
            <div className="ml-3 flex-1 space-y-2">
                <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4"></div>
                <div className="h-3 bg-gray-700 rounded animate-pulse w-1/2"></div>
            </div>
        </div>
    );
};

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
    const {onlineUsers} = useAuthStore();

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    useEffect(() => {
        console.log("Users in Sidebar:", users); // Log the users array
    }, [users]);

    if (isUsersLoading) {
        return (
            <div className="w-[400px] h-[calc(100vh-4rem)] bg-gray-800 border-r border-gray-700 flex flex-col overflow-y-scroll">
                <div className="p-4 border-b border-gray-700 flex items-center gap-x-2">
                    <BiSolidContact className="size-6 ml-3 text-gray-700" />
                    <h1 className="text-2xl font-bold text-gray-500">Contacts</h1>
                </div>
                <div>
                    <SkeletonContactCard />
                    <SkeletonContactCard />
                    <SkeletonContactCard />
                    <SkeletonContactCard />
                    <SkeletonContactCard />
                    <SkeletonContactCard />
                </div>
            </div>
        );
    }

    return (
        <div className=" w-[400px] h-[calc(100vh-4rem)] bg-gray-800 border-r border-gray-700 flex sm:relative fixed flex-col overflow-y-scroll">
            <div className="p-4 border-b border-gray-700 flex items-center gap-x-2">
                <BiSolidContact className="size-6 ml-3 text-gray-500" />
                <h1 className="text-2xl font-bold text-gray-500">Contacts</h1>
            </div>
            <div>
                {Array.isArray(users)  && users.map((user) => (
                    <ContactCard 
                        key={user._id?.toString()}
                        user={user}
                        selectedUser={selectedUser}
                        setSelectedUser={() => setSelectedUser(user)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;