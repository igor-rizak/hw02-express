import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar";

import Contact from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const avatarsPath = path.resolve("public", "avatars");


const getAll = async (req, res) => {
    const {_id: owner} = req.user;
    const {page = 1, limit = 10} = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "username");

    res.json(result);
}

const getById = async (req, res) => {
    const { id: _id } = req.params;
    const {_id: owner} = req.user;
    const result = await Contact.findOne({_id, owner});
    if (!result) {
        throw HttpError(404, `id=${id} is not defined`);
    }

    res.json(result);
}

const add = async (req, res) => {
    const {_id: owner} = req.user;
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarsPath, filename);
    await fs.rename(oldPath, newPath);
    const avatar = path.join("avatar", filename);
    const result = await Contact.create({...req.body, avatar, owner});

    res.status(201).json(result)
}


const updateById = async (req, res) => {
    const { id: _id } = req.params;
    const {_id: owner} = req.user;
    const result = await Contact.findOneAndUpdate({_id, owner}, req.body);
    if (!result) {
        throw HttpError(404, `id=${id} is not defined`);
    }

    res.json(result);
}

const deleteById = async (req, res) => {
    const { id: _id } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findOneAndDelete({ _id, owner });
    if (!result) {
        throw HttpError(404, `id=${id} is not defined`);
    }

    res.json({
        message: "Delete success"
    })
};


export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
}