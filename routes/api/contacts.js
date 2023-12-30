const express = require('express');

// const isEmptyBody = require("../../middlewares/isEmptyBody");
const validation = require("../../middlewares/validation")
const ctrlWrapper = require("../../decorators/ctrlWrapper.js")
const ctrl = require("../../controllers/contacts-controllers");
const addSchema = require("../../schemas/contacts-shemas.js");

const validationMiddleware = validation(addSchema);

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post('/', validationMiddleware, ctrlWrapper(ctrl.add));

// router.put('/:contactId', isEmptyBody, ctrl.updateById);

router.delete('/:contactId', ctrlWrapper(ctrl.deleteById));


module.exports = router;
