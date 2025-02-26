// import { useAuthStore } from "../store/useAuthStore"
// import { IoLogOutOutline } from "react-icons/io5";
// import { MdDarkMode } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import { BiMenuAltLeft } from "react-icons/bi";
// import { useChatStore } from "../store/useChatStore";

// const Navbar = () => {
//     const {authUser, logout} = useAuthStore();
//     const {toggleSidebar} = useChatStore();
//     const navigate = useNavigate();
//     const handleProfile = () => {
//         navigate("/profile-page")
//     }

//     return (
//         <div className="">
//             <nav className=" h-[4rem] w-full bg-white border-b-[1px] border-gray-600 dark:bg-gray-900">
//                 <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//                     <div className="flex gap-x-3">
//                         <BiMenuAltLeft onClick={toggleSidebar} className="size-8 block cursor-pointer hover:text-white transition-all duration-200" />
//                         <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
//                             <img src="./mainIcon.png" className="h-8" alt="Flowbite Logo" />
//                             <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Talkify</span>
//                         </a>
//                     </div>
//                     <div className="flex gap-x-3 items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
//                         {/* theme-btn */}
//                         <button type="button" className="flex justify-center items-center text-sm size-8 rounded-full ring-1 ring-slate-700 hover:ring-slate-500 transition-all  duration-200 " id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
//                             <MdDarkMode className="size-6 text-slate-500 hover:text-slate-300  transition-all duration-200" />
//                         </button>
//                         {/* user-profile-page */}
//                         <button type="button" onClick={handleProfile} className="flex text-sm bg-gray-800 rounded-full " id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
//                             <img className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-700 hover:ring-slate-500 transition-all duration-200 " src={(authUser != null && authUser.profilePic) || "./avatar.png"} alt="user photo" />
//                         </button>
//                         {/* logout btn */}
//                         <div className="w-[2px] h-6 bg-slate-400"></div>
//                         <button type="button" onClick={logout} className="w-auto flex justify-center items-center bg-slate-800 py-1 px-3 gap-x-1 rounded-full ring-1 hover:ring-orange-300 transition-all duration-200" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
//                             <p className="text-gray-300 text-lg hidden sm:block">Logout</p>
//                             <IoLogOutOutline  className="size-6 text-slate-400" />
//                         </button>
//                     </div>
//                 </div>
//             </nav>
//         </div>
//     )
// }

// export default Navbar


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
        <nav className="h-[4rem] w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
            <div className="max-w-screen-xl h-full flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex gap-x-3 items-center">
                    <BiMenuAltLeft 
                        onClick={toggleSidebar} 
                        className="size-8 cursor-pointer text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 transition-colors duration-200" 
                    />
                    <div className="flex items-center gap-2">
                        <img src="./mainIcon.png" className="h-8" alt="Talkify Logo" />
                        <span className="text-2xl font-semibold text-slate-800 dark:text-slate-200">Talkify</span>
                    </div>
                </div>
                
                <div className="flex h-full gap-x-4 items-center md:order-2">
                    {/* Theme Toggle Button */}
                    <button
                        className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 border border-slate-300 dark:border-slate-600"
                    >
                        <MdDarkMode className="size-6 text-slate-600 dark:text-slate-300" />
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
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 text-slate-700 dark:text-slate-300"
                    >
                        <span className="hidden sm:block">Logout</span>
                        <IoLogOutOutline className="size-5 text-slate-600 dark:text-slate-400" />
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;