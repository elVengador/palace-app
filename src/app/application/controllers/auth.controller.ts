import { RefreshToken, SignIn, SignUp } from "../../domain/auth/auth.use-case";
import { authRepository } from "../../infraestructure/repository/auth/auth.repository";

export const signUp: SignUp = async ({ email, nick, password }) => {
    return await authRepository.signUp({ email, nick, password })
}

export const signIn: SignIn = async ({ email, password }) => {
    return await authRepository.signIn({ email, password })
}

export const refreshToken: RefreshToken = async ({ currentRefreshToken }) => {
    console.log('RRTT cotnroller');
    return await authRepository.refreshToken({ currentRefreshToken, retryNumber: -1 })
}
