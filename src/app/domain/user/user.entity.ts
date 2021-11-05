// user interface
// user functions as createUser

export interface User {
    id: string,
    name: string,
    paternalSurname: string,
    maternalSurname: string,
    age: number,
    nick: string,
    email: string,
    genre: string,
    photo: string,
}

export const mockUser = (): User => {
    return {
        id: 'sdfsdf22d2d2d2d32d3',
        name: 'jimy',
        paternalSurname: 'qqq',
        maternalSurname: 'ccc',
        nick: 'ev',
        email: 'jimy@gmail.com',
        age: 26,
        genre: 'M',
        photo: 'services/user/photo-0000001.jpg'
    }
}

export const fullName = (user: User): string => {
    return `${user.paternalSurname} ${user.maternalSurname}, ${user.name}`
}
