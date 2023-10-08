
export type MerchantType = {
    id: int,
    username: string,
    business_name: string
}

type Links = "chats" | "My-templates" | "My-customers"

type Template = {
    name: string,
    components?: [[Object], [Object]],
    language: string,
    status: string,
    category: string,
    id: string
}

type MessageInputType = {
    messaging_product: string,
    preview_url: boolean,
    recipient_type: string,
    to: string,
    type: string,
    text: Text
}

type LoginFormProps = {
    changeLoginState: Dispatch<SetStateAction<boolean>>
}

type CustomerType = {
    __typename: "Customer";
    id?: number | null | undefined;
    first_name?: string | null | undefined;
    last_name?: string | null | undefined;
    phone_number: string;
} | null

type ChatType = {
    __typename?: "Chat" | undefined;
    id?: number | null | undefined;
    customer: {
        __typename: "Customer";
        id?: number | null | undefined;
        first_name?: string | null | undefined;
        last_name?: string | null | undefined;
        phone_number: string;
    };
} | null


type MessageType = {
    __typename: "Message";
    id: number;
    text: string;
    from_customer?: boolean | null | undefined;
    timestamp?: number | null | undefined;
    createdAt?: any;
    chat: {
        __typename?: "Chat" | undefined;
        id?: number | undefined;
    };
} | null