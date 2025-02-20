


const NoChatSelected = () => {
    return (
        <div className=' h-full w-full bg-slate-700 px-10 flex flex-col mx-auto items-center justify-center '>
            <h1 className='font-bold text-2xl animate-pulse text-green-300'>Welcome to Talkify</h1>
            <h1 className='font-bold text-xl text-gray-200 text-center mt-2 opacity-70'>{`Select a conversation from the sidebar (≡) to start chatting.`}</h1>
        </div>
    )
}

export default NoChatSelected
