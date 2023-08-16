import { QueryConfig } from "pg"
import { client } from "../database"
import format from "pg-format"
import { 
    UserInterface, UserCreateInterface, UserResultInterface 
} from "../interfaces/users.interfaces"
import { userReturnSchema } from "../schemas/user.schema"
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

const createService = async(payload: any): Promise<any> => {
    const { email, password } = payload

    const queryTemplate: string = `
    SELECT * FROM "users" WHERE email = %L; 
    ` 

    const queryFormat: string = format(queryTemplate, email)

    const queryResult: UserResultInterface = await client.query(queryFormat)
    const user: UserInterface = queryResult.rows[0]

    if(user === undefined){
        throw new AppError("Invalid email/password", 401)
    }

    const passwordIsValid: boolean = compareSync(password, user.password) 

    if(!passwordIsValid){
        throw new AppError("Invalid email/password", 401)
    }

    const token = sign({
        email: user.email
    }, String(process.env.SECRET_KEY), {
        expiresIn: process.env.EXPIRES_IN, subject: String(user.id)
    })

    return token 
}

export { createUserService, createService }