import { Request, Response } from "express"
import { createUserService, getAllUsersService} from "../services/users.services"
import { UserCreateInterface, iToken } from "../interfaces/users.interfaces"


const createUserController = async (req: Request, res: Response): Promise<Response> => {
    const payload:UserCreateInterface = req.body
        
    const user = await createUserService(payload)

    return res.status(201).json(user)
}

const getAllUsersController = async (req: Request, res: Response): Promise<Response> => {        
    const payload:Request = req

    const allUsers = await getAllUsersService(payload)

    return res.status(200).json(allUsers)
}

export { createUserController, getAllUsersController }