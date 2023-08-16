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


const loginService = async(payload: any): Promise<any> => {
    const { email, password } = payload

    const queryTemplate: string = `
    SELECT * FROM "users" WHERE email = %L; 
    `

    const queryFormat: string = format(queryTemplate, email)

    const queryResult: UserResultInterface = await client.query(queryFormat)
    const user: UserInterface = queryResult.rows[0]

    if(user === undefined){
        throw new AppError("Wrong email/password", 401)
    }

    const passwordIsValid: boolean = compareSync(password, user.password) 

    if(!passwordIsValid){
        throw new AppError("Wrong email/password", 401)
    }

    const token = sign({
        email: user.email, admin: user.admin
    }, String(process.env.SECRET_KEY), {
        expiresIn: process.env.EXPIRES_IN, subject: String(user.id)
    })

    return token 
}

export { loginService }