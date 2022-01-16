import { SignUpInput } from "../../domain/entities";
import { gqlClient } from "../graphql";
import { MUTATION_SIGN_UP } from './auth.gql';

export const authRepository = {
    signUp: async (params: SignUpInput): Promise<string> => {
        return await gqlClient.request<string>(MUTATION_SIGN_UP, params)
    }
}
