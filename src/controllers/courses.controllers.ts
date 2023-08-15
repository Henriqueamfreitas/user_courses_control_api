import { Request, Response } from "express"
import { createUserService } from "../services/users.services"
import { UserCreateInterface } from "../interfaces/users.interfaces"
import { CourseCreateInterface } from "../interfaces/courses.interfaces"
import { createCourseService } from "../services/courses.services"
import { AppError } from "../errors/error"
import { error } from "../middlewares/handle.middleware"


const createCourseController = async (req: Request, res: Response): Promise<Response> => {
    const payload:CourseCreateInterface = req.body
        
    const course = await createCourseService(payload)

    return res.status(201).json(course)
}

export { createCourseController }