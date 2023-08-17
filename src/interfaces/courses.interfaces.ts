import { QueryResult } from "pg"

interface CourseInterface{
    id: number,
    name: string,
    description: string,
}

type CourseCreateInterface = Omit<CourseInterface, 'id'>
type CourseResultInterface = QueryResult<CourseInterface>

interface CourseUsersInterface{
    userId: number,
    userName: string,
    courseId: number,
    courseName: string,
    courseDescription: string,
    userActiveInCourse: boolean,
}

type CourseUsersCreateInterface = Omit<CourseUsersInterface, 'id'>
type CourseUsersResultInterface = QueryResult<CourseUsersInterface>


export {
    CourseInterface, CourseCreateInterface, CourseResultInterface,
    CourseUsersInterface, CourseUsersCreateInterface, CourseUsersResultInterface
}