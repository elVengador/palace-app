import { mockUser, User } from "../../domain/user/user.entity"
import { AddUser } from "../../domain/user/user.use-case"


export const addUsers: AddUser = (user: User) => {
    return mockUser()
}
