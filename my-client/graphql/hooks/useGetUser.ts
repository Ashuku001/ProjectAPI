import { UseSuspenseQueryResult, useSuspenseQuery } from "@apollo/client";
import { GetCurrentMerchantDocument } from "../../__gql__/graphql";
const useGetCurrentMerchant = () => {
    return useSuspenseQuery(GetCurrentMerchantDocument)
}

export default useGetCurrentMerchant