import { mockUser, User } from "../../domain/user/user.entity"
import { AddUser } from "../../domain/user/user.use-case"


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const addUsers: AddUser = (user: User) => {
    return mockUser()
}
