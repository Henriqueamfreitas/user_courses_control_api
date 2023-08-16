import { QueryConfig } from "pg"
import { client } from "../database"
import format from "pg-format"
import { 
    UserInterface, UserCreateInterface, UserResultInterface 
} from "../interfaces/users.interfaces"
import { userReturnSchema, userReturnManySchema } from "../schemas/user.schema"
import { hashSync, compareSync } from "bcryptjs"
import { AppError } from "../errors/error"
import { sign } from "jsonwebtoken"

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


export { createUserService, getAllUsersService }