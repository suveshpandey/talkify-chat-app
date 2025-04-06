import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { FaEdit, FaCircle } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";

const ProfilePage = () => {
    const {authUser, updateProfile, IsUpdatingProfile} = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    
    const navigate = useNavigate();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
    
            // Define the onload callback
            reader.onload = () => {
                const base64Image = reader.result as string; // Casting to string
                
                updateProfile({ profilePic: base64Image }).catch((err) => {
                    console.error("Error updating profile:", err); // Error handling
                });
            };
    
            // Optionally, define onerror callback for file read errors
            reader.onerror = (error) => {
                console.error("File reading error:", error);
            };
    
            // Start reading the file as Data URL
            reader.readAsDataURL(file);
        }
    };
    const handleClose = () => {
        navigate("/")
    }

    return (
        <div className="h-[calc(100vh-4rem)] w-[100%] bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 w-full max-w-md transition-all duration-300 hover:shadow-xl">
                <div className="relative group">
                    <div className="relative w-48 h-48 mx-auto mb-6">
                        <img
                            src={authUser.profilePic || "./avatar.png"}
                            className="w-full h-full rounded-full object-cover border-4 border-slate-300 dark:border-slate-600 transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                        />
                        {IsUpdatingProfile && <h1 className="text-center text-slate-600 dark:text-slate-300">Uploading...</h1>}
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="absolute bottom-2 right-2 bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                            aria-label="Edit profile"
                        >
                            <FaEdit className="text-slate-600 text-xl" />
                        </button>
                    </div>

                    {/* Show file input if editing */}
                    {isEditing && (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="absolute bottom-2 right-2 opacity-0 w-full h-full cursor-pointer"
                            style={{ zIndex: 999 }}
                        />
                    )}
                </div>
                <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-2">
                        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                            {authUser.username || "username"}
                        </h1>
                        <FaCircle
                            className={`text-xs text-green-500`}
                            title={"Active"}
                        />
                    </div>

                    <a
                        className="text-xl font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 transition-colors duration-300"
                    >
                        {authUser.email || "abc@gmail.com"}
                    </a>

                    <p className="text-sm text-slate-400 dark:text-slate-500">
                        Member since {format(new Date(authUser.createdAt), 'MMMM yyyy')}
                    </p>

                    <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                        <button
                            className="bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-6 py-2 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors duration-300"
                            onClick={handleClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default ProfilePage;
