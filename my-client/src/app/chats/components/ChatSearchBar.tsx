'use client'
import { ChangeEvent, useState, Suspense } from 'react'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { useQuery, useLazyQuery } from '@apollo/client'
import { CustomerChatSearchDocument } from '../../../../__gql__/graphql'
import { skipToken } from '@apollo/client'
import CustomersList from './CustomersSearchList'
import LoadingComponent from '@/app/components/LoadingComponent'
import { ArrowLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

function ChatSearchBar() {
    const [searchString, setSearchString] = useState('')
    const [getCusChats, { loading, error, data }] = useLazyQuery(CustomerChatSearchDocument)
    // const { data } = useQuery(CustomerChatSearchDocument,
    //     searchString.length > 2 ? { variables: { page: 0, limit: 5, text: searchString } } : skipToken)

    const customers = data?.customerChatSearch?.customers
    const chats = data?.customerChatSearch?.chats

    // make a fetch call to render the search results
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setSearchString(e.target.value)
    }

    return (
        <div className="lower-nav px-4 py-2 flex flex-col items-center relative  border-r-1">
            <div className="flex justify-between items-center w-full">
                <div className="absolute left-5 w-6 h-6">
                    {searchString
                        ? <ArrowLeftIcon onClick={e => setSearchString('')} className='hover:text-green-500 text-green-600 corsor-pointer' />
                        :
                        <MagnifyingGlassIcon />
                    }
                </div>
                <input className="outline-none bg-[#F0F2F5] rounded-md pl-8 py-1 w-full mr-2 dark:bg-gray-700 text-ellipsis"
                    placeholder="Search or start new chat"
                    type="text"
                    value={searchString}
                    onChange={e => {
                        e.preventDefault()
                        setSearchString(e.target.value)
                        if (searchString.length > 2) {
                            getCusChats({ variables: { page: 0, limit: 5, text: searchString } })
                        }
                    }}
                />
                <div className="w-[40px] h-[40px] flex items-center">
                    <svg viewBox="0 0 24 24" width="20" height="20" preserveAspectRatio="xMidYMid meet"
                        className="relative">
                        <path fill="#54656F" d="M10 18.1h4v-2h-4v2zm-7-12v2h18v-2H3zm3 7h12v-2H6v2z"></path>
                    </svg>
                </div>
            </div>
            {(customers || chats || loading || error) &&
                <div className='relative w-[300px] md:w-[350px]'>
                    {loading && <LoadingComponent />}
                    {error && <p className='text-center'>{error.message}</p>}
                    <CustomersList customers={customers} chats={chats} />
                </div>
            }
        </div>
    )
}

export default ChatSearchBar
