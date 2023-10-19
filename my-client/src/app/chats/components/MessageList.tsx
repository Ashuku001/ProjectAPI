'use client'
import MessageComponent from "./MessageComponent"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { GetMessagesDocument, MessageAddedDocument } from "../../../../__gql__/graphql"
import { skipToken } from "@apollo/client"
import { useEffect, useState } from "react"
import { useReactiveVar } from "@apollo/client"
import { reactiveChatId } from "@/app/cache/cache"

type Props = {
  id: number
}

function MessageList({ id }: Props) {

  // when a new chat is created cause a rerender of this component
  let tempId = useReactiveVar(reactiveChatId)
  console.log("chat id in messages list%%%%%%%% reactivie chat", tempId, " and id chat id", id)

  const [chatId, setChatId] = useState(id);

  let messages = undefined;

  const { data, subscribeToMore } = useSuspenseQuery(
    GetMessagesDocument,
    (chatId && chatId > 1) ? { variables: { chatId: (chatId as number) } } : skipToken);
  messages = data?.chat?.messages


  useEffect(() => {
    const subscribeToNewMessaes = () => {
      subscribeToMore({
        document: MessageAddedDocument,
        variables: { chatId: chatId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev;
          }

          const newMessage = subscriptionData.data.messageAdded?.message
          // console.log("NEW MESSAGE IN PAGE", newMessage)
          if (newMessage) {
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
        }
      })
    }
    subscribeToNewMessaes()

    // id from props
    if(id > 0  && id !== undefined){
      setChatId(id)
    } else {
      // the new chat id
      setChatId(tempId)
    }

    return () => {
      setChatId(-100)
    }
  }, [subscribeToMore, chatId, id, tempId])


  return (
    <div className="px-2">
      {messages?.map((message) => (
        // @ts-ignore
        <MessageComponent message={message} key={message?.id} />
      ))}
    </div>
  )
}

export default MessageList

