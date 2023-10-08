import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type Chat = {
  __typename?: 'Chat';
  customer: Customer;
  id?: Maybe<Scalars['Int']['output']>;
  lastMessage?: Maybe<Message>;
  merchant: Merchant;
  messages: Array<Maybe<Message>>;
};

export type ChatInput = {
  customer: Scalars['Int']['input'];
  merchant: Scalars['Int']['input'];
};

export type Customer = {
  __typename?: 'Customer';
  first_name: Scalars['String']['output'];
  id?: Maybe<Scalars['Int']['output']>;
  last_name: Scalars['String']['output'];
  merchant: Merchant;
  phone_number: Scalars['String']['output'];
  whatsapp_name?: Maybe<Scalars['String']['output']>;
};

export type CustomerInput = {
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  phone_number: Scalars['String']['input'];
  whatsapp_name?: InputMaybe<Scalars['String']['input']>;
};

export type Merchant = {
  __typename?: 'Merchant';
  business_name: Scalars['String']['output'];
  customers?: Maybe<Array<Maybe<Customer>>>;
  id?: Maybe<Scalars['Int']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  products?: Maybe<Array<Maybe<Product>>>;
  setting?: Maybe<Array<Maybe<Setting>>>;
  username: Scalars['String']['output'];
};

export type MerchantInput = {
  business_name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Message = {
  __typename?: 'Message';
  chat: Chat;
  createdAt?: Maybe<Scalars['Date']['output']>;
  from_customer: Scalars['Boolean']['output'];
  id?: Maybe<Scalars['Int']['output']>;
  text: Scalars['String']['output'];
  timestamp?: Maybe<Scalars['Date']['output']>;
};

export type MessageInput = {
  chatId: Scalars['Int']['input'];
  from_customer: Scalars['Boolean']['input'];
  text: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Date']['input']>;
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

export type RootMutation = {
  __typename?: 'RootMutation';
  addChat?: Maybe<Chat>;
  addCustomer?: Maybe<Customer>;
  addMessage?: Maybe<Message>;
  addProduct?: Maybe<Product>;
  addSetting?: Maybe<Setting>;
  signupMerchant?: Maybe<ReqNotification>;
};


export type RootMutationAddChatArgs = {
  chat: ChatInput;
};


export type RootMutationAddCustomerArgs = {
  customer: CustomerInput;
};


export type RootMutationAddMessageArgs = {
  message: MessageInput;
};


export type RootMutationAddProductArgs = {
  product: ProductInput;
};


export type RootMutationAddSettingArgs = {
  setting: SettingInput;
};


export type RootMutationSignupMerchantArgs = {
  merchant: MerchantInput;
};

export type RootQuery = {
  __typename?: 'RootQuery';
  chat?: Maybe<Chat>;
  chats?: Maybe<Array<Maybe<Chat>>>;
  customers?: Maybe<Array<Maybe<Customer>>>;
  products?: Maybe<Array<Maybe<Product>>>;
  setting?: Maybe<Setting>;
};


export type RootQueryChatArgs = {
  chatId: Scalars['String']['input'];
};


export type RootQuerySettingArgs = {
  username: Scalars['String']['input'];
};

export type Setting = {
  __typename?: 'Setting';
  ACCESS_TOKEN?: Maybe<Scalars['String']['output']>;
  API_VERSION?: Maybe<Scalars['String']['output']>;
  APP_ID?: Maybe<Scalars['String']['output']>;
  APP_SECRET?: Maybe<Scalars['String']['output']>;
  BUSINESS_ACCOUNT_ID?: Maybe<Scalars['String']['output']>;
  PHONE_NUMBER_ID?: Maybe<Scalars['String']['output']>;
  RECIPIENT_PHONE_NUMBER?: Maybe<Scalars['String']['output']>;
  WEBHOOK_VERIFICATION_TOKEN?: Maybe<Scalars['String']['output']>;
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
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Chat: ResolverTypeWrapper<Chat>;
  ChatInput: ChatInput;
  Customer: ResolverTypeWrapper<Customer>;
  CustomerInput: CustomerInput;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Merchant: ResolverTypeWrapper<Merchant>;
  MerchantInput: MerchantInput;
  Message: ResolverTypeWrapper<Message>;
  MessageInput: MessageInput;
  Product: ResolverTypeWrapper<Product>;
  ProductInput: ProductInput;
  ReqNotification: ResolverTypeWrapper<ReqNotification>;
  RootMutation: ResolverTypeWrapper<{}>;
  RootQuery: ResolverTypeWrapper<{}>;
  Setting: ResolverTypeWrapper<Setting>;
  SettingInput: SettingInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  Chat: Chat;
  ChatInput: ChatInput;
  Customer: Customer;
  CustomerInput: CustomerInput;
  Date: Scalars['Date']['output'];
  Int: Scalars['Int']['output'];
  Merchant: Merchant;
  MerchantInput: MerchantInput;
  Message: Message;
  MessageInput: MessageInput;
  Product: Product;
  ProductInput: ProductInput;
  ReqNotification: ReqNotification;
  RootMutation: {};
  RootQuery: {};
  Setting: Setting;
  SettingInput: SettingInput;
  String: Scalars['String']['output'];
}>;

export type ChatResolvers<ContextType = any, ParentType extends ResolversParentTypes['Chat'] = ResolversParentTypes['Chat']> = ResolversObject<{
  customer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  lastMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType>;
  merchant?: Resolver<ResolversTypes['Merchant'], ParentType, ContextType>;
  messages?: Resolver<Array<Maybe<ResolversTypes['Message']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Customer'] = ResolversParentTypes['Customer']> = ResolversObject<{
  first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  last_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  merchant?: Resolver<ResolversTypes['Merchant'], ParentType, ContextType>;
  phone_number?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  whatsapp_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type MerchantResolvers<ContextType = any, ParentType extends ResolversParentTypes['Merchant'] = ResolversParentTypes['Merchant']> = ResolversObject<{
  business_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Customer']>>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  setting?: Resolver<Maybe<Array<Maybe<ResolversTypes['Setting']>>>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = ResolversObject<{
  chat?: Resolver<ResolversTypes['Chat'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  from_customer?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = ResolversObject<{
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  merchant?: Resolver<ResolversTypes['Merchant'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReqNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReqNotification'] = ResolversParentTypes['ReqNotification']> = ResolversObject<{
  notification?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RootMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['RootMutation'] = ResolversParentTypes['RootMutation']> = ResolversObject<{
  addChat?: Resolver<Maybe<ResolversTypes['Chat']>, ParentType, ContextType, RequireFields<RootMutationAddChatArgs, 'chat'>>;
  addCustomer?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType, RequireFields<RootMutationAddCustomerArgs, 'customer'>>;
  addMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<RootMutationAddMessageArgs, 'message'>>;
  addProduct?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<RootMutationAddProductArgs, 'product'>>;
  addSetting?: Resolver<Maybe<ResolversTypes['Setting']>, ParentType, ContextType, RequireFields<RootMutationAddSettingArgs, 'setting'>>;
  signupMerchant?: Resolver<Maybe<ResolversTypes['ReqNotification']>, ParentType, ContextType, RequireFields<RootMutationSignupMerchantArgs, 'merchant'>>;
}>;

export type RootQueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['RootQuery'] = ResolversParentTypes['RootQuery']> = ResolversObject<{
  chat?: Resolver<Maybe<ResolversTypes['Chat']>, ParentType, ContextType, RequireFields<RootQueryChatArgs, 'chatId'>>;
  chats?: Resolver<Maybe<Array<Maybe<ResolversTypes['Chat']>>>, ParentType, ContextType>;
  customers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Customer']>>>, ParentType, ContextType>;
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  setting?: Resolver<Maybe<ResolversTypes['Setting']>, ParentType, ContextType, RequireFields<RootQuerySettingArgs, 'username'>>;
}>;

export type SettingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Setting'] = ResolversParentTypes['Setting']> = ResolversObject<{
  ACCESS_TOKEN?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  API_VERSION?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  APP_ID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  APP_SECRET?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  BUSINESS_ACCOUNT_ID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  PHONE_NUMBER_ID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  RECIPIENT_PHONE_NUMBER?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  WEBHOOK_VERIFICATION_TOKEN?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Chat?: ChatResolvers<ContextType>;
  Customer?: CustomerResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Merchant?: MerchantResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ReqNotification?: ReqNotificationResolvers<ContextType>;
  RootMutation?: RootMutationResolvers<ContextType>;
  RootQuery?: RootQueryResolvers<ContextType>;
  Setting?: SettingResolvers<ContextType>;
}>;

