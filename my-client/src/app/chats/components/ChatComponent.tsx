'use client'
import Link from "next/link"
import Image from "next/image"
import { MessageAddedDocument } from "../../../../__gql__/graphql"
import { FormEvent, useEffect } from "react"
import { LastMessageDocument } from "../../../../__gql__/graphql"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import TimeAgo from "react-timeago"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation"

type Props = {
    chat: ({
        __typename?: "Chat" | undefined;
        id?: number | null | undefined;
        customer: {
            __typename?: 'Customer';
            id?: number | null;
            first_name?: string | null;
            last_name?: string | null;
            phone_number: string;
        };
        lastMessage?: {
            __typename?: "Message" | undefined;
            id?: number | undefined;
            text: string;
            createdAt?: any | null;
            chat: {
                __typename?: 'Chat';
                id?: number | null;
            };
        } | null | undefined;
    } | null),
}

function ChatComponent({  chat }: Props) {
    const { data, subscribeToMore } = useSuspenseQuery(
        LastMessageDocument,
        { variables: { chatId: (chat?.id as number) } })
    const router = useRouter()

    const lastMessage = data?.lastMessage

    const subscribeNewLastMessage = () => {
        console.log("In hewewe")
        subscribeToMore({
            document: MessageAddedDocument,
            variables: { chatId: (chat?.id as number) },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data)
                    return prev

                const newLastmessage = subscriptionData.data.messageAdded?.message
                console.log("New last message inchat component", newLastmessage)
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

    const handleClick = (chatId: number ) => {
        router.push(`/chats/${chatId}`)
    }

    useEffect(() => subscribeNewLastMessage(), [])

    return (
        <Link
            href={`/chats/${chat?.id}`}
            className={`chatboxhover:bg-gray-400  dark:hover:bg-gray-700 cursor-pointer w-full ${chat?.id! <0 ? 'bg-red': ''}`}
        >
            <div className="flex items-center w-full">
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