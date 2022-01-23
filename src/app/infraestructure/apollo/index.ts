import { ApolloClient, from, HttpLink, InMemoryCache, fromPromise, ApolloLink } from "@apollo/client";
import { onError, } from "@apollo/client/link/error";

import { storage } from '../storage/index';
import { RefreshTokenInput, TokensOutput } from "../../domain/entities";
import { MUTATION_REFRESH_TOKEN } from "../repository/auth/auth.gql";

const uri = 'http://localhost:4100/graphql'

const httpLink = new HttpLink({ uri });

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

const errorLink = onError(({ graphQLErrors, networkError, forward, operation }) => {
    console.log(' -- > ERROR LINK');
    if (graphQLErrors) {
        const errorMessage = graphQLErrors[0]?.message
        if (!errorMessage) { console.log('no error'); }
        if (errorMessage === 'MANY_TRYS') { console.log(' signOff + redirect'); }
        if (errorMessage === 'Unauthorized') {
            try {
                const oldHeaders = operation.getContext().headers;
                const $observable = fromPromise(
                    new Promise(async (resolve) => {
                        try {

                            const res = await getNewTokens()

                            if (!res) { throw new Error() }
                            if (!res.accessToken || !res.refreshToken) { throw new Error() }
                            storage.saveSessionStorage({ key: 'access-token', value: res.accessToken })
                            storage.saveSessionStorage({ key: 'refresh-token', value: res.refreshToken })
                            const accessToken = `Bearer ${storage.readSessionStorage({ key: 'access-token' })}`

                            operation.setContext({ headers: { ...oldHeaders, authorization: accessToken }, });
                            resolve(res)
                        } catch (err) {
                            resolve('')
                        }
                    })
                )
                return $observable.flatMap(() => forward(operation))
            } catch (err) {
                console.log('2redirect', err);
            }
        }
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([setTokenLink, errorLink, httpLink]),
    headers: {
        'client-name': 'WidgetX Ecom [web]',
        'client-version': '1.0.0'
    }
});

