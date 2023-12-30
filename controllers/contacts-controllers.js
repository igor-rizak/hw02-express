const contacts = require("../models/contacts");

const HttpError  = require("../helpers/HttpError");
const ctrlWrapper = require("../decorators/ctrlWrapper")

const { addSchema, addUpdateSchema } = require("../schemas/contacts-shemas");

const getAll = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;  
  console.log(req.params)
  console.log(contactId)
  try {
    const result = await contacts.getContactById(contactId);
    console.log(contactId);
    if (!result) {
      throw new HttpError(404, `Contact with id - ${contactId} not found`)
    };
    res.json({result});
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { error } = addUpdateSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { id } = req.params;
    const result = await contacts.updateById(id, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.findByIdAndRemove(id);
    if (!result) {
      throw new HttpError(404, `Contact with id - ${id} not found`);
    }
    res.json({
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};

// git push origin hw02-express