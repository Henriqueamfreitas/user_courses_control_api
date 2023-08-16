import { Request, Response } from "express"
import { createUserService, getAllUsersService, getUserCoursesService} from "../services/users.services"
import { UserCreateInterface, iToken } from "../interfaces/users.interfaces"
import { AppError } from "../errors/error"


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

const getUserCoursesController = async (req: Request, res: Response): Promise<Response> => {
    const payload:Request = req
        
    const userCourses = await getUserCoursesService(payload)
    if(userCourses.length === 0){
        throw new AppError("No course found", 404)
    }

    return res.status(200).json(userCourses)
}

export { createUserController, getAllUsersController, getUserCoursesController }