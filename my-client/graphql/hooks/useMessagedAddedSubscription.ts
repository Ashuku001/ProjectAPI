import { useSubscription } from "@apollo/client";
import { MessageAddedDocument } from "../../__gql__/graphql";

export const useMessageAddedSubscription = (options) => 
    useSubscription(MessageAddedDocument, options)