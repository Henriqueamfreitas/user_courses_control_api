import { QueryConfig } from "pg"
import { client } from "../database"
import format from "pg-format"
import { 
    UserInterface, UserCreateInterface, UserResultInterface 
} from "../interfaces/users.interfaces"
import { AppError } from "../errors/error"


const createUserService = async (payload: any) => {
  
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

        return queryResult.rows[0]
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

    return queryResult.rows[0]
}

export { createUserService }