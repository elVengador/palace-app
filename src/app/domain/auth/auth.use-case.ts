import { RefreshTokenInput, SignInInput, SignUpInput, TokensOutput } from "../entities";

export type SignUp = (params: SignUpInput) => Promise<string>
export type SignIn = (params: SignInInput) => Promise<TokensOutput>
export type RefreshToken = (params: RefreshTokenInput) => Promise<TokensOutput>
// export type GetUser = (id: string) => User
// export type GetUsers = () => User[]
// export type UpdateUser = (user: User) => User
// export type RemoveUser = (id: string) => User
