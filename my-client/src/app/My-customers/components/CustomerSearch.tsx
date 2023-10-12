'use client'
import { ChangeEvent, useState, Suspense } from 'react'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { CustomersSearchDocument } from '../../../../__gql__/graphql'
import { skipToken } from '@apollo/client'
import LoadingComponent from '@/app/components/LoadingComponent'
import { ArrowLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import CustomersSearchList from './CustomersSearchList'

function ChatSearchBar() {
    const [searchString, setSearchString] = useState('')
    const { data, } = useSuspenseQuery(CustomersSearchDocument,
        searchString.length > 2 ? { variables: { page: 0, limit: 5, text: searchString } } : skipToken)

    const customers = data?.customersSearch
    console.log(customers)

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
                    placeholder="Search for a customer"
                    type="text"
                    value={searchString}
                    onChange={handleChange}
                />
            </div>
            {(customers) &&
                <div className='relative w-[300px] md:w-[350px]'>
                    <Suspense fallback={<LoadingComponent />}>
                        <CustomersSearchList customers={customers}  />
                    </Suspense>
                </div>
            }
        </div>
    )
}

export default ChatSearchBar
