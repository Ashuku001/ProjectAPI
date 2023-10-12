import Image from "next/image"
import { CustomerType } from "../../../types"
import Link from "next/link"

type Props = {
    customer: CustomerType
}


function Customer({customer}:Props) {
    
    return (
        <div className="flex flex-col">
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
    )
}

export default Customer