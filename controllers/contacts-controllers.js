import contacts from "../models/contacts/index.js";
import HttpError  from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAll = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;  
  try {
    const result = await contacts.getContactById(id);
    if (!result) {
      throw HttpError(404, `"message": "Not found"`)
    };
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
    try {
      const result = await contacts.addContact(req.body);
      res.status(201).json(result);
    }
    catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
    try {
    const { id } = req.params;
    const result = await contacts.updateContactById(id, req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw HttpError(404, `Contact with id - ${id} not found`);
    }
    res.json({
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};

//npm run start:dev