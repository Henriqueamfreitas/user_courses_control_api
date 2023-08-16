import { NextFunction, Request, Response } from "express"
import { QueryConfig } from "pg"
import { client } from "../database"
import { AppError } from "../errors/error"
import { UserInterface, UserCreateInterface, UserResultInterface } from "../interfaces/users.interfaces"
import "dotenv/config"
import { verify } from "jsonwebtoken"
import { CourseInterface, CourseResultInterface } from "../interfaces/courses.interfaces"

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
        throw new AppError("Insufficient permission", 403)
    }
    
    return next()
}

const ensureUserIdAndCourseIdExistsMiddleWare = async (
    req: Request, res: Response, next: NextFunction): Promise<Response | void>  => {
    const userId: string = req.params.userId
    const queryString: string = `
        SELECT * FROM "users";
    `
    
    const queryConfig: QueryConfig = {
        text: queryString,
    }
    
    const queryResult: UserResultInterface = await client.query(queryConfig)
    const users: UserInterface[] = queryResult.rows

    const thisUserIdExists: number= users.findIndex(element => element.id === Number(userId))


    const CourseId: string = req.params.courseId
    const queryStringCourse: string = `
        SELECT * FROM "courses";
    `
    
    const queryConfigCourse: QueryConfig = {
        text: queryStringCourse,
    }
    
    const queryResultCourse: CourseResultInterface = await client.query(queryConfigCourse)
    const courses: CourseInterface[] = queryResultCourse.rows

    const thisCourseIdExists: number= courses.findIndex(element => element.id === Number(CourseId))


    if(((thisUserIdExists === -1) && (users.length>0)) || ((thisCourseIdExists === -1) && (courses.length>0))){
        throw new AppError("User/course not found", 404)
    }

    res.locals.thisUserIdExists = thisUserIdExists

    return next()
}


export { ensureNoEmailDuplicatesMiddleWare, ensureTokenIsAdminMiddleWare, ensureUserIdAndCourseIdExistsMiddleWare 
}