import { useAuthStore } from "../store/useAuthStore"
import { IoLogOutOutline } from "react-icons/io5";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BiMenuAltLeft } from "react-icons/bi";
import { useChatStore } from "../store/useChatStore";
import useThemeStore from "../store/useThemeStore";

const Navbar = () => {
    const {authUser, logout} = useAuthStore();
    const {toggleSidebar} = useChatStore();
    const navigate = useNavigate();
    
    const { isDark, toggleTheme} = useThemeStore();

    const handleProfile = () => {
        navigate("/profile-page")
    }

    return (
        <nav className="h-[4rem] w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
            <div className="w-[100%] h-full flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex sm:gap-x-3 gap-x-1 items-center">
                    <BiMenuAltLeft 
                        onClick={toggleSidebar} 
                        className="size-8 cursor-pointer text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 transition-colors duration-200" 
                    />
                    <div className="flex items-center sm:gap-2 gap-1">
                        <img src="./mainIcon.png" className="sm:h-8 h-6" alt="Talkify Logo" />
                        {/* <span className="text-2xl font-semibold text-slate-800 dark:text-slate-200">Talkify</span> */}
                        <h1 className='sm:text-3xl text-2xl font-bold bg-gradient-to-r from-indigo-500 to-green-400 bg-clip-text text-transparent'>
                            Talkify
                        </h1>
                    </div>
                </div>
                
                <div className="flex h-full sm:gap-x-4 gap-x-2 items-center md:order-2">
                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 border border-slate-300 dark:border-slate-600"
                    >
                        {isDark ? <MdLightMode className="size-6 text-slate-600 dark:text-slate-300" /> : <MdDarkMode className="size-6 text-slate-600 dark:text-slate-300" />}
                    </button>

                    {/* Profile Button */}
                    <button 
                        onClick={handleProfile}
                        className="p-[2px] rounded-full border-[1px] border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-400 transition-colors duration-200"
                    >
                        <img 
                            className="size-9 rounded-full object-cover" 
                            src={authUser?.profilePic || "./avatar.png"} 
                            alt="Profile" 
                        />
                    </button>

                    {/* Logout Button */}
                    <button 
                        onClick={logout}
                        className="flex items-center justify-center sm:gap-2 gap-0 sm:px-4 px-3 py-2 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors duration-200 text-slate-700 dark:text-slate-300"
                    >
                        <span className="hidden sm:block">Logout</span>
                        <IoLogOutOutline className="size-6 text-slate-600 dark:text-slate-400" />
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;