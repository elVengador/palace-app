// this is the first use case

import { User } from "./user.entity";

// export interface addUser  () => user

export type AddUser = (user: User) => User
export type GetUser = (id: string) => User
export type GetUsers = () => User[]
export type UpdateUser = (user: User) => User
export type RemoveUser = (id: string) => User
