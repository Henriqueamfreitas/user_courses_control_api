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

interface UserCoursesInterface{
    courseId: number,
    courseName: string, 
    courseDescription: string, 
    userActiveInCourse: boolean, 
    userId: number,
    userName: string,
}

type UserCoursesCreateInterface = Omit<UserCoursesInterface, 'id'>
type UserCoursesResultInterface = QueryResult<UserCoursesInterface>


export {
    UserInterface, 
    UserCreateInterface, 
    UserResultInterface, 
    iToken,
    UserCoursesInterface, 
    UserCoursesCreateInterface, 
    UserCoursesResultInterface
}