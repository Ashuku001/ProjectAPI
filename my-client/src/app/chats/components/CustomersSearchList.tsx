import { ChatType, CustomerType } from "../../../../types";
import Customer from "./Customer";
import ChatSearchComponent from "./ChatSearchComponent";
import { useReactiveVar } from "@apollo/client";
import { useShowSearchList } from "@/app/cache/cache";
import { useEffect, useCallback } from 'react'

type Props = {
    customers?: (CustomerType)[] | null | undefined;
    chats?: (ChatType)[] | null;
}

function CustomersList({ customers, chats }: Props) {

    const show = useReactiveVar(useShowSearchList)
    console.log("The search list display", useShowSearchList())
    let content = null

    const handleShow = useCallback((show: boolean) => {
        if (show) {
            document.addEventListener('click',
                handleShow.bind(null, !show), true);
        } else {
            document.removeEventListener('click',
                handleShow.bind(null, !show), true);
        }
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useShowSearchList(show);
    }, [])

    useEffect(() => {
        const showList = (customers: CustomerType[]) => {
            if (customers?.length || chats?.length) {
                handleShow(true);
            } else {
                handleShow(false);
            }
        }

        showList(customers as CustomerType[]);
    }, [customers?.length, chats?.length, customers, handleShow]);


    useEffect(() => {
        return () => {
            document.removeEventListener('click',
                handleShow.bind(null, !show), true);
        }
    });


    if (customers || chats) {
        content = <>
            <div>
                {chats?.length !== 0 &&
                    <div>
                        <h1 className="fond-bold text-center text-slate-400 text-[18px]">Chats</h1>
                        {chats?.map((chat) => (
                            <ChatSearchComponent key={chat?.id} chat={chat} />
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

    return (
        // <div className={` ${useShowSearchList() ? 'translate-y-0' : '-translate-y-full'} ease-in-out duration-300`}>
        <div className={` ${useShowSearchList() ? '' : ' hidden'}  transition-all ease-in-out duration-1000 h-[79.5vh]`}>
            {content}
        </div>
    )
}

export default CustomersList