const NoChatSelected = () => {
    return (
        <div className='h-full w-full bg-slate-200 dark:bg-slate-800 flex flex-col items-center justify-center px-6 transition-colors duration-300'>
            <div className='max-w-md text-center space-y-6'>
                {/* Animated chat icon */}
                <div className='text-8xl animate-bounce flex items-center justify-center text-indigo-500 dark:text-indigo-400'>
                    <img src="./mainIcon.png" alt="" className="size-20" />
                </div>
                
                {/* Gradient text heading */}
                <h1 className='text-4xl font-bold bg-gradient-to-r from-indigo-500 to-green-400 bg-clip-text text-transparent'>
                    Welcome to Talkify
                </h1>
                
                {/* Animated subtitle */}
                <p className='text-lg text-slate-600 dark:text-slate-300 opacity-90 leading-relaxed animate-pulse'>
                    Select a conversation from the sidebar (≡) 
                </p>
                
                {/* Decorative elements */}
                <div className='flex justify-center space-x-4 opacity-75'>
                    <div className='h-1 w-12 bg-indigo-300 dark:bg-indigo-600 rounded-full animate-typing'></div>
                    <div className='h-1 w-12 bg-indigo-300 dark:bg-indigo-600 rounded-full animate-typing delay-150'></div>
                    <div className='h-1 w-12 bg-indigo-300 dark:bg-indigo-600 rounded-full animate-typing delay-300'></div>
                </div>
            </div>
        </div>
    )
}

export default NoChatSelected