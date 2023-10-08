'use client'
import { ChangeEvent, useState, Suspense } from 'react'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { CustomersSearchDocument } from '../../../../__gql__/graphql'
import { skipToken } from '@apollo/client'
import CustomersList from './CustomersSearchList'
import LoadingComponent from '@/app/components/LoadingComponent'

function ChatSearchBar() {
    const [searchString, setSearchString] = useState('')
    const { data,  } = useSuspenseQuery(CustomersSearchDocument,
        searchString.length > 3 ? { variables: { page: 0, limit: 5, text: searchString } } : skipToken)

    // console.log("Customers search",data)
    const customers = data?.customersSearch?.customers
    const chats = data?.customersSearch?.chats

    // make a fetch call to render the search results
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setSearchString(e.target.value)
    }

    return (
        <div className="lower-nav px-4 py-2 flex flex-col items-center relative ">
            <div className="flex justify-between items-center w-full">
                <svg viewBox="0 0 24 24" width="24" height="24" className="absolute left-10">
                    <path fill="#54656F"
                        d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z">
                    </path>
                </svg>
                <input className="outline-none bg-[#F0F2F5] rounded-md pl-16 py-1 w-full mr-2 dark:bg-gray-700"
                    placeholder="Search or start new chat"
                    type="text"
                    value={searchString}
                    onChange={handleChange}
                />
                <div className="w-[40px] h-[40px] lg:flex justify-center items-center hidden">
                    <svg viewBox="0 0 24 24" width="20" height="20" preserveAspectRatio="xMidYMid meet"
                        className="relative">
                        <path fill="#54656F" d="M10 18.1h4v-2h-4v2zm-7-12v2h18v-2H3zm3 7h12v-2H6v2z"></path>
                    </svg>
                </div>
            </div>
            <div className='relative w-[300px] md:w-[350px]'>
                <Suspense fallback={<LoadingComponent/>}>
                    <CustomersList customers={customers} chats={chats} setSearchString={setSearchString} />
                </Suspense>
            </div>
        </div>
    )
}

export default ChatSearchBar
