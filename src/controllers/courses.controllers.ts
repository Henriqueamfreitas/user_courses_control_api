import { Request, Response } from "express"
import { CourseCreateInterface } from "../interfaces/courses.interfaces"
import { createCourseService } from "../services/courses.services"


const createCourseController = async (req: Request, res: Response): Promise<Response> => {
    const payload:CourseCreateInterface = req.body
        
    const course = await createCourseService(payload)

    return res.status(201).json(course)
}

export { createCourseController }