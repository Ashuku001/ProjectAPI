'use client'
import { GetCurrentMerchantDocument } from "../../../__gql__/graphql"
import { useSuspenseQuery } from "@apollo/client"
import LogoutBtn from "./LogoutBtn"
import { useMerchantId } from "../cache/localStore"

function MerchantsLogo() {
  const { data } = useSuspenseQuery(GetCurrentMerchantDocument)

  if(data.currentMerchant?.username){
    // set the global merchant id to be used to subscribed to new chat events
    useMerchantId([data?.currentMerchant?.id!])
    console.log("Logged in merchant Id", useMerchantId()[0])
  }
  return (
    <div>
      <h1 className='font-bold font-serif text-3xl'>{data?.currentMerchant?.business_name ? data?.currentMerchant?.business_name : data?.currentMerchant?.username}</h1>
      {/* <LogoutBtn/> */}
    </div>
  )
}

export default MerchantsLogo