import React from 'react'

const NoChatSelected = () => {
    return (
        <div className='sm:w-[70%] w-[95%] h-[70%] bg-slate-700 rounded-md flex flex-col items-center justify-center '>
            <h1 className='font-bold text-2xl'>Welcome to Talkify</h1>
            <h1 className='font-bold text-xl text-center mt-2 opacity-70'>Select a conversation from the sidebar to start chatting.</h1>
        </div>
    )
}

export default NoChatSelected
