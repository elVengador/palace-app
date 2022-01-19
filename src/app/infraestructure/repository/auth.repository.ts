import { SignInInput, SignUpInput, TokensOutput } from "../../domain/entities";
import { gqlClient } from "../graphql";
import { MUTATION_SIGN_IN, MUTATION_SIGN_UP } from './auth.gql';

export const authRepository = {
    signUp: async (params: SignUpInput): Promise<string> => {
        return await gqlClient.request<string>(MUTATION_SIGN_UP, params)
    },
    signIn: async (params: SignInInput): Promise<TokensOutput> => {
        const res = await gqlClient.request<{ signIn: TokensOutput }>(MUTATION_SIGN_IN, params)
        return res.signIn
    }
}
