import React from 'react'
type Props = {
    format: string
}
function DynamicHeader({ format }: Props) {
    switch (format) {
        case 'IMAGE':
            return <input className='flex flex-col space-y-2 w-full' type="file" />
        case 'DOCUMENT':
            return <input className='flex flex-col space-y-2 w-full' type="file" />
        case 'VIDEO':
            return <input className='flex flex-col space-y-2 w-full' type="file" />
        default:
            return null
    }
}

export default DynamicHeader