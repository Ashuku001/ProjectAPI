import Image from "next/image"
import Link from "next/link"
import {  useEffect, useState } from "react"
import { ChatType, CustomerType } from "../../../../types";
import ChatComponent from "./ChatComponent";

type Props = {
    customers?: (CustomerType)[] | null | undefined;
    chats?: (ChatType)[] | null | undefined
}

function CustomersList({ customers, chats }: Props) {
    const [show, setShowList] = useState(false)

    const handleShow = (show: boolean) => {
        console.log("handling show", show)
        if (show) {
            document.addEventListener('click',
                handleShow.bind(null, !show), true);
            } else {
                document.removeEventListener('click',
                handleShow.bind(null, !show), true)
            }
            setShowList(show)
    }


    const showList = (customers: CustomerType[] | null | undefined) => {
        console.log("The search results",customers?.length)
        if (customers?.length || chats?.length) {
            handleShow(true)
        } else {
            handleShow(false)
        }
    }

    useEffect(() => {
        showList(customers)
    }, [])

    useEffect(() => {
        return () => {
            document.removeEventListener('click', handleShow.bind(null, !show), true)
        }
    })

    return (
        <div className={`absolute top-0 right-[0] mx-auto px-2 bg-[#ffffff] dark:bg-gray-800 overflow-y-auto max-h-[70vh] w-full ${show ? '' : 'hidden'}`}>
            {(chats || customers) && (
                <div>
                    {chats?.length !== 0 && (
                        <div className="flex flex-col items-center">
                            <h1 className="text-[18px] font-sans font-bold text-slate-400">Chats</h1>
                            {chats?.map(chat => <ChatComponent key={chat?.id} chat={chat} />)}
                        </div>
                    )}
                    {customers?.length !== 0 &&
                        <div className="flex flex-col mt-4">
                            <h1 className="text-[18px] font-sans font-bold text-slate-400 text-center">Customers</h1>
                            {customers?.map((customer) => (
                                <div className="flex flex-col" key={customer?.id}>
                                    <div>
                                        <Link
                                            className="flex items-center"
                                            href={{
                                                pathname: `/chats/${undefined}`,
                                                query: {
                                                    customer_id: customer?.id
                                                }
                                            }}
                                        >
                                            <div className="p-3">
                                                <Image
                                                    src={'/profile.jpg'}
                                                    height={40}
                                                    width={40}
                                                    alt='P'
                                                />
                                            </div>
                                            <h3 className="text-md font-sans font-normal line-clamp-1">
                                                <p className=' font-sans text-base capitalize'>{!(customer?.first_name && customer?.last_name)
                                                    ? customer?.phone_number
                                                    : `${customer?.first_name} ${"   "}  ${customer?.last_name}`
                                                }
                                                </p>
                                            </h3>
                                        </Link>
                                        <hr className="w-[85%] float-right bg-slate-700 dark:bg-gray-600"></hr>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            )}
        </div>
    )
}

export default CustomersList