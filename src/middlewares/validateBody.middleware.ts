import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors/error.js"
import { ZodError, ZodTypeAny } from "zod"

const validateBodyMiddleware = 
(schema: ZodTypeAny) =>  
(req: Request, res: Response, next: NextFunction): void => {
    const validated = schema.parse(req.body)
    req.body = validated
    
    return next()     
}

export { validateBodyMiddleware }