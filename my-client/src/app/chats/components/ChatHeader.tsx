import Image from 'next/image'

type Props = {
    customer: {
        __typename?: "Customer" | undefined;
        id?: number | null | undefined;
        first_name?: string | null | undefined;
        last_name?: string | null | undefined;
        phone_number: string;
    } | null | undefined
}

function ChatHeader({ customer }: Props) {
    return (
        <div className='flex justify-between items-center w-full cursor-pointer'>
            <div className='flex justify-between items-center space-x-4'>
                <Image
                    src={'/profile.jpg'}
                    height={45}
                    width={45}
                    alt='p'
                />
                <div className='flex flex-col'>
                    <p className='font-sans font-medium text-base line-clamp-1'>{(customer?.first_name || customer?.last_name)
                        ? `${customer?.first_name} ${"   "}  ${customer?.last_name}`
                        : customer?.phone_number
                    }
                    </p>
                    <p className='font-sans font-medium text-base line-clamp-1'>Online status see how?</p>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div className="w-[40px] h-[40px] flex justify-center items-center ">
                    <svg viewBox="0 0 24 24" width="24" height="24" className=""><path fill="#54656F" d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"></path></svg>
                </div>
                <div className="w-[40px] h-[40px] flex justify-center items-center">
                    <svg viewBox="0 0 24 24" width="24" height="24" className=""><path fill="#54656F" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
                </div>
            </div>
        </div>
    )
}

export default ChatHeader