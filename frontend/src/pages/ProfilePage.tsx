import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { format } from "date-fns";
import { FaEdit, FaCircle } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";

const ProfilePage = () => {
    const {authUser, updateProfile, IsUpdatingProfile} = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    // const [selectedImg, setSelectedImg] =  useState<string | null>(null);
    
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
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md transition-all duration-300 hover:shadow-xl">
                <div className="relative group">
                    <div className="relative w-48 h-48 mx-auto mb-6">
                        <img
                            src={ authUser.profilePic || "./avatar.png"}
                            className="w-full h-full rounded-full object-cover border-4 border-slate-200 transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                        />
                        { IsUpdatingProfile && <h1 className="text-center">Uploading...</h1>}
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
                        <h1 className="text-3xl font-bold text-slate-700">{authUser.username || "username"}</h1>
                        <FaCircle
                            className={`text-xs ${"text-green-500"}`}
                            title={"Active"}
                        />
                    </div>

                    <a
                        // href={`mailto:${}`}
                        className="text-xl font-semibold text-slate-600 hover:text-slate-800 transition-colors duration-300"
                    >
                        {authUser.email || "abc@gmail.com"}
                    </a>

                    <p className="text-sm text-slate-500">
                        {/* Member since {format("MMMM yyyy")} */}
                    </p>

                    <div className="pt-6 border-t border-slate-200">
                        <button
                            className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition-colors duration-300"
                            onClick={handleClose} // Close editing mode
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
