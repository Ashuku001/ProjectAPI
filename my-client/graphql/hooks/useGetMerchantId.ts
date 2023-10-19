import { gql, useQuery } from "@apollo/client";

export const GET_MERCHANTS_ID = gql`
    query GetMerchantId {
        merchantId @client
    }
`

export const useGetMerchantIdQuery = () => 
    useQuery(GET_MERCHANTS_ID)
