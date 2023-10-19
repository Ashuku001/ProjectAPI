/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation AddCustomer($customer: CustomerInput!) {\n  addCustomer(customer: $customer) {\n    id\n    whatsapp_name\n    phone_number\n    first_name\n    last_name\n    __typename\n  }\n}": types.AddCustomerDocument,
    "mutation addChat($chat: ChatInput!) {\n  addChat(chat: $chat) {\n    id\n    customer {\n      id\n      whatsapp_name\n      phone_number\n      first_name\n      last_name\n      __typename\n    }\n    lastMessage {\n      id\n      createdAt\n      text\n      __typename\n    }\n    __typename\n  }\n}": types.AddChatDocument,
    "mutation AddMessage($message: MessageInput!, $customerId: Int) {\n  addMessage(message: $message, customerId: $customerId) {\n    __typename\n    id\n    from_customer\n    text\n    timestamp\n    createdAt\n    chat {\n      id\n      __typename\n    }\n  }\n}": types.AddMessageDocument,
    "mutation addSetting($setting: SettingInput!) {\n  addSetting(setting: $setting) {\n    callBack_url\n    ACCESS_TOKEN\n    APP_ID\n    APP_SECRET\n    PHONE_NUMBER_ID\n    BUSINESS_ACCOUNT_ID\n    ACCESS_TOKEN\n    API_VERSION\n    WEBHOOK_VERIFICATION_TOKEN\n    RECIPIENT_PHONE_NUMBER\n    __typename\n  }\n}": types.AddSettingDocument,
    "query CustomerChatSearch($page: Int, $limit: Int, $text: String!) {\n  customerChatSearch(page: $page, limit: $limit, text: $text) {\n    customers {\n      id\n      first_name\n      last_name\n      phone_number\n      __typename\n    }\n    chats {\n      id\n      customer {\n        id\n        first_name\n        last_name\n        phone_number\n        __typename\n      }\n      lastMessage {\n        id\n        createdAt\n        text\n        __typename\n      }\n      __typename\n    }\n  }\n}": types.CustomerChatSearchDocument,
    "query CustomersSearch($page: Int, $limit: Int, $text: String!) {\n  customersSearch(page: $page, limit: $limit, text: $text) {\n    id\n    first_name\n    last_name\n    phone_number\n    __typename\n  }\n}": types.CustomersSearchDocument,
    "query GetCustomers {\n  customers {\n    id\n    whatsapp_name\n    first_name\n    last_name\n    phone_number\n    __typename\n  }\n}": types.GetCustomersDocument,
    "query GetCusInChatInfo($chatId: Int!) {\n  chat(chatId: $chatId) {\n    customer {\n      id\n      first_name\n      last_name\n      phone_number\n      __typename\n    }\n  }\n}": types.GetCusInChatInfoDocument,
    "query GetCustomerInfo($customerId: Int!) {\n  customer(customerId: $customerId) {\n    id\n    first_name\n    last_name\n    phone_number\n    __typename\n  }\n}": types.GetCustomerInfoDocument,
    "query GetCurrentMerchant {\n  currentMerchant {\n    id\n    business_name\n    username\n    __typename\n  }\n}": types.GetCurrentMerchantDocument,
    "query GetSetting($username: String) {\n  setting(username: $username) {\n    callBack_url\n    APP_ID\n    APP_SECRET\n    PHONE_NUMBER_ID\n    BUSINESS_ACCOUNT_ID\n    ACCESS_TOKEN\n    API_VERSION\n    WEBHOOK_VERIFICATION_TOKEN\n    RECIPIENT_PHONE_NUMBER\n    __typename\n  }\n}": types.GetSettingDocument,
    "query LastMessage($chatId: Int!) {\n  lastMessage(chatId: $chatId) {\n    id\n    text\n    createdAt\n    chat {\n      id\n      __typename\n    }\n    __typename\n  }\n}": types.LastMessageDocument,
    "mutation loginMerchant($username: String!, $password: String!) {\n  loginMerchant(username: $username, password: $password) {\n    token\n    merchant {\n      id\n    }\n  }\n}": types.LoginMerchantDocument,
    "subscription messageAdded($chatId: Int!) {\n  messageAdded(chatId: $chatId) {\n    message {\n      id\n      text\n      from_customer\n      timestamp\n      createdAt\n      chat {\n        id\n        __typename\n      }\n      __typename\n    }\n  }\n}": types.MessageAddedDocument,
    "query GetMessages($chatId: Int!) {\n  chat(chatId: $chatId) {\n    id\n    customer {\n      id\n      first_name\n      last_name\n      phone_number\n      __typename\n    }\n    messages {\n      id\n      text\n      from_customer\n      timestamp\n      createdAt\n      chat {\n        id\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}": types.GetMessagesDocument,
    "mutation signupMerchant($username: String!, $password: String!, $email: String, $whatsapp_phone_number: String!) {\n  signupMerchant(\n    username: $username\n    password: $password\n    email: $email\n    whatsapp_phone_number: $whatsapp_phone_number\n  ) {\n    token\n  }\n}": types.SignupMerchantDocument,
    "subscription chatAdded($merchantId: Int!) {\n  chatAdded(merchantId: $merchantId) {\n    id\n    customer {\n      id\n      first_name\n      last_name\n      phone_number\n      __typename\n    }\n    messages {\n      id\n      text\n      from_customer\n      timestamp\n      createdAt\n      chat {\n        id\n      }\n      __typename\n    }\n    __typename\n  }\n}": types.ChatAddedDocument,
    "query GetChats {\n  chats {\n    id\n    customer {\n      id\n      first_name\n      last_name\n      phone_number\n      __typename\n    }\n    __typename\n  }\n}": types.GetChatsDocument,
    "fragment merchantFragment on Merchant {\n  username\n  business_name\n}": types.MerchantFragmentFragmentDoc,
    "fragment messageFragment on Message {\n  text\n  timestamp\n  from_customer\n  createdAt\n}": types.MessageFragmentFragmentDoc,
    "fragment customerFragment on Customer {\n  first_name\n  last_name\n  phone_number\n}": types.CustomerFragmentFragmentDoc,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation AddCustomer($customer: CustomerInput!) {\n  addCustomer(customer: $customer) {\n    id\n    whatsapp_name\n    phone_number\n    first_name\n    last_name\n    __typename\n  }\n}"): (typeof documents)["mutation AddCustomer($customer: CustomerInput!) {\n  addCustomer(customer: $customer) {\n    id\n    whatsapp_name\n    phone_number\n    first_name\n    last_name\n    __typename\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation addChat($chat: ChatInput!) {\n  addChat(chat: $chat) {\n    id\n    customer {\n      id\n      whatsapp_name\n      phone_number\n      first_name\n      last_name\n      __typename\n    }\n    lastMessage {\n      id\n      createdAt\n      text\n      __typename\n    }\n    __typename\n  }\n}"): (typeof documents)["mutation addChat($chat: ChatInput!) {\n  addChat(chat: $chat) {\n    id\n    customer {\n      id\n      whatsapp_name\n      phone_number\n      first_name\n      last_name\n      __typename\n    }\n    lastMessage {\n      id\n      createdAt\n      text\n      __typename\n    }\n    __typename\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation AddMessage($message: MessageInput!, $customerId: Int) {\n  addMessage(message: $message, customerId: $customerId) {\n    __typename\n    id\n    from_customer\n    text\n    timestamp\n    createdAt\n    chat {\n      id\n      __typename\n    }\n  }\n}"): (typeof documents)["mutation AddMessage($message: MessageInput!, $customerId: Int) {\n  addMessage(message: $message, customerId: $customerId) {\n    __typename\n    id\n    from_customer\n    text\n    timestamp\n    createdAt\n    chat {\n      id\n      __typename\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation addSetting($setting: SettingInput!) {\n  addSetting(setting: $setting) {\n    callBack_url\n    ACCESS_TOKEN\n    APP_ID\n    APP_SECRET\n    PHONE_NUMBER_ID\n    BUSINESS_ACCOUNT_ID\n    ACCESS_TOKEN\n    API_VERSION\n    WEBHOOK_VERIFICATION_TOKEN\n    RECIPIENT_PHONE_NUMBER\n    __typename\n  }\n}"): (typeof documents)["mutation addSetting($setting: SettingInput!) {\n  addSetting(setting: $setting) {\n    callBack_url\n    ACCESS_TOKEN\n    APP_ID\n    APP_SECRET\n    PHONE_NUMBER_ID\n    BUSINESS_ACCOUNT_ID\n    ACCESS_TOKEN\n    API_VERSION\n    WEBHOOK_VERIFICATION_TOKEN\n    RECIPIENT_PHONE_NUMBER\n    __typename\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query CustomerChatSearch($page: Int, $limit: Int, $text: String!) {\n  customerChatSearch(page: $page, limit: $limit, text: $text) {\n    customers {\n      id\n      first_name\n      last_name\n      phone_number\n      __typename\n    }\n    chats {\n      id\n      customer {\n        id\n        first_name\n        last_name\n        phone_number\n        __typename\n      }\n      lastMessage {\n        id\n        createdAt\n        text\n        __typename\n      }\n      __typename\n    }\n  }\n}"): (typeof documents)["query CustomerChatSearch($page: Int, $limit: Int, $text: String!) {\n  customerChatSearch(page: $page, limit: $limit, text: $text) {\n    customers {\n      id\n      first_name\n      last_name\n      phone_number\n      __typename\n    }\n    chats {\n      id\n      customer {\n        id\n        first_name\n        last_name\n        phone_number\n        __typename\n      }\n      lastMessage {\n        id\n        createdAt\n        text\n        __typename\n      }\n      __typename\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query CustomersSearch($page: Int, $limit: Int, $text: String!) {\n  customersSearch(page: $page, limit: $limit, text: $text) {\n    id\n    first_name\n    last_name\n    phone_number\n    __typename\n  }\n}"): (typeof documents)["query CustomersSearch($page: Int, $limit: Int, $text: String!) {\n  customersSearch(page: $page, limit: $limit, text: $text) {\n    id\n    first_name\n    last_name\n    phone_number\n    __typename\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetCustomers {\n  customers {\n    id\n    whatsapp_name\n    first_name\n    last_name\n    phone_number\n    __typename\n  }\n}"): (typeof documents)["query GetCustomers {\n  customers {\n    id\n    whatsapp_name\n    first_name\n    last_name\n    phone_number\n    __typename\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetCusInChatInfo($chatId: Int!) {\n  chat(chatId: $chatId) {\n    customer {\n      id\n      first_name\n      last_name\n      phone_number\n      __typename\n    }\n  }\n}"): (typeof documents)["query GetCusInChatInfo($chatId: Int!) {\n  chat(chatId: $chatId) {\n    customer {\n      id\n      first_name\n      last_name\n      phone_number\n      __typename\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetCustomerInfo($customerId: Int!) {\n  customer(customerId: $customerId) {\n    id\n    first_name\n    last_name\n    phone_number\n    __typename\n  }\n}"): (typeof documents)["query GetCustomerInfo($customerId: Int!) {\n  customer(customerId: $customerId) {\n    id\n    first_name\n    last_name\n    phone_number\n    __typename\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetCurrentMerchant {\n  currentMerchant {\n    id\n    business_name\n    username\n    __typename\n  }\n}"): (typeof documents)["query GetCurrentMerchant {\n  currentMerchant {\n    id\n    business_name\n    username\n    __typename\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetSetting($username: String) {\n  setting(username: $username) {\n    callBack_url\n    APP_ID\n    APP_SECRET\n    PHONE_NUMBER_ID\n    BUSINESS_ACCOUNT_ID\n    ACCESS_TOKEN\n    API_VERSION\n    WEBHOOK_VERIFICATION_TOKEN\n    RECIPIENT_PHONE_NUMBER\n    __typename\n  }\n}"): (typeof documents)["query GetSetting($username: String) {\n  setting(username: $username) {\n    callBack_url\n    APP_ID\n    APP_SECRET\n    PHONE_NUMBER_ID\n    BUSINESS_ACCOUNT_ID\n    ACCESS_TOKEN\n    API_VERSION\n    WEBHOOK_VERIFICATION_TOKEN\n    RECIPIENT_PHONE_NUMBER\n    __typename\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query LastMessage($chatId: Int!) {\n  lastMessage(chatId: $chatId) {\n    id\n    text\n    createdAt\n    chat {\n      id\n      __typename\n    }\n    __typename\n  }\n}"): (typeof documents)["query LastMessage($chatId: Int!) {\n  lastMessage(chatId: $chatId) {\n    id\n    text\n    createdAt\n    chat {\n      id\n      __typename\n    }\n    __typename\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation loginMerchant($username: String!, $password: String!) {\n  loginMerchant(username: $username, password: $password) {\n    token\n    merchant {\n      id\n    }\n  }\n}"): (typeof documents)["mutation loginMerchant($username: String!, $password: String!) {\n  loginMerchant(username: $username, password: $password) {\n    token\n    merchant {\n      id\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "subscription messageAdded($chatId: Int!) {\n  messageAdded(chatId: $chatId) {\n    message {\n      id\n      text\n      from_customer\n      timestamp\n      createdAt\n      chat {\n        id\n        __typename\n      }\n      __typename\n    }\n  }\n}"): (typeof documents)["subscription messageAdded($chatId: Int!) {\n  messageAdded(chatId: $chatId) {\n    message {\n      id\n      text\n      from_customer\n      timestamp\n      createdAt\n      chat {\n        id\n        __typename\n      }\n      __typename\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetMessages($chatId: Int!) {\n  chat(chatId: $chatId) {\n    id\n    customer {\n      id\n      first_name\n      last_name\n      phone_number\n      __typename\n    }\n    messages {\n      id\n      text\n      from_customer\n      timestamp\n      createdAt\n      chat {\n        id\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}"): (typeof documents)["query GetMessages($chatId: Int!) {\n  chat(chatId: $chatId) {\n    id\n    customer {\n      id\n      first_name\n      last_name\n      phone_number\n      __typename\n    }\n    messages {\n      id\n      text\n      from_customer\n      timestamp\n      createdAt\n      chat {\n        id\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation signupMerchant($username: String!, $password: String!, $email: String, $whatsapp_phone_number: String!) {\n  signupMerchant(\n    username: $username\n    password: $password\n    email: $email\n    whatsapp_phone_number: $whatsapp_phone_number\n  ) {\n    token\n  }\n}"): (typeof documents)["mutation signupMerchant($username: String!, $password: String!, $email: String, $whatsapp_phone_number: String!) {\n  signupMerchant(\n    username: $username\n    password: $password\n    email: $email\n    whatsapp_phone_number: $whatsapp_phone_number\n  ) {\n    token\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "subscription chatAdded($merchantId: Int!) {\n  chatAdded(merchantId: $merchantId) {\n    id\n    customer {\n      id\n      first_name\n      last_name\n      phone_number\n      __typename\n    }\n    messages {\n      id\n      text\n      from_customer\n      timestamp\n      createdAt\n      chat {\n        id\n      }\n      __typename\n    }\n    __typename\n  }\n}"): (typeof documents)["subscription chatAdded($merchantId: Int!) {\n  chatAdded(merchantId: $merchantId) {\n    id\n    customer {\n      id\n      first_name\n      last_name\n      phone_number\n      __typename\n    }\n    messages {\n      id\n      text\n      from_customer\n      timestamp\n      createdAt\n      chat {\n        id\n      }\n      __typename\n    }\n    __typename\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetChats {\n  chats {\n    id\n    customer {\n      id\n      first_name\n      last_name\n      phone_number\n      __typename\n    }\n    __typename\n  }\n}"): (typeof documents)["query GetChats {\n  chats {\n    id\n    customer {\n      id\n      first_name\n      last_name\n      phone_number\n      __typename\n    }\n    __typename\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment merchantFragment on Merchant {\n  username\n  business_name\n}"): (typeof documents)["fragment merchantFragment on Merchant {\n  username\n  business_name\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment messageFragment on Message {\n  text\n  timestamp\n  from_customer\n  createdAt\n}"): (typeof documents)["fragment messageFragment on Message {\n  text\n  timestamp\n  from_customer\n  createdAt\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment customerFragment on Customer {\n  first_name\n  last_name\n  phone_number\n}"): (typeof documents)["fragment customerFragment on Customer {\n  first_name\n  last_name\n  phone_number\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;