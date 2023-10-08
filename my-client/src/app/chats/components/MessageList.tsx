'use client'
import { useEffect } from 'react'
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import MessageComponent from "./MessageComponent"
import { GetMessagesDocument } from "../../../../__gql__/graphql"
import { skipToken } from "@apollo/client"
import { MessageAddedDocument } from "../../../../__gql__/graphql"

type Props = {
  messages: ({
    __typename?: "Message" | undefined;
    id?: number | null | undefined;
    text: string;
    from_customer: boolean;
    timestamp?: any;
    createdAt?: any;
  } | null) [] | undefined

}

function MessageList({ messages }: Props) {

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

