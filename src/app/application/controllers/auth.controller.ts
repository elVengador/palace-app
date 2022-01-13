// import { mockUser, User } from "../../domain/user/user.entity"
// import { AddUser } from "../../domain/user/user.use-case"

import { SignUp } from "../../domain/auth/auth.use-case";



export const signUp: SignUp = ({ email, nick, password }) => {
    console.log('auth.signUp ');
}
