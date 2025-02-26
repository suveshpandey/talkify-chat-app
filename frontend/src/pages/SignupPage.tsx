
import { useState } from "react";
import { Link } from 'react-router-dom';
import { useAuthStore } from "../store/useAuthStore";
import Loader from "../components/Loader";
import toast from "react-hot-toast";



const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: ""
    });
    const { signup, isSigninup } = useAuthStore();

    const validateForm = () => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            return toast.error("Please enter a valid email address");
        }        
        if(!formData.password.trim()) return toast.error("Password is required");
        if(formData.password.length < 6) return toast.error("Password must contain atleast 6 characters");
        if(!formData.username.trim()) return toast.error("Username is required");
    
        return true;
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const success = validateForm();
        if(success === true) signup(formData)
    };

    // return (
    //     <div className="dark">
    //         <div className=" font-[sans-serif] h-[calc(100vh-4rem)] bg-white ">
    //             <div className="grid md:grid-cols-2 items-center gap-8 h-full">
    //                 <div className="max-md:order-1 p-4 bg-gray-50 h-full">
    //                     <img src="https://readymadeui.com/signin-image.webp" className="max-w-[80%] w-full h-full aspect-square object-contain block mx-auto" alt="login-image" />
    //                 </div>

    //                 <div className="flex items-center p-6 h-full w-full">
    //                     <form className="max-w-lg w-full mx-auto" onSubmit={handleSubmit}>
    //                         <div className="mb-8">
    //                             <h3 className="text-blue-500 text-2xl font-bold max-md:text-center">Create account</h3>
    //                         </div>

    //                         {/* email input section */}
    //                         <div className="">
    //                             <label className="text-gray-800  text-xs block mb-2">Email</label>
    //                             <div className="relative flex items-center">
    //                                 <input 
    //                                     name="email" 
    //                                     type="email" 
    //                                     value={formData.email}
    //                                     onChange={(e) => setFormData({...formData, email: e.target.value})}
    //                                     className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 pl-2 pr-8 py-3 outline-none" 
    //                                     placeholder="Enter email" 
    //                                 />
    //                             </div>
    //                         </div>
                            
    //                         {/* password input section */}
    //                         <div className="mt-6">
    //                             <label className="text-gray-800 text-xs block mb-2">Password</label>
    //                             <div className="relative flex items-center">
    //                                 <input 
    //                                     name="password" 
    //                                     type={showPassword ? "text" : "password"} 
    //                                     value={formData.password}
    //                                     onChange={(e) => setFormData({...formData, password: e.target.value})}
    //                                     className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 pl-2 pr-8 py-3 outline-none" 
    //                                     placeholder="Enter password" 
    //                                 />
    //                                 <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128" onClick={() => setShowPassword(!showPassword)}>
    //                                     <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
    //                                 </svg>
    //                             </div>
    //                         </div>

    //                         {/* username input section */}
    //                         <div className="mt-6">
    //                             <label className="text-gray-800 text-xs block mb-2">UserName</label>
    //                             <div className="relative flex items-center">
    //                                 <input 
    //                                     name="username" 
    //                                     type="text" 
    //                                     value={formData.username}
    //                                     onChange={(e) => setFormData({...formData, username: e.target.value})}
    //                                     className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 pl-2 pr-8 py-3 outline-none" 
    //                                     placeholder="Enter username" 
    //                                 />
    //                             </div>
    //                         </div>

    //                         <div className="mt-8">
    //                             {
    //                                 isSigninup ? <button type="submit" className="w-full flex justify-center items-center gap-x-2 py-2.5 px-4 text-sm tracking-wider rounded bg-blue-600 hover:bg-blue-700 text-white focus:outline-none">
    //                                 <Loader />
    //                                 Processing
    //                             </button>
    //                             :
    //                             <button type="submit" disabled={isSigninup} className="w-full flex justify-center items-center gap-x-2 py-2.5 px-4 text-sm tracking-wider rounded bg-blue-600 hover:bg-blue-700 text-white focus:outline-none">
    //                                 Sign-Up
    //                             </button>
    //                             }
    //                             <p className="text-sm mt-6 text-gray-800">Already have an account? <Link to={"/login"} className="text-blue-500 font-semibold hover:underline ml-1">Login here</Link></p>
    //                         </div>
    //                     </form>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );

    return (
        <div className="">
            <div className="font-[sans-serif] h-[calc(100vh-4rem)] bg-white dark:bg-slate-900">
                <div className="grid md:grid-cols-2 items-center gap-8 h-full">
                    <div className="max-md:order-1 p-4 bg-gray-50 dark:bg-slate-800 h-full">
                        <img src="https://readymadeui.com/signin-image.webp" className="max-w-[80%] w-full h-full aspect-square object-contain block mx-auto" alt="login-image" />
                    </div>

                    <div className="flex items-center p-6 h-full w-full">
                        <form className="max-w-lg w-full mx-auto" onSubmit={handleSubmit}>
                            <div className="mb-8">
                                <h3 className="text-blue-500 dark:text-indigo-400 text-2xl font-bold max-md:text-center">Create account</h3>
                            </div>

                            {/* email input section */}
                            <div className="">
                                <label className="text-gray-800 dark:text-slate-200 text-xs block mb-2">Email</label>
                                <div className="relative flex items-center">
                                    <input 
                                        name="email" 
                                        type="email" 
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="w-full bg-transparent text-sm border-b border-gray-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-indigo-400 pl-2 pr-8 py-3 outline-none dark:text-slate-200 dark:placeholder-slate-400" 
                                        placeholder="Enter email" 
                                    />
                                </div>
                            </div>
                            
                            {/* password input section */}
                            <div className="mt-6">
                                <label className="text-gray-800 dark:text-slate-200 text-xs block mb-2">Password</label>
                                <div className="relative flex items-center">
                                    <input 
                                        name="password" 
                                        type={showPassword ? "text" : "password"} 
                                        value={formData.password}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                        className="w-full bg-transparent text-sm border-b border-gray-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-indigo-400 pl-2 pr-8 py-3 outline-none dark:text-slate-200 dark:placeholder-slate-400" 
                                        placeholder="Enter password" 
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2 cursor-pointer dark:text-slate-400 dark:fill-current dark:stroke-current" viewBox="0 0 128 128" onClick={() => setShowPassword(!showPassword)}>
                                        <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
                                    </svg>
                                </div>
                            </div>

                            {/* username input section */}
                            <div className="mt-6">
                                <label className="text-gray-800 dark:text-slate-200 text-xs block mb-2">UserName</label>
                                <div className="relative flex items-center">
                                    <input 
                                        name="username" 
                                        type="text" 
                                        value={formData.username}
                                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                                        className="w-full bg-transparent text-sm border-b border-gray-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-indigo-400 pl-2 pr-8 py-3 outline-none dark:text-slate-200 dark:placeholder-slate-400" 
                                        placeholder="Enter username" 
                                    />
                                </div>
                            </div>

                            <div className="mt-8">
                                {
                                    isSigninup ? <button type="submit" className="w-full flex justify-center items-center gap-x-2 py-2.5 px-4 text-sm tracking-wider rounded bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white focus:outline-none transition-colors">
                                    <Loader />
                                    Processing
                                </button>
                                :
                                <button type="submit" disabled={isSigninup} className="w-full flex justify-center items-center gap-x-2 py-2.5 px-4 text-sm tracking-wider rounded bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white focus:outline-none transition-colors">
                                    Sign-Up
                                </button>
                                }
                                <p className="text-sm mt-6 text-gray-800 dark:text-slate-300">Already have an account? <Link to={"/login"} className="text-blue-500 dark:text-indigo-400 font-semibold hover:underline ml-1">Login here</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
