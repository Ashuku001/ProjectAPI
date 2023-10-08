import { Message } from "../../../../__gql__/graphql"

type Props = {
    message: Message
}

function MessageComponent({ message }: Props) {
    return (
        <div className='my-2 max-w-5xl flex flex-row text-black dark:text-white '>
            <div className={`px-3 py-2 rounded-lg w-[250px] md:w-[350px] lg:w-[500px ] ${message?.from_customer ? 'bg-gray-400 dark:bg-gray-800 mr-auto rounded-tl-none' : 'dark:bg-green-800 bg-green-600  ml-auto rounded-tr-none'} ${message?.id! < 0 ? 'bg-blue' : ''}`}>
                <p className="break-words">{message?.text}</p>
                <p className={`text-[0.65rem] italic text-gray-200 line-clamp-1 ${message?.from_customer ? 'text-left' : 'text-right'}`}>{new Date(message?.createdAt).toLocaleString()}</p>
            </div>
        </div>
    )
}

export default MessageComponent