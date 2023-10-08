'use client'
import { GetCurrentMerchantDocument } from "../../../__gql__/graphql"
import { useSuspenseQuery } from "@apollo/client"
import LogoutBtn from "./LogoutBtn"
import { LoginFormProps } from "../../../types"


function MerchantsLogo() {
  const { data } = useSuspenseQuery(GetCurrentMerchantDocument)
  return (
    <div>
      <h1 className='font-bold font-serif text-3xl'>{data?.currentMerchant?.business_name ? data?.currentMerchant?.business_name : data?.currentMerchant?.username}</h1>
      {/* <LogoutBtn/> */}
    </div>
  )
}

export default MerchantsLogo