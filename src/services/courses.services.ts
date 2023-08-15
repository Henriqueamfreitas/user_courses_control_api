import { QueryConfig } from "pg"
import { client } from "../database"
import format from "pg-format"
import { AppError } from "../errors/error"
import { courseSchema } from "../schemas/course.schema"
import { CourseInterface, CourseCreateInterface, CourseResultInterface } from "../interfaces/courses.interfaces"


const createCourseService = async (payload: any) => {
  
    const queryString: string = `
        INSERT INTO courses("name", "description")
        VALUES ($1, $2)
        RETURNING *;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [payload.name, payload.description],
    }

    const queryResult: CourseResultInterface = await client.query(queryConfig)

    return courseSchema.parse(queryResult.rows[0])
}

export { createCourseService }