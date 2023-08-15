import { Request, Response } from "express"
import { createUserService } from "../services/users.services"
import { UserCreateInterface } from "../interfaces/users.interfaces"
import { AppError } from "../errors/error"
import { error } from "../middlewares/handle.middleware"


const createUserController = async (req: Request, res: Response): Promise<Response> => {
    const payload:UserCreateInterface = req.body
        
    const user = await createUserService(payload)

    return res.status(201).json(user)
}

export { createUserController }