import { ApolloClient, from, HttpLink, InMemoryCache, fromPromise, ApolloLink } from "@apollo/client";
import { onError, } from "@apollo/client/link/error";
// import { setContext } from "@apollo/client/link/context";
// import { RetryLink } from "@apollo/client/link/retry";
// import { MUTATION_REFRESH_TOKEN } from "../repository/auth/auth.gql";

import { storage } from '../storage/index';
import { RefreshTokenInput, TokensOutput } from "../../domain/entities";
import { MUTATION_REFRESH_TOKEN } from "../repository/auth/auth.gql";

const uri = 'http://localhost:4100/graphql'
const token = () => storage.readSessionStorage({ key: 'access-token' }) || ''
// import * as authController from '../../application/controllers/auth.controller';
// import { RefreshTokenInput, TokensOutput } from "../../domain/entities";
// import { MUTATION_REFRESH_TOKEN } from "../repository/auth/auth.gql";

const httpLink = new HttpLink({ uri });

// const handleErrors = ({ message }: GraphQLError, forward: NextLink) => {
//     if (message === 'Unauthorized') {
//         // Modify the operation context with a new token
//         const oldHeaders = operation.getContext().headers;
//         operation.setContext({
//             headers: {
//                 ...oldHeaders,
//                 authorization: getNewToken(),
//             },
//         });
//         // Retry the request, returning the new observable
//         return forward(operation);
//         return console.log(' -- query refresh token');

//     }
//     return console.log(' -- show error message');
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars

// const getNewAccessToken = async () => {
//     console.log('GNAT');
//     const refreshToken = storage.readSessionStorage({ key: 'refresh-token' })
//     console.log('RT', refreshToken);
//     if (!refreshToken) { return null }
//     console.log(' >> RT');
//     return await authController.refreshToken({ currentRefreshToken: refreshToken })
// }

// const addAccessTokenLink = setContext(() => {
//     // if you have a cached value, return it immediately
//     return storage.readSessionStorage({ key: 'access-token' })
// });

const setTokenLink = new ApolloLink((operation, forward) => {
    console.log(' -- > TOKEN LINK');
    const accessToken = storage.readSessionStorage({ key: 'access-token' })
    operation.setContext({ headers: { authorization: `Bearer ${accessToken}` } });
    return forward(operation);
});

const getNewTokens = async (retryNumber = 1) => {
    const refreshToken = storage.readSessionStorage({ key: 'refresh-token' })
    if (!refreshToken) { return null }

    const res = await client.mutate<{ refreshToken: TokensOutput }, { refreshTokenInput: RefreshTokenInput }>({
        mutation: MUTATION_REFRESH_TOKEN,
        variables: {
            "refreshTokenInput": {
                "currentRefreshToken": refreshToken,
                retryNumber
            }
        }
    })

    const value = res.data?.refreshToken
    if (!value) { return { accessToken: null, refreshToken: null } }
    if (!value.accessToken || !value.refreshToken) { return { accessToken: null, refreshToken: null } }
    return value
}

// const asyncRefreshTokenLink = setContext(request => {
//     console.log(' -- > ASYNC REFRESH TOKEN LINK');
//     console.log('Request:', request);
//     return new Promise((success) => {
//         // do some async lookup here
//         setTimeout(() => {
//             success({ token: "async found token" });
//         }, 10);
//     })
// }
// );

const errorLink = onError(({ graphQLErrors, networkError, forward, operation }) => {
    console.log(' -- > ERROR LINK');
    if (graphQLErrors) {
        const errorMessage = graphQLErrors[0]?.message
        if (!errorMessage) { console.log('no error'); }
        if (errorMessage === 'MANY_TRYS') { console.log(' signOff + redirect'); }
        if (errorMessage === 'Unauthorized') {
            try {

                console.log('onErrorLink', operation.operationName);
                const oldHeaders = operation.getContext().headers;
                const $promise = fromPromise(
                    new Promise(async (resolve) => {
                        try {

                            const res = await getNewTokens()

                            console.log('ok resolve', res);
                            if (!res) { throw new Error() }
                            if (!res.accessToken || !res.refreshToken) { throw new Error() }
                            storage.saveSessionStorage({ key: 'access-token', value: res.accessToken })
                            storage.saveSessionStorage({ key: 'refresh-token', value: res.refreshToken })

                            operation.setContext({
                                headers: {
                                    ...oldHeaders,
                                    authorization: `Bearer ${storage.readSessionStorage({ key: 'access-token' })}`,
                                },
                            });

                            resolve(res)
                        } catch (err) {
                            resolve('')
                        }
                    })
                )

                return $promise.flatMap(() => forward(operation))


                // return forward(operation)
            } catch (err) {
                console.log('2redirect', err);
            }
        }
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

// const link = new RetryLink({
//     attempts: (count, operation, error) => {
//         return error && count < 2 && operation.operationName != 'refreshToken';
//     },
//     delay: (count) => {
//         return count * 1000 * Math.random();
//     },
// });

export const client = new ApolloClient({
    uri,
    cache: new InMemoryCache(),
    link: from([setTokenLink, errorLink, httpLink]),
    headers: {
        authorization: `Bearer ${token()}`,
        'client-name': 'WidgetX Ecom [web]',
        'client-version': '1.0.0'
    }
});

