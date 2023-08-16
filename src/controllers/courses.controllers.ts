import { Request, Response } from "express"
import { CourseCreateInterface } from "../interfaces/courses.interfaces"
import { createCourseService, getAllCoursesService } from "../services/courses.services"


const createCourseController = async (req: Request, res: Response): Promise<Response> => {
    const payload:CourseCreateInterface = req.body
        
    const course = await createCourseService(payload)

    return res.status(201).json(course)
}

const getAllCoursesController = async (req: Request, res: Response): Promise<Response> => {        
    const payload:Request = req

    const allCourses = await getAllCoursesService(payload)

    return res.status(200).json(allCourses)
}


export { createCourseController, getAllCoursesController }