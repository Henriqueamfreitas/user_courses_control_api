import { QueryConfig } from "pg"
import { client } from "../database"
import { 
    UserInterface, 
    UserResultInterface, 
    UserCoursesInterface,
    UserCoursesResultInterface 
} from "../interfaces/users.interfaces"
import { 
    userReturnSchema, 
    userReturnManySchema, 
    userCoursesReturnManySchema 
} from "../schemas/user.schema"
import { hashSync } from "bcryptjs"


const createUserService = async (payload: any) => {
    payload.password = hashSync(payload.password, 12) 

    if(payload.admin === undefined){
        const queryString: string = `
            INSERT INTO users("name", "email", "password")
            VALUES ($1, $2, $3)
            RETURNING "users"."id", "users"."name", "users"."email";    
        `

        const queryConfig: QueryConfig = {
            text: queryString,
            values: [payload.name, payload.email, payload.password],
        }

        const queryResult: UserResultInterface = await client.query(queryConfig)

        return userReturnSchema.parse(queryResult.rows[0])
    }
    const queryString: string = `
        INSERT INTO users("name", "email", "password", "admin")
        VALUES ($1, $2, $3, $4)
        RETURNING "users"."id", "users"."name", "users"."email", "users"."admin";    
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [payload.name, payload.email, payload.password, payload.admin],
    }

    const queryResult: UserResultInterface = await client.query(queryConfig)

    return userReturnSchema.parse(queryResult.rows[0])
}

const getAllUsersService = async (user: any): Promise<any> => {
    const queryString: string = `
    SELECT "users"."id", "users"."name", "users"."email", "users"."admin" FROM "users";
    `

    const queryConfig: QueryConfig = {
        text: queryString,
    } 
    const queryResult: UserResultInterface = await client.query(queryConfig)
    const allUsers: UserInterface[] = queryResult.rows

    return userReturnManySchema.parse(allUsers)
}

const getUserCoursesService = async (payload: any) => {
    const { params } = payload
    
    const queryString: string = `
    SELECT
    "c"."id" "courseId", "c"."name" "courseName", "c"."description" "courseDescription",
    "uc"."active" "userActiveInCourse", "u"."id" "userId", "u"."name" "userName"
    FROM
        "courses" "c"
    JOIN
        "userCourses" "uc" ON
        "c"."id" = "uc"."courseId"
    JOIN
        "users" "u" ON
        "uc"."userId" = "u"."id"
    WHERE "u"."id" = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [params.id]
    } 
    const queryResult: UserCoursesResultInterface = await client.query(queryConfig)
    const allCoursesFromUser: UserCoursesInterface[] = queryResult.rows

    return userCoursesReturnManySchema.parse(allCoursesFromUser)
}


export { 
    createUserService, 
    getAllUsersService, 
    getUserCoursesService 
}