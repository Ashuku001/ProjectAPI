'use client'
import { GetSettingDocument } from "../../../__gql__/graphql"
import { useSuspenseQuery } from "@apollo/client"
import WebhookConfiguration from "./components/WebhookConfiguration"
import { SettingType } from "../../../types"

function Page() {
  const { data } = useSuspenseQuery(GetSettingDocument, {
    fetchPolicy: "no-cache"
  })

  const setting = data.setting
  return (
    <div className='flex flex-col items-center justify-center h-full px-2'>
      {setting
        ? <WebhookConfiguration setting={setting as SettingType} />
        : <>
          <p className='text-2xl text-center font-sans'>
            You need a webhook end point so that you can see conversations of your customers to you
          </p>
          <br />
          <p className='text-3xl text-center font-sans'>
            To get a webhook endpoint fill and submit the form
          </p>
        </>
      }

    </div>
  )
}

export default Page