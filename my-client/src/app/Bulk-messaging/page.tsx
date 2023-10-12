'use client'
import { getTemplatedMessageInput2 } from '@/lib/message-helper/message-helper'
import { sendMessage } from '@/lib/message-helper/sendMessage'
import sendMessageBtn from './components/sendMessageBtn'


function page() {

    const handleClick = () => {
        const data = getTemplatedMessageInput2("254707737397")
        sendMessage(data)
    }

    return (
        <div className='h-full flex items-center justify-center'>
            <>
                <button className='bg-white p-2 text-black rounded-sm' onClick={e => handleClick()}>Click me to send a marketing message</button>
            </>
        </div>
    )
}

export default page