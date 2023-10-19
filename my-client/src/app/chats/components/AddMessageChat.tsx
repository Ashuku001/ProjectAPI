'use client'
import { useSearchParams } from 'next/navigation'
import AddMessage from './AddMessageChat/AddMessage'
import AddChat from './AddMessageChat/AddChat'

type Props = {
    chatId: number
}


function AddMessageChat({ chatId }: Props) {
    const searchParams = useSearchParams()
    let customerId = undefined
    if (!chatId || chatId < 0) {
        const id = (searchParams.get("customerId"))
        if (id)
            customerId = parseInt(id)
    }
    console.log("CHAT ID ", chatId, " CUSTOMER ID ", customerId)
    return (
        <>
            {(chatId && chatId > 0)
                ? <AddMessage chatId={chatId} />
                : (customerId && customerId > 0) &&
                <AddChat id={customerId} />

            }
        </>
    )
}

export default AddMessageChat

