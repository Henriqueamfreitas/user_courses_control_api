import { QueryResult } from "pg"

interface UserInterface{
    id: number,
    name: string,
    email: string,
    password: string,
    admin: boolean,
}

type UserCreateInterface = Omit<UserInterface, 'id'>
type UserResultInterface = QueryResult<UserInterface>

interface iToken {
    token: string
}

export {
    UserInterface, UserCreateInterface, UserResultInterface, iToken
}