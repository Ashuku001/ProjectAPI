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
    "mutation AddMessage($message: MessageInput!, $customerId: Int) {\n  addMessage(message: $message, customerId: $customerId) {\n    __typename\n    id\n    from_customer\n    text\n    timestamp\n    createdAt\n    chat {\n      id\n    }\n  }\n}": types.AddMessageDocument,
    "query GetCustomerInfo($customerId: Int!) {\n  customer(customerId: $customerId) {\n    id\n    first_name\n    last_name\n    phone_number\n  }\n}": types.GetCustomerInfoDocument,
    "query GetCurrentMerchant {\n  currentMerchant {\n    id\n    business_name\n    username\n  }\n}": types.GetCurrentMerchantDocument,
    "query LastMessage($chatId: Int!) {\n  lastMessage(chatId: $chatId) {\n    id\n    text\n    createdAt\n    chat {\n      id\n      __typename\n    }\n    __typename\n  }\n}": types.LastMessageDocument,
    "mutation loginMerchant($username: String!, $password: String!) {\n  loginMerchant(username: $username, password: $password) {\n    token\n  }\n}": types.LoginMerchantDocument,
    "subscription messageAdded($chatId: Int!) {\n  messageAdded(chatId: $chatId) {\n    message {\n      id\n      text\n      from_customer\n      timestamp\n      createdAt\n      chat {\n        id\n        __typename\n      }\n      __typename\n    }\n    chat {\n      id\n    }\n  }\n}": types.MessageAddedDocument,
    "query GetMessages($chatId: Int!) {\n  chat(chatId: $chatId) {\n    id\n    customer {\n      id\n      first_name\n      last_name\n      phone_number\n      __typename\n    }\n    messages {\n      id\n      text\n      from_customer\n      timestamp\n      createdAt\n      chat {\n        id\n      }\n      __typename\n    }\n  }\n}": types.GetMessagesDocument,
    "mutation signupMerchant($username: String!, $password: String!, $email: String, $whatsapp_phone_number: String!) {\n  signupMerchant(\n    username: $username\n    password: $password\n    email: $email\n    whatsapp_phone_number: $whatsapp_phone_number\n  ) {\n    token\n  }\n}": types.SignupMerchantDocument,
    "subscription chatAdded($merchantId: Int) {\n  chatAdded(merchantId: $merchantId) {\n    id\n    messages {\n      id\n      text\n      __typename\n    }\n  }\n}": types.ChatAddedDocument,
    "query ChatsList {\n  chats {\n    id\n    customer {\n      id\n      first_name\n      last_name\n      phone_number\n      __typename\n    }\n  }\n}": types.ChatsListDocument,
    "query customersSearch($page: Int, $limit: Int, $text: String!) {\n  customersSearch(page: $page, limit: $limit, text: $text) {\n    customers {\n      id\n      first_name\n      last_name\n      phone_number\n      __typename\n    }\n    chats {\n      id\n      customer {\n        id\n        first_name\n        last_name\n        phone_number\n        __typename\n      }\n    }\n  }\n}": types.CustomersSearchDocument,
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
export function gql(source: "mutation AddMessage($message: MessageInput!, $customerId: Int) {\n  addMessage(message: $message, customerId: $customerId) {\n    __typename\n    id\n    from_customer\n    text\n    timestamp\n    createdAt\n    chat {\n      id\n    }\n  }\n}"): (typeof documents)["mutation AddMessage($message: MessageInput!, $customerId: Int) {\n  addMessage(message: $message, customerId: $customerId) {\n    __typename\n    id\n    from_customer\n    text\n    timestamp\n    createdAt\n    chat {\n      id\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetCustomerInfo($customerId: Int!) {\n  customer(customerId: $customerId) {\n    id\n    first_name\n    last_name\n    phone_number\n  }\n}"): (typeof documents)["query GetCustomerInfo($customerId: Int!) {\n  customer(customerId: $customerId) {\n    id\n    first_name\n    last_name\n    phone_number\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetCurrentMerchant {\n  currentMerchant {\n    id\n    business_name\n    username\n  }\n}"): (typeof documents)["query GetCurrentMerchant {\n  currentMerchant {\n    id\n    business_name\n    username\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query LastMessage($chatId: Int!) {\n  lastMessage(chatId: $chatId) {\n    id\n    text\n    createdAt\n    chat {\n      id\n      __typename\n    }\n    __typename\n  }\n}"): (typeof documents)["query LastMessage($chatId: Int!) {\n  lastMessage(chatId: $chatId) {\n    id\n    text\n    createdAt\n    chat {\n      id\n      __typename\n    }\n    __typename\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation loginMerchant($username: String!, $password: String!) {\n  loginMerchant(username: $username, password: $password) {\n    token\n  }\n}"): (typeof documents)["mutation loginMerchant($username: String!, $password: String!) {\n  loginMerchant(username: $username, password: $password) {\n    token\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "subscription messageAdded($chatId: Int!) {\n  messageAdded(chatId: $chatId) {\n    message {\n      id\n      text\n      from_customer\n      timestamp\n      createdAt\n      chat {\n        id\n        __typename\n      }\n      __typename\n    }\n    chat {\n      id\n    }\n  }\n}"): (typeof documents)["subscription messageAdded($chatId: Int!) {\n  messageAdded(chatId: $chatId) {\n    message {\n      id\n      text\n      from_customer\n      timestamp\n      createdAt\n      chat {\n        id\n        __typename\n      }\n      __typename\n    }\n    chat {\n      id\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetMessages($chatId: Int!) {\n  chat(chatId: $chatId) {\n    id\n    customer {\n      id\n      first_name\n      last_name\n      phone_number\n      __typename\n    }\n    messages {\n      id\n      text\n      from_customer\n      timestamp\n      createdAt\n      chat {\n        id\n      }\n      __typename\n    }\n  }\n}"): (typeof documents)["query GetMessages($chatId: Int!) {\n  chat(chatId: $chatId) {\n    id\n    customer {\n      id\n      first_name\n      last_name\n      phone_number\n      __typename\n    }\n    messages {\n      id\n      text\n      from_customer\n      timestamp\n      createdAt\n      chat {\n        id\n      }\n      __typename\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation signupMerchant($username: String!, $password: String!, $email: String, $whatsapp_phone_number: String!) {\n  signupMerchant(\n    username: $username\n    password: $password\n    email: $email\n    whatsapp_phone_number: $whatsapp_phone_number\n  ) {\n    token\n  }\n}"): (typeof documents)["mutation signupMerchant($username: String!, $password: String!, $email: String, $whatsapp_phone_number: String!) {\n  signupMerchant(\n    username: $username\n    password: $password\n    email: $email\n    whatsapp_phone_number: $whatsapp_phone_number\n  ) {\n    token\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "subscription chatAdded($merchantId: Int) {\n  chatAdded(merchantId: $merchantId) {\n    id\n    messages {\n      id\n      text\n      __typename\n    }\n  }\n}"): (typeof documents)["subscription chatAdded($merchantId: Int) {\n  chatAdded(merchantId: $merchantId) {\n    id\n    messages {\n      id\n      text\n      __typename\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query ChatsList {\n  chats {\n    id\n    customer {\n      id\n      first_name\n      last_name\n      phone_number\n      __typename\n    }\n  }\n}"): (typeof documents)["query ChatsList {\n  chats {\n    id\n    customer {\n      id\n      first_name\n      last_name\n      phone_number\n      __typename\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query customersSearch($page: Int, $limit: Int, $text: String!) {\n  customersSearch(page: $page, limit: $limit, text: $text) {\n    customers {\n      id\n      first_name\n      last_name\n      phone_number\n      __typename\n    }\n    chats {\n      id\n      customer {\n        id\n        first_name\n        last_name\n        phone_number\n        __typename\n      }\n    }\n  }\n}"): (typeof documents)["query customersSearch($page: Int, $limit: Int, $text: String!) {\n  customersSearch(page: $page, limit: $limit, text: $text) {\n    customers {\n      id\n      first_name\n      last_name\n      phone_number\n      __typename\n    }\n    chats {\n      id\n      customer {\n        id\n        first_name\n        last_name\n        phone_number\n        __typename\n      }\n    }\n  }\n}"];
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