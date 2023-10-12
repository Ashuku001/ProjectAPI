"use client"
import Customer from "@/app/components/Customer"
import { CustomerType } from "../../../../types"

type Props = {
    customers?: (CustomerType)[] | null | undefined;
}

function CustomersSearchList({ customers }: Props) {
    return (
        <div className="h-[79.5vh] max-w-full overflow-y-auto">
            {customers?.length !== 0
                ? <>
                    {customers?.map((customer) => (
                        <Customer key={customer?.id} customer={customer as CustomerType} />
                    ))}
                </>
                : <div className="text-center">You have no customer data yet you can use the form above to add</div>
            }
        </div>
    )
}

export default CustomersSearchList