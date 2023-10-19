import ChatHeader from "../components/ChatHeader/ChatHeader"
import AddMessageChat from "@/app/chats/components/AddMessageChat"
import MessageList from "../components/MessageList"


type Props = {
    params: {
        chatId: string
    }
}


function ChatPage({ params: { chatId } }: Props) {
    const content =
        (<div className='right bg-[#F0EBE4] dark:bg-slate-900 flex flex-col'>
            <div className="right-upper bg-[#F0F2F5] dark:bg-slate-800 flex justify-between items-center px-4 py-[0.60rem]">
                <ChatHeader chatId={parseInt(chatId)} />
            </div>
            <div className="h-[68vh] overflow-y-auto">
                <MessageList id={parseInt(chatId)} />
            </div>
            <div className="right-bottom w-full top-full sticky flex justify-between items-center px-4 py-4 space-x-2 bg-slate-100 dark:bg-gray-800">
                <AddMessageChat chatId={parseInt(chatId)} />
            </div>
        </div>
        )

    return content
}

export default ChatPage