import { Router } from "express";
import "dotenv/config";
import { createUserController } from "../controllers/users.controllers";
import { ensureNoEmailDuplicatesMiddleWare } from "../middlewares/verify.middleware";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { userCreateSchema } from "../schemas/user.schema";
import { courseCreateSchema } from "../schemas/course.schema";
import { createCourseController } from "../controllers/courses.controllers";

const coursesRouter: Router = Router()

coursesRouter.post('/', validateBodyMiddleware(courseCreateSchema), createCourseController)

export { coursesRouter }