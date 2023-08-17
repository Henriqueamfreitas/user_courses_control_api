import { QueryConfig, Client } from "pg"
import { client } from "../database"
import format from "pg-format"
import { courseSchema, courseReturnManySchema, courseUsersSchema, courseUsersReturnManySchema } from "../schemas/course.schema"
import { 
    CourseInterface, CourseCreateInterface, CourseResultInterface,
    CourseUsersInterface, CourseUsersCreateInterface, CourseUsersResultInterface 
} from "../interfaces/courses.interfaces"


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

const getAllCoursesService = async (user: any): Promise<any> => {
    const queryString: string = `
    SELECT * FROM "courses";
    `

    const queryConfig: QueryConfig = {
        text: queryString,
    } 
    const queryResult: CourseResultInterface = await client.query(queryConfig)
    const allCourses: CourseInterface[] = queryResult.rows

    return courseReturnManySchema.parse(allCourses)
}

const assignUserToCourseService = async (payload: any) => {
    const { params } = payload

    const queryString: string = `
        INSERT INTO "userCourses"("userId", "courseId")
        VALUES($1, $2)
        RETURNING *;  
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [params.userId, params.courseId],
    }

    const queryResult: CourseResultInterface = await client.query(queryConfig)
    
    return queryResult.rows
}

const deleteUserFromCourseService = async (payload: any) => {
    const { body, params } = payload

    const queryString: string = `
        DELETE FROM "userCourses"
        WHERE "userId" = $1 AND "courseId" = $2
        RETURNING *;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [params.userId, params.courseId]
    }
    
    const queryResult: CourseResultInterface = await client.query(queryConfig)
    const updatedUserCourse: CourseInterface = queryResult.rows[0]
    
    return updatedUserCourse
}

const getCourseUsersService = async (payload: any) => {
    const { params } = payload
    
    const queryString: string = `
    SELECT
    "u"."id" "userId", "u"."name" "userName", "c"."id" "courseId", "c"."name" "courseName",
    "c"."description" "courseDescription",  "uc"."active" "userActiveInCourse"
    FROM
        "courses" "c"
    JOIN
        "userCourses" "uc" ON
        "c"."id" = "uc"."courseId"
    JOIN
        "users" "u" ON
        "uc"."userId" = "u"."id"
    WHERE "c"."id" = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [params.id]
    } 
    const queryResult: CourseUsersResultInterface = await client.query(queryConfig)
    const allUsersFromCourse: CourseUsersInterface[] = queryResult.rows

    return allUsersFromCourse
}

export { 
    createCourseService, 
    getAllCoursesService, 
    assignUserToCourseService, 
    deleteUserFromCourseService,
    getCourseUsersService
}