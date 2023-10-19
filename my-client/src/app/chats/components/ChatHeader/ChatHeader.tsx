'use client'
import { useSearchParams } from 'next/navigation';
import ExistingChat from './ExistingChat';
import NewChat from './NewChat';

type Props = {
    chatId: number
}


function ChatHeader({ chatId }: Props) {
    const searchParams = useSearchParams()
    let customerId = undefined
    if (!chatId || chatId < 0) {
        const id = (searchParams.get("customerId"))
        if (id)
            customerId = parseInt(id)
    }
    return (
        <div className='flex justify-between items-center w-full cursor-pointer'>
            {(chatId && chatId > 0) &&
                <ExistingChat chatId={chatId} />
            }
            {(customerId && customerId > 0) &&
                <NewChat customerId={customerId} />
            }
        </div>
    )
}

export default ChatHeader
