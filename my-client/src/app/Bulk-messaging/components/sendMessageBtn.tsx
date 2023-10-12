'use client'

import { getTemplatedMessageInput2 } from '@/lib/message-helper/message-helper'
import { sendMessage } from '@/lib/message-helper/sendMessage'

function sendMessageBtn() {
    const handleClick = () => {
        const data = getTemplatedMessageInput2("254707737397")
        sendMessage(data)
    }
    return (
        <>
            <button className='bg-white p-2' onClick={e => handleClick()}>Click me to send a message</button>
        </>
    )
}

export default sendMessageBtn