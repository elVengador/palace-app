import { SignUpInput } from "../entities";

export type SignUp = (params: SignUpInput) => Promise<string>
// export type GetUser = (id: string) => User
// export type GetUsers = () => User[]
// export type UpdateUser = (user: User) => User
// export type RemoveUser = (id: string) => User
