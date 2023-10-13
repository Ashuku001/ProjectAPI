'use client'
import Link from "next/link"
import Image from "next/image"
import { MessageAddedDocument } from "../../../../__gql__/graphql"
import { useEffect, useState } from "react"
import { LastMessageDocument } from "../../../../__gql__/graphql"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import TimeAgo from "react-timeago"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation"
import { ChatType } from "../../../../types"
import { useReactiveVar } from "@apollo/client"
import { useIsSelected } from "../store/localStore"

type Props = {
    chat: ChatType,
}

function ChatComponent({ chat }: Props) {
    const { data, subscribeToMore } = useSuspenseQuery(
        LastMessageDocument,
        { variables: { chatId: (chat?.id as number) } })
    const router = useRouter()
    const [selected, setSelected] = useState(false)
    // let isSelected = useReactiveVar(useIsSelected)[0]
    // console.log("Selected status", selected)

    const lastMessage = data?.lastMessage

    const subscribeNewLastMessage = () => {
        subscribeToMore({
            document: MessageAddedDocument,
            variables: { chatId: (chat?.id as number) },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data)
                    return prev

                const newLastmessage = subscriptionData.data.messageAdded?.message
                if (newLastmessage?.from_customer === true)
                    toast(newLastmessage?.text)

                if (newLastmessage) {
                    return Object.assign({}, prev, {
                        lastMessage: {
                            text: newLastmessage?.text,
                            createdAt: newLastmessage?.createdAt,
                            chat: {
                                id: chat?.id
                            }
                        }
                    });
                } else {
                    return prev
                }
            }
        })
    }

    const handleClick = (chatId: number) => {
        router.push(`/chats/${chatId}`)

    }

    useEffect(() => {subscribeNewLastMessage()}, [])

    return (
        <Link
            onClick={e => handleClick}
            href={`/chats/${chat?.id}`}
            className={`chatboxhover:bg-gray-400 cursor-pointer w-full `}
        >
            <div className={`flex items-center w-full hover:bg-gray-200 dark:hover:bg-gray-700 ${chat?.id! < 0 ? 'bg-red' : ''} ${selected ? 'bg-white' : ''}`}>
                <div className="p-3">
                    <Image
                        src={'/profile.jpg'}
                        height={40}
                        width={40}
                        alt='P'
                    />
                </div>
                <div className="flex justify-between flex-1 flex-col" >
                    <div className="chat-name flex  justify-start items-start  h-6">
                        <h3 className="text-md font-sans font-normal line-clamp-1">
                            <p className=' font-sans text-base capitalize'>{chat?.customer?.first_name || chat?.customer?.last_name
                                ? `${chat?.customer?.first_name} ${"   "}  ${chat?.customer?.last_name}`
                                : chat?.customer?.phone_number
                            }
                            </p>
                        </h3>
                        {lastMessage && <TimeAgo className="text-[0.80rem] font-sans text-gray-500 font-light  line-clamp-1 ml-auto w-20" date={new Date(lastMessage?.createdAt)} />}

                    </div>
                    <div className="last-message">
                        {lastMessage && <p className="text-md text-left text-gray-500 font-sans font-normal line-clamp-1 w-[80%] h-6">{lastMessage?.text}</p>}
                    </div>
                </div>
            </div>
            <hr className="w-[85%] float-right bg-gray-800 dark:bg-gray-800"></hr>
        </Link>
    )
}

export default ChatComponent