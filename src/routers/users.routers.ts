import { Router } from "express";
import "dotenv/config";
import { createUserController } from "../controllers/users.controllers";
import { ensureNoEmailDuplicatesMiddleWare } from "../middlewares/verify.middleware";

const usersRouter: Router = Router()

usersRouter.post('/', ensureNoEmailDuplicatesMiddleWare, createUserController)

export { usersRouter }