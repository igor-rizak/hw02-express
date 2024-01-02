import express from "express";

import contactsController from "../../controllers/contacts-controllers.js";

import { isEmptyBody } from "../../middlewares/index.js";

import  validateBody  from "../../decorators/validateBody.js";

import {contactsAddSchema, contactsUpdateScheme} from "../../schemas/contacts-shemas.js"

const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:id", contactsController.getById);

router.post("/", isEmptyBody, validateBody(contactsAddSchema), contactsController.add);

router.put("/:id", isEmptyBody, validateBody(contactsUpdateScheme), contactsController.updateById);

router.delete("/:id", contactsController.deleteById)

export default router;