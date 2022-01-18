import { SignUp } from "../../domain/auth/auth.use-case";
import { authRepository } from "../../infraestructure/repository/auth.repository";

export const signUp: SignUp = async ({ email, nick, password }) => {
    return await authRepository.signUp({ email, nick, password })
}
