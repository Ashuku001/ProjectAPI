/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type Auth = {
  __typename?: 'Auth';
  token?: Maybe<Scalars['String']['output']>;
};

export type Chat = {
  __typename?: 'Chat';
  customer: Customer;
  id?: Maybe<Scalars['Int']['output']>;
  merchant: Merchant;
  messages: Array<Maybe<Message>>;
};

export type ChatInput = {
  customer: Scalars['Int']['input'];
  merchant?: InputMaybe<Scalars['Int']['input']>;
};

export type ChatUpdatedType = {
  __typename?: 'ChatUpdatedType';
  chat?: Maybe<Chat>;
  message?: Maybe<Message>;
};

export type CusChatSearch = {
  __typename?: 'CusChatSearch';
  chats?: Maybe<Array<Maybe<Chat>>>;
  customers?: Maybe<Array<Maybe<Customer>>>;
};

export type Customer = {
  __typename?: 'Customer';
  first_name?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  last_name?: Maybe<Scalars['String']['output']>;
  merchant: Merchant;
  phone_number: Scalars['String']['output'];
  whatsapp_name?: Maybe<Scalars['String']['output']>;
};

export type CustomerInput = {
  first_name?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  phone_number: Scalars['String']['input'];
  whatsapp_name: Scalars['String']['input'];
};

export type Merchant = {
  __typename?: 'Merchant';
  business_name?: Maybe<Scalars['String']['output']>;
  chats?: Maybe<Array<Maybe<Chat>>>;
  customers?: Maybe<Array<Maybe<Customer>>>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  products?: Maybe<Array<Maybe<Product>>>;
  setting?: Maybe<Array<Maybe<Setting>>>;
  username: Scalars['String']['output'];
  whatsapp_phone_number?: Maybe<Scalars['String']['output']>;
};

export type MerchantInput = {
  business_name: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
  whatsapp_phone_number?: InputMaybe<Scalars['String']['input']>;
};

export type Message = {
  __typename?: 'Message';
  chat: Chat;
  createdAt?: Maybe<Scalars['Date']['output']>;
  from_customer?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['Int']['output']>;
};

export type MessageFeed = {
  __typename?: 'MessageFeed';
  cursor: Scalars['String']['output'];
  messages: Array<Maybe<Message>>;
};

export type MessageInput = {
  chatId?: InputMaybe<Scalars['Int']['input']>;
  from_customer: Scalars['Boolean']['input'];
  text: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['String']['input']>;
};

export type ParticipantsInput = {
  customer: CustomerInput;
  mer_username: Scalars['String']['input'];
};

export type Product = {
  __typename?: 'Product';
  description: Scalars['String']['output'];
  merchant: Merchant;
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  quantity: Scalars['Int']['output'];
};

export type ProductInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type ReqNotification = {
  __typename?: 'ReqNotification';
  notification: Scalars['String']['output'];
};

export type Response = {
  __typename?: 'Response';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type RootMutation = {
  __typename?: 'RootMutation';
  addChat?: Maybe<Chat>;
  addCustomer?: Maybe<Customer>;
  addMessage?: Maybe<Message>;
  addProduct?: Maybe<Product>;
  addSetting?: Maybe<Setting>;
  loginMerchant?: Maybe<Auth>;
  logoutMerchant?: Maybe<Response>;
  signupMerchant?: Maybe<Auth>;
};


export type RootMutationAddChatArgs = {
  chat: ChatInput;
};


export type RootMutationAddCustomerArgs = {
  customer: CustomerInput;
};


export type RootMutationAddMessageArgs = {
  customerId?: InputMaybe<Scalars['Int']['input']>;
  message: MessageInput;
  participants?: InputMaybe<ParticipantsInput>;
};


export type RootMutationAddProductArgs = {
  product: ProductInput;
};


export type RootMutationAddSettingArgs = {
  setting: SettingInput;
};


export type RootMutationLoginMerchantArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type RootMutationSignupMerchantArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
  whatsapp_phone_number: Scalars['String']['input'];
};

export type RootQuery = {
  __typename?: 'RootQuery';
  chat?: Maybe<Chat>;
  chats?: Maybe<Array<Maybe<Chat>>>;
  currentMerchant?: Maybe<Merchant>;
  customer?: Maybe<Customer>;
  customerChatSearch?: Maybe<CusChatSearch>;
  customers?: Maybe<Array<Maybe<Customer>>>;
  customersSearch?: Maybe<Array<Maybe<Customer>>>;
  lastMessage?: Maybe<Message>;
  products?: Maybe<Array<Maybe<Product>>>;
  setting?: Maybe<Setting>;
};


export type RootQueryChatArgs = {
  chatId: Scalars['Int']['input'];
};


export type RootQueryCustomerArgs = {
  customerId: Scalars['Int']['input'];
};


export type RootQueryCustomerChatSearchArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  text: Scalars['String']['input'];
};


export type RootQueryCustomersSearchArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  text: Scalars['String']['input'];
};


export type RootQueryLastMessageArgs = {
  chatId: Scalars['Int']['input'];
};


export type RootQuerySettingArgs = {
  username?: InputMaybe<Scalars['String']['input']>;
};

export type RootSubscription = {
  __typename?: 'RootSubscription';
  chatAdded?: Maybe<Chat>;
  messageAdded?: Maybe<ChatUpdatedType>;
};


export type RootSubscriptionChatAddedArgs = {
  merchantId?: InputMaybe<Scalars['Int']['input']>;
};


export type RootSubscriptionMessageAddedArgs = {
  chatId: Scalars['Int']['input'];
};

export type Setting = {
  __typename?: 'Setting';
  ACCESS_TOKEN: Scalars['String']['output'];
  API_VERSION: Scalars['String']['output'];
  APP_ID: Scalars['String']['output'];
  APP_SECRET: Scalars['String']['output'];
  BUSINESS_ACCOUNT_ID: Scalars['String']['output'];
  PHONE_NUMBER_ID: Scalars['String']['output'];
  RECIPIENT_PHONE_NUMBER?: Maybe<Scalars['String']['output']>;
  WEBHOOK_VERIFICATION_TOKEN: Scalars['String']['output'];
  callBack_url: Scalars['String']['output'];
};

export type SettingInput = {
  ACCESS_TOKEN?: InputMaybe<Scalars['String']['input']>;
  API_VERSION?: InputMaybe<Scalars['String']['input']>;
  APP_ID?: InputMaybe<Scalars['String']['input']>;
  APP_SECRET?: InputMaybe<Scalars['String']['input']>;
  BUSINESS_ACCOUNT_ID?: InputMaybe<Scalars['String']['input']>;
  PHONE_NUMBER_ID?: InputMaybe<Scalars['String']['input']>;
  RECIPIENT_PHONE_NUMBER?: InputMaybe<Scalars['String']['input']>;
  WEBHOOK_VERIFICATION_TOKEN?: InputMaybe<Scalars['String']['input']>;
  callBack_url?: InputMaybe<Scalars['String']['input']>;
};

export type AddCustomerMutationVariables = Exact<{
  customer: CustomerInput;
}>;


export type AddCustomerMutation = { __typename?: 'RootMutation', addCustomer?: { __typename?: 'Customer', whatsapp_name?: string | null, phone_number: string, first_name?: string | null, last_name?: string | null } | null };

export type AddChatMutationVariables = Exact<{
  chat: ChatInput;
}>;


export type AddChatMutation = { __typename?: 'RootMutation', addChat?: { __typename: 'Chat', id?: number | null, customer: { __typename: 'Customer', id: number, whatsapp_name?: string | null, phone_number: string, first_name?: string | null, last_name?: string | null }, messages: Array<{ __typename?: 'Message', id?: number | null, from_customer?: boolean | null, text?: string | null, timestamp?: number | null, createdAt?: any | null, chat: { __typename?: 'Chat', id?: number | null } } | null> } | null };

export type AddMessageMutationVariables = Exact<{
  message: MessageInput;
  customerId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AddMessageMutation = { __typename?: 'RootMutation', addMessage?: { __typename: 'Message', id?: number | null, from_customer?: boolean | null, text?: string | null, timestamp?: number | null, createdAt?: any | null, chat: { __typename?: 'Chat', id?: number | null } } | null };

export type AddSettingMutationVariables = Exact<{
  setting: SettingInput;
}>;


export type AddSettingMutation = { __typename?: 'RootMutation', addSetting?: { __typename?: 'Setting', callBack_url: string, ACCESS_TOKEN: string, APP_ID: string, APP_SECRET: string, PHONE_NUMBER_ID: string, BUSINESS_ACCOUNT_ID: string, API_VERSION: string, WEBHOOK_VERIFICATION_TOKEN: string, RECIPIENT_PHONE_NUMBER?: string | null } | null };

export type CustomerChatSearchQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  text: Scalars['String']['input'];
}>;


export type CustomerChatSearchQuery = { __typename?: 'RootQuery', customerChatSearch?: { __typename?: 'CusChatSearch', customers?: Array<{ __typename: 'Customer', id: number, first_name?: string | null, last_name?: string | null, phone_number: string } | null> | null, chats?: Array<{ __typename?: 'Chat', id?: number | null, customer: { __typename: 'Customer', id: number, first_name?: string | null, last_name?: string | null, phone_number: string } } | null> | null } | null };

export type CustomersSearchQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  text: Scalars['String']['input'];
}>;


export type CustomersSearchQuery = { __typename?: 'RootQuery', customersSearch?: Array<{ __typename: 'Customer', id: number, first_name?: string | null, last_name?: string | null, phone_number: string } | null> | null };

export type GetCustomersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomersQuery = { __typename?: 'RootQuery', customers?: Array<{ __typename?: 'Customer', id: number, whatsapp_name?: string | null, first_name?: string | null, last_name?: string | null, phone_number: string } | null> | null };

export type GetCustomerInfoQueryVariables = Exact<{
  customerId: Scalars['Int']['input'];
}>;


export type GetCustomerInfoQuery = { __typename?: 'RootQuery', customer?: { __typename?: 'Customer', id: number, first_name?: string | null, last_name?: string | null, phone_number: string } | null };

export type GetCurrentMerchantQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentMerchantQuery = { __typename?: 'RootQuery', currentMerchant?: { __typename?: 'Merchant', id?: number | null, business_name?: string | null, username: string } | null };

export type GetSettingQueryVariables = Exact<{
  username?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetSettingQuery = { __typename?: 'RootQuery', setting?: { __typename?: 'Setting', callBack_url: string, APP_ID: string, APP_SECRET: string, PHONE_NUMBER_ID: string, BUSINESS_ACCOUNT_ID: string, ACCESS_TOKEN: string, API_VERSION: string, WEBHOOK_VERIFICATION_TOKEN: string, RECIPIENT_PHONE_NUMBER?: string | null } | null };

export type LastMessageQueryVariables = Exact<{
  chatId: Scalars['Int']['input'];
}>;


export type LastMessageQuery = { __typename?: 'RootQuery', lastMessage?: { __typename: 'Message', id?: number | null, text?: string | null, createdAt?: any | null, chat: { __typename: 'Chat', id?: number | null } } | null };

export type LoginMerchantMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMerchantMutation = { __typename?: 'RootMutation', loginMerchant?: { __typename?: 'Auth', token?: string | null } | null };

export type MessageAddedSubscriptionVariables = Exact<{
  chatId: Scalars['Int']['input'];
}>;


export type MessageAddedSubscription = { __typename?: 'RootSubscription', messageAdded?: { __typename?: 'ChatUpdatedType', message?: { __typename: 'Message', id?: number | null, text?: string | null, from_customer?: boolean | null, timestamp?: number | null, createdAt?: any | null, chat: { __typename: 'Chat', id?: number | null } } | null, chat?: { __typename?: 'Chat', id?: number | null, customer: { __typename: 'Customer', id: number, whatsapp_name?: string | null, phone_number: string, first_name?: string | null, last_name?: string | null }, messages: Array<{ __typename?: 'Message', id?: number | null, from_customer?: boolean | null, text?: string | null, timestamp?: number | null, createdAt?: any | null, chat: { __typename?: 'Chat', id?: number | null } } | null> } | null } | null };

export type GetMessagesQueryVariables = Exact<{
  chatId: Scalars['Int']['input'];
}>;


export type GetMessagesQuery = { __typename?: 'RootQuery', chat?: { __typename?: 'Chat', id?: number | null, customer: { __typename: 'Customer', id: number, first_name?: string | null, last_name?: string | null, phone_number: string }, messages: Array<{ __typename: 'Message', id?: number | null, text?: string | null, from_customer?: boolean | null, timestamp?: number | null, createdAt?: any | null, chat: { __typename?: 'Chat', id?: number | null } } | null> } | null };

export type SignupMerchantMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  whatsapp_phone_number: Scalars['String']['input'];
}>;


export type SignupMerchantMutation = { __typename?: 'RootMutation', signupMerchant?: { __typename?: 'Auth', token?: string | null } | null };

export type ChatAddedSubscriptionVariables = Exact<{
  merchantId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ChatAddedSubscription = { __typename?: 'RootSubscription', chatAdded?: { __typename?: 'Chat', id?: number | null, messages: Array<{ __typename: 'Message', id?: number | null, text?: string | null } | null> } | null };

export type GetChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChatsQuery = { __typename?: 'RootQuery', chats?: Array<{ __typename?: 'Chat', id?: number | null, customer: { __typename: 'Customer', id: number, first_name?: string | null, last_name?: string | null, phone_number: string } } | null> | null };

export type MerchantFragmentFragment = { __typename?: 'Merchant', username: string, business_name?: string | null } & { ' $fragmentName'?: 'MerchantFragmentFragment' };

export type MessageFragmentFragment = { __typename?: 'Message', text?: string | null, timestamp?: number | null, from_customer?: boolean | null, createdAt?: any | null } & { ' $fragmentName'?: 'MessageFragmentFragment' };

export type CustomerFragmentFragment = { __typename?: 'Customer', first_name?: string | null, last_name?: string | null, phone_number: string } & { ' $fragmentName'?: 'CustomerFragmentFragment' };

export const MerchantFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"merchantFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Merchant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"business_name"}}]}}]} as unknown as DocumentNode<MerchantFragmentFragment, unknown>;
export const MessageFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"messageFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"from_customer"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<MessageFragmentFragment, unknown>;
export const CustomerFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"customerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Customer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}}]}}]} as unknown as DocumentNode<CustomerFragmentFragment, unknown>;
export const AddCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddCustomer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customer"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CustomerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addCustomer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"customer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customer"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"whatsapp_name"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}}]}}]}}]} as unknown as DocumentNode<AddCustomerMutation, AddCustomerMutationVariables>;
export const AddChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chat"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChatInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addChat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chat"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chat"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"whatsapp_name"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"from_customer"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<AddChatMutation, AddChatMutationVariables>;
export const AddMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MessageInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}},{"kind":"Argument","name":{"kind":"Name","value":"customerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"from_customer"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddMessageMutation, AddMessageMutationVariables>;
export const AddSettingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addSetting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"setting"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SettingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addSetting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"setting"},"value":{"kind":"Variable","name":{"kind":"Name","value":"setting"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"callBack_url"}},{"kind":"Field","name":{"kind":"Name","value":"ACCESS_TOKEN"}},{"kind":"Field","name":{"kind":"Name","value":"APP_ID"}},{"kind":"Field","name":{"kind":"Name","value":"APP_SECRET"}},{"kind":"Field","name":{"kind":"Name","value":"PHONE_NUMBER_ID"}},{"kind":"Field","name":{"kind":"Name","value":"BUSINESS_ACCOUNT_ID"}},{"kind":"Field","name":{"kind":"Name","value":"ACCESS_TOKEN"}},{"kind":"Field","name":{"kind":"Name","value":"API_VERSION"}},{"kind":"Field","name":{"kind":"Name","value":"WEBHOOK_VERIFICATION_TOKEN"}},{"kind":"Field","name":{"kind":"Name","value":"RECIPIENT_PHONE_NUMBER"}}]}}]}}]} as unknown as DocumentNode<AddSettingMutation, AddSettingMutationVariables>;
export const CustomerChatSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CustomerChatSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customerChatSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CustomerChatSearchQuery, CustomerChatSearchQueryVariables>;
export const CustomersSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CustomersSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customersSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<CustomersSearchQuery, CustomersSearchQueryVariables>;
export const GetCustomersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCustomers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"whatsapp_name"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}}]}}]}}]} as unknown as DocumentNode<GetCustomersQuery, GetCustomersQueryVariables>;
export const GetCustomerInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCustomerInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"customerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}}]}}]}}]} as unknown as DocumentNode<GetCustomerInfoQuery, GetCustomerInfoQueryVariables>;
export const GetCurrentMerchantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentMerchant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentMerchant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"business_name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<GetCurrentMerchantQuery, GetCurrentMerchantQueryVariables>;
export const GetSettingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSetting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"callBack_url"}},{"kind":"Field","name":{"kind":"Name","value":"APP_ID"}},{"kind":"Field","name":{"kind":"Name","value":"APP_SECRET"}},{"kind":"Field","name":{"kind":"Name","value":"PHONE_NUMBER_ID"}},{"kind":"Field","name":{"kind":"Name","value":"BUSINESS_ACCOUNT_ID"}},{"kind":"Field","name":{"kind":"Name","value":"ACCESS_TOKEN"}},{"kind":"Field","name":{"kind":"Name","value":"API_VERSION"}},{"kind":"Field","name":{"kind":"Name","value":"WEBHOOK_VERIFICATION_TOKEN"}},{"kind":"Field","name":{"kind":"Name","value":"RECIPIENT_PHONE_NUMBER"}}]}}]}}]} as unknown as DocumentNode<GetSettingQuery, GetSettingQueryVariables>;
export const LastMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LastMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode<LastMessageQuery, LastMessageQueryVariables>;
export const LoginMerchantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"loginMerchant"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginMerchant"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginMerchantMutation, LoginMerchantMutationVariables>;
export const MessageAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"messageAdded"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageAdded"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"from_customer"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"whatsapp_name"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"from_customer"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<MessageAddedSubscription, MessageAddedSubscriptionVariables>;
export const GetMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"from_customer"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<GetMessagesQuery, GetMessagesQueryVariables>;
export const SignupMerchantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signupMerchant"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"whatsapp_phone_number"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signupMerchant"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"whatsapp_phone_number"},"value":{"kind":"Variable","name":{"kind":"Name","value":"whatsapp_phone_number"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<SignupMerchantMutation, SignupMerchantMutationVariables>;
export const ChatAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"chatAdded"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"merchantId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatAdded"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"merchantId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"merchantId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<ChatAddedSubscription, ChatAddedSubscriptionVariables>;
export const GetChatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<GetChatsQuery, GetChatsQueryVariables>;