"use client";

import { ApolloLink, HttpLink, gql, split } from "@apollo/client";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from "@apollo/client/utilities";

import {
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    NextSSRApolloClient,
    SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { setVerbosity } from "ts-invariant";
import { setContext } from '@apollo/client/link/context'
import { createFragmentRegistry } from "@apollo/client/cache";

setVerbosity("debug"); // enabling debug

// // detect whether client is using http or https
// const protocol = (location.protocol != 'https:') ? 'ws://': 'wss://';
// const port = location.port ? ":"+location.port: "";

// this client will be SSR-rendered for the initial request
// enable dynamic update of the browser when cache updates throu query or mutations
function makeClient() {

    //Apollo client will send all requests to the GraphqlServer
    const httpLink = new HttpLink({
        uri: 'http://localhost:4000/graphql',
        fetchOptions: { cache: "no-store" }, // disable cache
        credentials: "same-origin",  // include cookies with every request to  the api
    });

    const authLink = setContext((_, { headers }) => {
        // get the authentication token from loacl storate 
        const token = localStorage.getItem('jwt')
        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : ""
            }
        }
    })

    const authHttpLink = authLink.concat(httpLink)

    const wsLink = new GraphQLWsLink(createClient({
        url: 'ws://localhost:4000/subscriptions',
        // retryAttempts: Infinity,
        shouldRetry: () => true,
        keepAlive: 1000,
        connectionParams: () => {
            const token = localStorage.getItem('jwt');
            if (token) {
                console.log(token)
                return {
                    Authorization: `Bearer ${token}`
                }
            }
            return {}
        },
    }))

    // split function takes three parameters a function that's called for each operation
    // to execute the link to use for an operation if the function returns  a truthy 
    // and the link to use for an operation if the function returns a falsy valu
    const splitLink = split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        wsLink,  // for subscriptions
        authHttpLink, // for queries and mutations
    );

    return new NextSSRApolloClient({
        connectToDevTools: true,
        // the caching that we use is Next specific not the normal inMemoryCache
        cache: new NextSSRInMemoryCache({}),

        // if on the server and if undefined
        link:
            typeof window === "undefined"
                ? ApolloLink.from([
                    new SSRMultipartLink({
                        stripDefer: true,
                    }),
                    splitLink,
                ])
                : splitLink,
    });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
    return (
        // make sure every page using this layour have access to the Apollo Client
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    );
} 