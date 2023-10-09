'use client'
import { GetSettingDocument } from "../../../../__gql__/graphql"
import { useSuspenseQuery } from "@apollo/client"

type Props = {
    params: {
        username: string
    }
}

function page({params: {username}}: Props) {
  const {data} =  useSuspenseQuery( GetSettingDocument)

  const setting = data.setting
  return (
    <div className='flex flex-col items-center justify-center h-full px-2'>
      <p className='text-2xl text-center font-sans'>
        use this callback URL to subscribe for webhooks in your whatsapp business account
      </p> 
      <br />
      <p className='text-3xl text-center font-sans'>
        {setting?.callBack_url}
      </p> 
    </div>
  )
}

export default page