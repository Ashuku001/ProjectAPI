import { ChatType, CustomerType } from "../../../../types";
import Customer from "@/app/components/Customer";
import ChatComponent from "./ChatComponent";

type Props = {
    customers?: (CustomerType)[] | null | undefined;
    chats?: (ChatType)[] | null
}

function CustomersList({ customers, chats }: Props) {

    return (
        <div className={`absolute top-0 right-[0] mx-auto px-2 bg-[#ffffff] dark:bg-gray-800 overflow-y-auto max-h-[70vh] w-full `}>
            {(customers || chats) && (
                <>
                    <div>
                        {chats?.length !== 0 && 
                            <div>
                                <h1 className="fond-bold text-center text-slate-400 text-[18px]">Chats</h1>
                                {chats?.map((chat) => (
                                    <ChatComponent key={chat?.id} chat={chat}/>
                                ))}
                            </div>
                        }
                    </div>
                    <div>
                        {customers?.length !== 0 &&
                            <div className="flex flex-col mt-4">
                                <h1 className="fond-bold text-center text-slate-400 text-[18px]">Customers</h1>
                                {customers?.map((customer) => (
                                    <Customer key={customer?.id} customer={customer} />
                                ))}
                            </div>
                        }
                    </div>
                </>
            )}
        </div>
    )
}

export default CustomersList