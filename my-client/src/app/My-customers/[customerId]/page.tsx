'use client'
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { GetCustomerInfoDocument } from "../../../../__gql__/graphql"
import { skipToken } from "@apollo/client"

type Props = {
    params: {
        customerId: string
    }
}

function page({ params: { customerId } }: Props) {

    const { data } = useSuspenseQuery(
        GetCustomerInfoDocument,
        customerId ? { variables: { customerId: parseInt(customerId) } } : skipToken
    )
    const customer = data?.customer
    console.log(customer)
    return (
        <div className='right bg-[#F0EBE4] dark:bg-slate-900 flex flex-col min-h-full'>
            <div>
                <h1>Personal information</h1>
                <div>
                    <div>Name: <span>{customer?.first_name}</span>
                        <span>{customer?.last_name}</span></div>
                    <div>Phone number: <span>{customer?.phone_number}</span></div>

                </div>
            </div>
            <div>
                We will have customers past history here
            </div>
        </div>
    )
}

export default page