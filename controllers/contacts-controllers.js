import Contacts from "../models/contacts.js";

import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contacts.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "username");
    res.json(result);
};

const getById = async (req, res) => {
    const { id: _id } = req.params;
    const {_id: owner} = req.user;
    const result = await Contacts.findOne({_id, owner});
    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.json(result);
};

const add = async (req, res) => {
    const {_id: owner} = req.user;
    const result = await Contacts.create({...req.body, owner});
    res.status(201).json(result)
}

const updateById = async (req, res) => {
    const { id: _id } = req.params;
    const {_id: owner} = req.user;
    const result = await Contacts.findByIdAndUpdate({_id, owner}, req.body);
    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.json(result);
}

const deleteById = async (req, res) => {
    const { id: _id } = req.params;
    const {_id: owner} = req.user;
    const result = await Contacts.findByIdAndDelete({_id, owner});
    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found`);
  }
      res.json({
        message: "Delete success"
    })
}

export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
}