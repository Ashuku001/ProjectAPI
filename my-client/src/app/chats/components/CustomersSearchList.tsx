import { ChatType, CustomerType } from "../../../../types";
import Customer from "./Customer";
import ChatComponent from "./ChatComponent";
import { useReactiveVar } from "@apollo/client";
import { useShowSearchList } from "@/app/cache/localStore";
import { useEffect } from 'react'

type Props = {
    customers?: (CustomerType)[] | null | undefined;
    chats?: (ChatType)[] | null;
}

function CustomersList({ customers, chats}: Props) {

    const show = useReactiveVar(useShowSearchList)[0]
    console.log("The search list display", show)
    let content = null

    if (customers || chats) {
        content = <>
            <div>
                {chats?.length !== 0 &&
                    <div>
                        <h1 className="fond-bold text-center text-slate-400 text-[18px]">Chats</h1>
                        {chats?.map((chat) => (
                            <ChatComponent key={chat?.id} chat={chat} />
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
    }

    const handleShow = (show: boolean) => {
        if (show) {
            document.addEventListener('click',
                handleShow.bind(null, !show), true);
        } else {
            document.removeEventListener('click',
                handleShow.bind(null, !show), true);
        }
        useShowSearchList([show]);
    }

    const showList = (customers: CustomerType[]) => {
        if (customers?.length) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    }

    useEffect(() => {
        showList(customers as CustomerType[]);
    }, [customers]);


    useEffect(() => {
        return () => {
            document.removeEventListener('click',
                handleShow.bind(null, !show), true);
        }
    });

    return (
        <div className={`absolute top-0 right-[0] mx-auto px-2 bg-[#ffffff] dark:bg-gray-800 overflow-y-auto max-h-[70vh] w-full ${show ? '' : 'hidden'}`}>
            {content}
        </div>
    )
}

export default CustomersList