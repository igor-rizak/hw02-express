const express = require('express');
const router = express.Router();
// const contacts = require("../../models/index.js");

const ctrl = require("../../controllers/contacts-controllers");

// const {validateBody} = require("../../middlewares");

// const schemas = require("../../schemas/contacts");


// router.get('/', async (req, res, next) => {
//   const result = await contacts.listContacts();
//   res.json(result);
// })

router.get("/", ctrl.getAll);

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
