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
        <div className='h-auto sm:px-8 px-3 mb-4 mt-1 w-[100%] '>
            {imagePreview && (
                <div className='mb-3 flex items-center gap-2'>
                    <div className='relative'>
                        {imagePreview && (
                            <img
                                src={imagePreview as string}
                                alt="Preview"
                                className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                            />
                        )}
                        <button
                            onClick={handleRemoveImage}
                            className='absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-300 font-semibold rounded-full text-slate-800 flex items-center justify-center '
                            type='button'
                        >X</button>
                    </div>
                </div>
            )}
            <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
                <div className='flex-1 flex gap-2 items-center '>
                    <input 
                        type="text" 
                        className='w-full rounded-full h-14 px-6 outline-none bg-slate-950 hover:ring-1 transition-all duration-200  '
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
                        className={`${imagePreview && `text-green-200` }`}
                        onClick={() => fileInputRef.current?.click()}
                    ><HiOutlinePhotograph className='size-12  border-2 ring-gray-100 text-gray-100 hover:bg-gray-100 hover:text-gray-700 cursor-pointer p-2.5 rounded-full transition-all duration-200 ' /></button>
                </div>
                <button
                    type='submit'
                    disabled={!text.trim() && !imagePreview}
                ><IoSend className={`size-12  border-2 bg-gray-200 hover:bg-white text-gray-700 cursor-pointer p-2.5 rounded-full transition-all duration-200 ${!text.trim() && `opacity-70`} `} />
                </button>
            </form>
        </div>
    )
}

export default ChatInput
