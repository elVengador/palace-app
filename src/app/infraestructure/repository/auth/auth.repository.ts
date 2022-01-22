import { RefreshTokenInput, SignInInput, SignUpInput, TokensOutput } from "../../../domain/entities";
import { gqlClient } from "../../graphql";
import { MUTATION_REFRESH_TOKEN, MUTATION_SIGN_IN, MUTATION_SIGN_UP } from './auth.gql';

export const authRepository = {
    signUp: async (params: SignUpInput): Promise<string> => {
        return await gqlClient.request<string>(MUTATION_SIGN_UP, params)
    },
    signIn: async (params: SignInInput): Promise<TokensOutput> => {
        const res = await gqlClient.request<{ signIn: TokensOutput }>(MUTATION_SIGN_IN, params)
        return res.signIn
    },
    refreshToken: async (params: RefreshTokenInput): Promise<TokensOutput> => {
        // console.log('btt');
        // const tt = { refreshTokenInput: params }
        // console.log('att');
        const res = await gqlClient.request<{ refreshToken: TokensOutput }>(MUTATION_REFRESH_TOKEN, { ...params })
        console.log('RES::', res);
        return res.refreshToken
    }
}
