'use client'
import {
    useSuspenseQuery,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { ChatAddedDocument, GetChatsDocument } from "../../../../__gql__/graphql";
import ChatComponent from "./ChatComponent";
import { Suspense, useEffect, useState } from "react";
import { ChatType } from "../../../../types";
import { useGetMerchantIdQuery } from "../../../../graphql/hooks/useGetMerchantId";
import { gql } from "@apollo/client";
import { toast } from "react-toastify";
import LoadingChatHeader from "./LoadingChatHeader";
import secureLocalStorage from 'react-secure-storage'

export const GET_MERCHANTS_ID = gql`
    query GetMerchantId {
        merchantId @client
    }
`


function ChatList() {
    const { data, subscribeToMore } = useSuspenseQuery(GetChatsDocument)
    let activeChat = useState<number>(-100)
    // const activeChat = localStorage.getItem('activeChat') 
    // const { data: id } = useGetMerchantIdQuery()
    // const merchantId = id.merchantId
    const merchantId = parseInt(secureLocalStorage.getItem('merchantId') as string)
    const chats = data?.chats


    useEffect(() => {
        const subscribeToNewChats = () => {
            subscribeToMore({
                document: ChatAddedDocument,
                // eslint-disable-next-line react-hooks/rules-of-hooks
                variables: { merchantId: merchantId },
                updateQuery: (prev, { subscriptionData }) => {
                    console.log("Adding the new chat to client subscription")
                    if (!subscriptionData.data) {
                        return prev;
                    }


                    console.log("SUBSCRIPTION DATA IN CHATLIST", subscriptionData)
                    const newChat = subscriptionData.data?.chatAdded
                    // console.log(newChat)
                    if (newChat?.messages?.slice(-1)[0]?.from_customer === true)
                        toast(newChat?.messages?.slice(-1)[0]?.text)

                    if (!prev?.chats?.find((chat) => chat?.id === newChat?.id)) {
                        console.log("Previous chats subscription", prev.chats)
                        console.log("adding  a new chat subscription", newChat)
                        return Object.assign({}, prev, {
                            chats: [newChat, ...prev?.chats!],
                        });
                    } else {
                        return prev
                    }
                }
            })
        }
        subscribeToNewChats()
    }, [merchantId, subscribeToMore])






    return (
        <div className="h-[79.5vh] max-w-full overflow-y-auto">
            {chats?.map(chat => (
                <Suspense key={chat?.id} fallback={<LoadingChatHeader />}>
                    <ChatComponent key={chat?.id} chat={chat as ChatType} activeChat={activeChat} />
                </Suspense>
            ))}
        </div>
    )
}

export default ChatList