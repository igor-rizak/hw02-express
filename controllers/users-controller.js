import fs from "fs/promises";
import path from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";


import User from "../models/User.js";

import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }
  const url = gravatar.url(email, { s: "250" });
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: url,
  });

  res.json({
    username: newUser.username,
    email: newUser.email,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const { _id: id } = user;
  const payload = {
    id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });

  res.json({
    ResponseBody: {
      token,
      user: {
        email: email,
        subscription: "starter",
      },
    },
  });
};

const getCurrent = async (req, res) => {
  const { username, email } = req.user;

  res.json({
    username,
    email,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Signout success",
  });
};

const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, 'Avatar file is required');
  }

  const { _id: owner } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarsPath, filename);
  await fs.rename(oldPath, newPath);
  const avatarURL = newPath;
  const result = await User.findOneAndUpdate({ _id, owner }, { avatarURL });
  if (!result) {
    throw HttpError(401, "Not authorized");
  }

  res.json({
    ResponseBody: {
      status: 200,
      avatarURL: avatarURL,
    },
  });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
