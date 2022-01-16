import { SignUp } from "../../domain/auth/auth.use-case";
import { authRepository } from "../../infraestructure/repository/auth.repository";



export const signUp: SignUp = async ({ email, nick, password }) => {
    console.log('init.auth.signUp.controller');
    const res = await authRepository.signUp({ email, nick, password })
    console.log('end.auth.signUp.controller ', res);
}
