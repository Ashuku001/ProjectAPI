'use client'
import ChatHeader from "../components/ChatHeader"
import TextInput from "@/app/chats/components/TextInput"
import { skipToken } from "@apollo/client"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import MessageList from "../components/MessageList"
import { GetMessagesDocument, MessageAddedDocument, GetCustomerInfoDocument, } from "../../../../__gql__/graphql"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { CustomerType, MessageType } from "../../../../types"

type Props = {
    params: {
        chatId?: string | null
    }
}


function ChatPage({ params: { chatId } }: Props) {
    const searchParams = useSearchParams()


    let id = undefined
    if (chatId !== undefined) {
        console.log("in here")
        id = parseInt(chatId!)
    }

    let customer = null
    let messages = null
    let customerId = undefined
    
    if (id) {
        const { data, subscribeToMore } = useSuspenseQuery(
            GetMessagesDocument,
            chatId ? { variables: { chatId: id } } : skipToken
        );

        customer = data?.chat?.customer
        messages = data?.chat?.messages

        const subscribeToNewMessaes = () => {
            subscribeToMore({
                document: MessageAddedDocument,
                variables: { chatId: id! },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data || (prev?.chat?.messages && !prev?.chat?.messages.length)) {
                        return prev;
                    }

                    const newMessage = subscriptionData.data.messageAdded?.message
                    // console.log("NEW MESSAGE IN PAGE", newMessage)

                    if (!prev?.chat?.messages.find((msg) => msg?.id === newMessage?.id)) {
                        return Object.assign({}, prev, {
                            chat: {
                                messages: [newMessage, ...prev?.chat?.messages!],
                            }

                        });
                    } else {
                        return prev
                    }
                }
            })
        }

        useEffect(() => subscribeToNewMessaes(), [])

    } else {
        console.log("No search")
        let temp = searchParams.get("customer_id")
        if (temp) {
            customerId = parseInt(temp)
        }
        console.log("there is no id customer id", customerId)
        const { data } = useSuspenseQuery(GetCustomerInfoDocument,
            customerId ? { variables: { customerId: customerId } } : skipToken
        )
        customerId = customerId
        customer = data?.customer
        console.log(customer)
    }
    console.log("MESSAGES and customer info", messages, customer)

    // useEffect(() => {console.log("the new chat id", newChatId, "and id ", id!)}, [newChatId])

    const content =
        (<div className='right bg-[#F0EBE4] dark:bg-slate-900 flex flex-col'>
            <div className="right-upper bg-[#F0F2F5] dark:bg-slate-800 flex justify-between items-center px-4 py-[0.60rem]">
                <ChatHeader customer={customer as CustomerType} />
            </div>
            <div className="h-[68vh] overflow-y-scroll">
                <MessageList messages={messages as MessageType[]} />
            </div>
            <div className="right-bottom w-full top-full sticky flex justify-between items-center px-4 py-4 space-x-2 bg-slate-100 dark:bg-gray-800">
                {id ?<TextInput chatId={id}/>
                    : <TextInput chatId={id} customer={customer as CustomerType}/>
                }
            </div>

        </div>
        )

    return content
}

export default ChatPage