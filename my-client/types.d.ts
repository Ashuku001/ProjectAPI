
export type MerchantType = {
    id: int,
    username: string,
    business_name: string
}

type Links = "chats" | "My-templates" | "My-customers" | "Settings" | "Bulk-messaging"

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
    id: number;
    first_name?: string | null | undefined;
    last_name?: string | null | undefined;
    phone_number?: string | null | undefined;
} | null


type ChatAddedType = {
    __typename?: "Chat" | undefined;
    id?: number | null | undefined;
    customer: {
        __typename: "Customer";
        id: number;
        first_name?: string | null | undefined;
        last_name?: string | null | undefined;
        phone_number: string;
    };
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
    lastMessage?: {
        __typename?: "Message" | undefined;
        id?: number | undefined;
        text: string;
        createdAt?: any | null;
    } | null | undefined;
} | null | undefined


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

type SettingType = {
    __typename?: "Setting" | undefined;
    callBack_url: string;
    APP_ID: string;
    APP_SECRET: string;
    PHONE_NUMBER_ID: string;
    BUSINESS_ACCOUNT_ID: string;
    ACCESS_TOKEN: string;
    API_VERSION: string;
    WEBHOOK_VERIFICATION_TOKEN: string;
    RECIPIENT_PHONE_NUMBER?: string | undefined;
} | null | undefined

type RemoteTemplateObj = {
    category: string;
    name: string;
    language: string;
    status: string;
    id: string;
    components: ComponentObj[]
}

interface PreviewObj {
    HEADER?: PrevContent;
    BODY?: PrevContent;
    FOOTER?: PrevContent;
    BUTTONS?: PrevContent;
}

interface PrevContent {
    static?: StaticInput;
    dynamic?: DynamicContent
    buttons?: StaticButton
}

interface StaticContent {
    [key: string]: any
}

interface StaticInput {
    type?: string;
    format?: string;
    content?: StaticContent;
}

interface StaticButton {
    type: string;
    [key: string]: any
}

interface DynamicContent {
    type?: string;
    format?: string;
    content?: StaticContent;
    inputs?: InputElement[]
}

interface ComponentObj {
    [key: string]: any
    type: string
}

interface InputElement {
    type: string;
    placeholder?: string;
}

type AddMessageType = {
    __typename: "Message";
    id: number;
    from_customer: boolean;
    text: string;
    timestamp: number;
    createdAt: any;
    chat: {
        __typename: "Chat";
        id: number;
    };
} | null | undefined