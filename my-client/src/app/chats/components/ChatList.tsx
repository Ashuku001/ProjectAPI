'use client'
import {
    useSuspenseQuery,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { GetChatsDocument, ChatAddedDocument } from "../../../../__gql__/graphql";
import ChatComponent from "./ChatComponent";
import { useEffect } from "react";
import { useMerchantId } from "@/app/cache/localStore";

function ChatList() {
    const { data, subscribeToMore } = useSuspenseQuery(GetChatsDocument)
    const chats = data?.chats
    const merchantId = (useMerchantId()[0] as number)

    if (merchantId) {
        const subscribeToNewChats = () => {
            subscribeToMore({
                document: ChatAddedDocument,
                variables: { merchantId: (useMerchantId()[0] as number) },
                updateQuery: (prev, { subscriptionData }) => {
                    console.log("Adding the new chat to client")
                    if (!subscriptionData.data) {
                        return prev;
                    }


                    console.log("SUBSCRIPTION DATA IN CHATLIST", subscriptionData)
                    const newChat = subscriptionData.data?.chatAdded
                    // console.log(newChat)

                    if (!prev?.chats?.find((chat) => chat?.id === newChat?.id)) {
                        console.log("Previous chats", prev.chats)
                        console.log("adding  a new chat", newChat)
                        return Object.assign({}, prev, {
                            chats: [newChat, ...prev?.chats!],
                        });
                    } else {
                        return prev
                    }
                }
            })
        }
        useEffect(() => subscribeToNewChats(), [chats])
    }



    return (
        <div className="h-[79.5vh] max-w-full overflow-y-auto">
            {chats?.map(chat => (
                // @ts-ignore
                <ChatComponent key={chat?.id} chat={chat} />
            ))}
        </div>
    )
}

export default ChatList