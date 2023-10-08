const {Date} = require('./helpers/helpers.js')

const typeDefinitions = `#graqhql
    scalar Date
    # tell apollo server @auth can be used with queries, fields, and field definitions so that use it everywhere
    directive @auth on QUERY | FIELD_DEFINITION | FIELD

    type Merchant {
        id: Int
        business_name: String
        username: String!
        password: String
        email: String
        whatsapp_phone_number: String
        customers: [Customer]
        setting: [Setting]
        products: [Product]
        chats: [Chat]
    }
    type Customer {
        id: Int!
        whatsapp_name: String
        phone_number: String!
        first_name: String
        last_name: String
        merchant: Merchant!
    }
    type Chat {
        id: Int
        merchant: Merchant!
        customer: Customer!
        messages: [Message]!
        # messageFeed(cursor: String): MessageFeed
    }
    type Message {
        id: Int!
        chat: Chat!
        text: String!
        from_customer: Boolean
        timestamp: Int
        createdAt: Date
    }
    type MessageFeed {
        cursor: String! # The place in the list where we left off
        messages: [Message]! # A chuch
    }
    type Setting {
        APP_ID:String!
        APP_SECRET:String!
        PHONE_NUMBER_ID:String!
        BUSINESS_ACCOUNT_ID:String!
        ACCESS_TOKEN:String!
        API_VERSION:String!
        WEBHOOK_VERIFICATION_TOKEN:String!
        RECIPIENT_PHONE_NUMBER:String
    }
    type Product{
        name: String!
        price: Int!
        description: String!
        quantity: Int!
        merchant: Merchant!
    }
    type CusChatSearch {
        chats: [Chat]
        customers: [Customer]
    }
    type RootQuery {
        customers: [Customer] @auth
        customer(customerId: Int!): Customer
        chats: [Chat] @auth
        chat(chatId: Int!): Chat @auth
        setting(username: String!): Setting 
        products: [Product] @auth
        currentMerchant: Merchant @auth
        lastMessage(chatId: Int!): Message @auth
        customersSearch(page: Int, limit: Int, text: String!): CusChatSearch @auth
    }


    input CustomerInput {
        whatsapp_name: String!
        phone_number: String!
        first_name: String
        last_name: String
    }
    input ChatInput {
        merchant: Int!
        customer: Int!
    }
    input MessageInput{
        text: String!
        chatId: Int
        from_customer: Boolean!
        timestamp: String
    }
    input ParticipantsInput{
        mer_username: String!
        customer: CustomerInput!
    }
    input SettingInput {
        APP_ID:String
        APP_SECRET:String
        PHONE_NUMBER_ID:String
        BUSINESS_ACCOUNT_ID:String
        ACCESS_TOKEN:String
        API_VERSION:String
        WEBHOOK_VERIFICATION_TOKEN:String
        RECIPIENT_PHONE_NUMBER:String
    }
    input MerchantInput {
        business_name: String!
        username: String!
        password: String!
        email: String
        whatsapp_phone_number: String
    }
    input ProductInput {
        name: String
        price: Int
        description: String
        quantity: Int
    }
    type ReqNotification{
        notification: String!
    }
    type Auth {
        token: String
    }
    type Response {
        success: Boolean
    }

    type RootMutation {
        addCustomer (
            customer: CustomerInput!
        ): Customer
        addChat (
            chat: ChatInput!
        ): Chat
        addMessage (
            message: MessageInput!
            participants: ParticipantsInput
            customerId: Int
        ): Message
        addSetting (
            setting: SettingInput!
        ): Setting
        addProduct (
            product: ProductInput!
        ): Product
        loginMerchant (
            username: String!
            password: String!
        ): Auth
        signupMerchant (
            username: String!
            password: String!
            whatsapp_phone_number: String!
            email: String
        ): Auth
        logoutMerchant: Response
    }

    type ChatUpdatedType {
        message: Message
        chat: Chat 
    }

    type RootSubscription {
        chatAdded(merchantId: Int): Chat # when a new chat is created
        messageAdded(chatId: Int!): ChatUpdatedType  # the channel client to subscribe to messageAdded
    }

    schema {
        query: RootQuery
        mutation: RootMutation
        subscription: RootSubscription
    }
`;

module.exports = [typeDefinitions];