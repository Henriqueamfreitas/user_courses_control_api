import { Request, Response } from "express"
import { CourseCreateInterface } from "../interfaces/courses.interfaces"
import { createCourseService, getAllCoursesService, assignUserToCourseService, updateUserCourseStatusService 
} from "../services/courses.services"


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

const assignUserToCourseController = async (req: Request, res: Response): Promise<Response> => {
    const payload: Request = req
        
    await assignUserToCourseService(payload)
    const message = {
        message: "User successfully vinculed to course"
    }

    return res.status(201).json(message)
}

const updateUserCourseStatusController = async (req: Request, res: Response): Promise<Response> => {
    const payload: Request = req
        
    await updateUserCourseStatusService(payload)
    return res.status(204).send()
}

export { 
    createCourseController, 
    getAllCoursesController, 
    assignUserToCourseController, 
    updateUserCourseStatusController 
}