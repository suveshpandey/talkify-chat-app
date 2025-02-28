import { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore';

import { HiOutlinePhotograph } from "react-icons/hi";
import { IoSend } from "react-icons/io5";
import toast from 'react-hot-toast';

const ChatInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const {sendMessage} = useChatStore();


    const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!text.trim() && !imagePreview) return;
        try{
            await sendMessage({
                text: text.trim(),
                image: imagePreview
            });
            setText("");
            setImagePreview(null);
            if(fileInputRef.current) fileInputRef.current.value = "";
        }
        catch(error){
            console.log("Failed to send message: ", error);
        }
    };
    
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file?.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === "string") {
                setImagePreview(reader.result);
            }
        };
        reader.readAsDataURL(file);
    };
    
    const handleRemoveImage = () => {
        setImagePreview(null);
        if(fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className='h-auto sm:px-8 px-3 mb-4 mt-1 w-[100%]'>
            {imagePreview && (
                <div className='mb-3 flex items-center gap-2'>
                    <div className='relative'>
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-slate-300 dark:border-slate-600"
                        />
                        <button
                            onClick={handleRemoveImage}
                            className='absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-400 dark:bg-red-500 font-semibold rounded-full text-white flex items-center justify-center hover:scale-105 transition-transform'
                            type='button'
                        >×</button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className='flex items-center gap-3 p-2'>
                <div className='flex-1 flex gap-2 items-center'>
                    <input 
                        type="text" 
                        className='w-full rounded-full h-14 px-6 outline-none bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-1 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-all duration-200 border border-slate-300 dark:border-slate-700'
                        placeholder='Type a message...'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <input 
                        type="file" 
                        accept='image/*'
                        className='hidden'
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                    <button
                        type='button'
                        onClick={() => fileInputRef.current?.click()}
                        className='p-3 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors duration-200 border border-slate-300 dark:border-slate-600'
                    >
                        <HiOutlinePhotograph className='size-7 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors' />
                    </button>
                </div>
                
                <button
                    type='submit'
                    disabled={!text.trim() && !imagePreview}
                    className='p-3 rounded-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 border border-indigo-500'
                >
                    <IoSend className='size-7 text-white transform' />
                </button>
            </form>
        </div>
    )
}

export default ChatInput
