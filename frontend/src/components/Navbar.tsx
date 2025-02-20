import { useAuthStore } from "../store/useAuthStore"
import { IoLogOutOutline } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BiMenuAltLeft } from "react-icons/bi";
import { useChatStore } from "../store/useChatStore";

const Navbar = () => {
    const {authUser, logout} = useAuthStore();
    const {toggleSidebar} = useChatStore();
    const navigate = useNavigate();
    const handleProfile = () => {
        navigate("/profile-page")
    }

    return (
        <div className="">
            <nav className=" h-[4rem] w-full bg-white border-b-[1px] border-gray-600 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div className="flex gap-x-3">
                        <BiMenuAltLeft onClick={toggleSidebar} className="size-8 block" />
                        <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <img src="./mainIcon.png" className="h-8" alt="Flowbite Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Talkify</span>
                        </a>
                    </div>
                    <div className="flex gap-x-3 items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button type="button" className="flex justify-center items-center text-sm size-8 rounded-full ring-1 ring-slate-400 hover:ring-blue-500 active:ring-green-500 " id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                            <MdDarkMode className="size-6 text-slate-500 hover:text-slate-300 duration-200 transition-all" />
                        </button>
                        <button type="button" onClick={handleProfile} className="flex text-sm bg-gray-800 rounded-full md:me-0 active:ring-4 active:ring-gray-300 dark:active:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                            <img className="w-8 h-8 rounded-full" src={(authUser != null && authUser.profilePic) || "./avatar.png"} alt="user photo" />
                        </button>
                        <div className="w-[2px] h-6 bg-slate-400"></div>
                        <button type="button" onClick={logout} className="flex justify-center items-center text-sm size-8 rounded-full md:me-0 active:ring-4 active:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                            <IoLogOutOutline  className="size-8 text-slate-400" />
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
