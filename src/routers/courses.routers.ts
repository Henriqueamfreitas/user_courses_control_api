import { Router } from "express";
import "dotenv/config";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { courseCreateSchema } from "../schemas/course.schema";
import { createCourseController } from "../controllers/courses.controllers";

const coursesRouter: Router = Router()

coursesRouter.post('/', validateBodyMiddleware(courseCreateSchema), createCourseController)

export { coursesRouter }