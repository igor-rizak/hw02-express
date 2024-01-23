import express from "express";

import authController from "../../controllers/users-controller.js";

import {isEmptyBody, authenticate} from "../../middlewares/index.js";

import {validateBody} from "../../decorators/index.js";

import { userSignupSchema, userSigninSchema } from "../../models/User.js";

const usersRouter = express.Router();

usersRouter.post("/register", isEmptyBody, validateBody(userSignupSchema), authController.register);

usersRouter.post("/login", isEmptyBody, validateBody(userSigninSchema), authController.login);

usersRouter.get("/current", authenticate, authController.getCurrent);

usersRouter.post("/logout", authenticate, authController.logout);

// usersRouter.post("/avatars")

export default usersRouter;
