'use client'
import {
    useSuspenseQuery,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { GetChatsDocument, ChatAddedDocument, MessageAddedDocument } from "../../../../__gql__/graphql";
import ChatComponent from "./ChatComponent";
import { useEffect } from "react";

function ChatList() {
    const { data, subscribeToMore } = useSuspenseQuery(GetChatsDocument)
    const chats = data?.chats

    const subscribeToNewMessages = () => {
        subscribeToMore({
            document: MessageAddedDocument,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data || !(prev?.chats?.length)) {
                    return prev;
                }

                console.log("SUBSCRIPTION DATA IN CHATLIST", subscriptionData)
                const newChat = subscriptionData.data.messageAdded.chat


                if (!prev?.chats?.find((chat) => chat?.id === newChat?.id)) {
                    console.log("adding  a new chat", newChat)
                    return Object.assign({}, prev, {
                        chats: [newChat, ...prev?.chats],
                    });
                } else {
                    return prev
                }
            }
        })
    }

    useEffect(() => subscribeToNewMessages(), [chats])

    return (
        <div className="h-[79.5vh] max-w-full">
            {chats?.map(chat => (
                // @ts-ignore
                <ChatComponent key={chat?.id} chat={chat}/>
            ))}
        </div>
    )
}

export default ChatList