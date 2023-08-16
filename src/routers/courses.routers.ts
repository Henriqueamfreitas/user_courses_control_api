import { Router } from "express";
import "dotenv/config";
import { validateBodyMiddleware, token } from "../middlewares/validateBody.middleware";
import { courseCreateSchema } from "../schemas/course.schema";
import { createCourseController, getAllCoursesController } from "../controllers/courses.controllers";
import { ensureTokenIsAdminMiddleWare } from "../middlewares/verify.middleware";

const coursesRouter: Router = Router()

coursesRouter.get('', getAllCoursesController)
coursesRouter.use(token)
coursesRouter.post('/', ensureTokenIsAdminMiddleWare, validateBodyMiddleware(courseCreateSchema), 
createCourseController)

export { coursesRouter }