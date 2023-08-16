import { Request, Response } from "express"
import { createUserService, createService } from "../services/users.services"
import { UserCreateInterface, iToken } from "../interfaces/users.interfaces"


const createUserController = async (req: Request, res: Response): Promise<Response> => {
    const payload:UserCreateInterface = req.body
        
    const user = await createUserService(payload)

    return res.status(201).json(user)
}

const createController = async (req: Request, res: Response): Promise<Response> => {

    const token: iToken = await createService(req.body) 
    
    
    return res.status(200).json({ token })
}



export { createUserController }