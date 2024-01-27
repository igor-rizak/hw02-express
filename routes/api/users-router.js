import express from "express";

import usersController from "../../controllers/users-controller.js";
import {isEmptyBody, authenticate, upload} from "../../middlewares/index.js";
import {validateBody} from "../../decorators/index.js";
import { userSignupSchema, userSigninSchema, userEmailSchema } from "../../models/User.js";

const usersRouter = express.Router();

usersRouter.post("/register", isEmptyBody, validateBody(userSignupSchema), usersController.register);

usersRouter.get("/verify/:verificationToken", usersController.verify)

usersRouter.post("/verify", isEmptyBody, validateBody(userEmailSchema), usersController.resendVerifyEmail)

usersRouter.post("/login", isEmptyBody, validateBody(userSigninSchema), usersController.login);

usersRouter.get("/current", authenticate, usersController.getCurrent);

usersRouter.post("/logout", authenticate, usersController.logout);

usersRouter.patch("/avatars/", authenticate, upload.single("avatar"), usersController.updateAvatar)

export default usersRouter;
