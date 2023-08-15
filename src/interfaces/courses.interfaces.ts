import { QueryResult } from "pg"

interface CourseInterface{
    id: number,
    name: string,
    description: string,
}

type CourseCreateInterface = Omit<CourseInterface, 'id'>
type CourseResultInterface = QueryResult<CourseInterface>

export {
    CourseInterface, CourseCreateInterface, CourseResultInterface
}