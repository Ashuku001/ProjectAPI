"use client"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { GetCustomersDocument } from "../../../../__gql__/graphql"
import Customer from "@/app/components/Customer"
import { CustomerType } from "../../../../types"

function CustomersList() {
    const { data } = useSuspenseQuery(GetCustomersDocument)

    let customers = data.customers

    console.log("Customers in my-customers", customers)
    return (
        <div className="h-[79.5vh] max-w-full overflow-y-auto">
            {customers?.length !== 0
                ? <>
                    {customers?.map((customer) => (
                        <Customer key={customer?.id} customer={customer as CustomerType}/>
                    ))}
                </>
                : <div className="text-center">You have no customer data yet you can use the form above to add</div>
            }
        </div>
    )
}

export default CustomersList