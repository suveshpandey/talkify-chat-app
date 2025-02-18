import { useAuthStore } from "../store/useAuthStore"
import { IoLogOutOutline } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const {authUser, logout} = useAuthStore();
    const navigate = useNavigate();
    const handleProfile = () => {
        navigate("/profile-page")
    }

    return (
        <div className="">
            {/* <nav className="bg-[#e2eafc] dark:bg-gray-800 dark:border-gray-700 text-gray-500">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="mainIcon.png" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-bold whitespace-nowrap text-gray-600">Talkify</span>
                    </a>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
                        <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">

                            <div className="size-[30px] bg-slate-300 rounded-full cursor-pointer" onClick={ handleProfile}>
                                <img className="rounded-full size-full" src={authUser.profilePic} alt="" />
                            </div>

                            <div className="">
                                <button className="py-1 px-3 rounded-md flex justify-center items-center gap-x-2 bg-slate-300 " onClick={logout}>Logout <IoLogOutOutline /> </button>
                            </div>
                            
                        </ul>
                    </div>
                </div>
            </nav> */}

            

            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="./mainIcon.png" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Talkify</span>
                    </a>
                    <div className="flex gap-x-3 items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button type="button" className="flex justify-center items-center text-sm size-8 bg-gray-300 rounded-full md:me-0 active:ring-4 active:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                            <MdDarkMode className="size-6 text-slate-800" />
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
