'use client'
import { FormEvent, useEffect, useState } from "react"
import {  AddMessageDocument, GetMessagesDocument } from "../../../../../__gql__/graphql"
import { useMutation, } from "@apollo/client"
import { activateModal, reactiveChatId } from "@/app/cache/cache"
import { useGetMerchantIdQuery } from "../../../../../graphql/hooks/useGetMerchantId"
import { useRouter } from "next/navigation"

type Prop2 = {
    id: number
}

function AddChat({ id }: Prop2) {
    const [customerId, setCustomerId] = useState(id)
    const [textInput, setTextInput] = useState('')
    const [addMessage, {loading: addMesLoad, error: addMesError, data: addMesData}] = useMutation(AddMessageDocument)
    const {data: tempId} = useGetMerchantIdQuery()
    const merchantId = tempId.merchantId
    const router = useRouter()

    console.log("In adding new chat", textInput, merchantId)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (customerId && customerId > 0) {
            addMessage({
                variables: {
                    message: {
                        text: textInput,
                        chatId: undefined,
                        from_customer: false,
                    },
                    customerId: customerId
                },
    
                //@ts-ignore
                update(cache, { data: { addMessage } }) {
                    const data = cache.readQuery({ query: GetMessagesDocument, variables: { chatId: (addMesData?.addMessage?.chat.id as number) } });
    
                    console.log("data before adding message", data)
                    if (data === null) {
    
                    }
                    if (!data?.chat?.messages?.find((msg) => msg?.id === addMessage?.id)) {
                        console.log("in here adding", addMessage,  (addMesData?.addMessage?.chat.id as number))
                        // add the messae from the mutation to the end
                        // Object.assign({}, data, {
                        //     chat: {
                        //         messages: [addMessage, ...data?.chat?.messages!]
                        //     }
    
                        // });
                        data?.chat?.messages?.push(addMessage)
                    }
                    console.log("new data after adding message", data)
                    cache.writeQuery({ query: GetMessagesDocument, data: data });
                },
                optimisticResponse: {
                    addMessage: {
                        id: Math.round(Math.random() * -1000000),
                        from_customer: false,
                        text: textInput,
                        timestamp: (new Date()).getTime(),
                        createdAt: new Date(),
                        chat: {
                            id:  (addMesData?.addMessage?.chat.id as number),
                            __typename: "Chat"
                        },
                        __typename: "Message"
                    }
    
                },
    
            }).then(() => {
                setTextInput("")
            })
        }
    }

    useEffect(() => {
        if (customerId !== id && id > 1 && customerId > 0) {
            setCustomerId(id)
        }
    }, [id, customerId])

    if(addMesError){
        console.log(addMesError)
        return <div>{addMesError.message}</div>
    }
    if(addMesLoad){

    }
    if(addMesData){
        reactiveChatId(addMesData.addMessage?.chat.id)
        // router.push(`/chats/${addMesData.addMessage?.chat.id}`)
    }

    return (
        <>
            <div className="flex justify-between items-center">
                <div className="w-[40px] h-[40px] flex justify-center items-center cursor-pointer">
                    <svg viewBox="0 0 24 24" width="24" height="24" className="ekdr8vow dhq51u3o"><path fill="gray" d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"></path></svg>
                </div>
                <button
                    onClick={() => activateModal([true])}
                    className="flex justify-center items-center w-[40px] h-[40px] cursor-pointer border-none outline-none">
                    <svg viewBox="0 0 24 24" width="24" height="24" className=""><path fill="gray" d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"></path></svg>
                </button>
            </div>
            <form className="flex w-full" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder={`Type a message ${customerId}`}
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="bg-slate-200 dark:bg-gray-700 rounded-lg px-4 py-2 outline-none w-full flex-1 pr-8 cursor-auto"
                />
                <button
                    disabled={!textInput}
                    type="submit"
                    className='bg-slate-300 dark:bg-gray-500 rounded-lg px-4 py-2 outline-none -ml-5 rounded-l-none'
                >
                    Send
                </button>
                <div className="flex justify-center items-center w-[40px] h-[40px] cursor-pointer">
                    <svg viewBox="0 0 24 24" width="24" height="24" className="dark:text-white text-black"><path fill="gray" d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z"></path></svg>
                </div>
            </form>
        </>
    )
}

export default AddChat