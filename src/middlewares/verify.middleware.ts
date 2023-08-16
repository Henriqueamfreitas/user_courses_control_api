import { NextFunction, Request, Response } from "express"
import { QueryConfig } from "pg"
import { client } from "../database"
import { AppError } from "../errors/error"
import { UserInterface, UserCreateInterface, UserResultInterface } from "../interfaces/users.interfaces"
import "dotenv/config"
import { verify } from "jsonwebtoken"

const ensureNoEmailDuplicatesMiddleWare = async (
    req: Request, res: Response, next: NextFunction): Promise<Response | void>  => {
    const queryString: string = `
        SELECT * FROM users;
    `
    
    const queryConfig: QueryConfig = {
        text: queryString,
    }
    
    const queryResult: UserResultInterface = await client.query(queryConfig)
    const users: UserInterface[] = queryResult.rows

    const usersWithSameEmail: number= users.findIndex(element => element.email === req.body.email)

    if((usersWithSameEmail !== -1) && (users.length>0)){
        throw new AppError("Email already registered", 409)
    }

    res.locals.usersWithSameEmail = usersWithSameEmail

    return next()
}

const ensureTokenIsAdminMiddleWare = ( req: Request, res: Response, next: NextFunction): void => {
    const { sub, admin } = res.locals.decoded
    if(!admin){
        throw new AppError("Insufficient permission", 401)
    }
    
    return next()
}


export { ensureNoEmailDuplicatesMiddleWare, ensureTokenIsAdminMiddleWare }