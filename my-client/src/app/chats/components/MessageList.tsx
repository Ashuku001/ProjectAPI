'use client'
import MessageComponent from "./MessageComponent"
import { MessageType } from '../../../../types'

type Props = {
  messages: MessageType[] | null | undefined

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

