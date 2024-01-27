import fs from "fs/promises";
import path from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import Jimp from "jimp";


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

const login = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(401, "Email or password invalid");
    }

    if(!user.verify) {
        throw HttpError(401, "Email not verify");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }

    const {_id: id} = user;
    const payload = {
        id
    };

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});
    await User.findByIdAndUpdate(id, {token});


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
  const {_id} = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Signout success",
  });
};

const updateAvatar = async (req, res) => {
  const {_id} = req.user;
  const avatarsDir = path.join(process.cwd(), 'public', 'avatars');
  

  if (!req.file) {
    throw new Error('Avatar file is required');
  }

  const resize = async fileDir => {
    const image = await Jimp.read(fileDir);
    image
      .resize(250, Jimp.AUTO)
      .cover(250, 250, Jimp.VERTICAL_ALIGN_MIDDLE)
      .write(fileDir);
  };

  const { path: tempURL, filename } = req.file;

  await resize(tempURL);
  const resultURL = path.join(avatarsDir, filename);

  await fs.rename(tempURL, resultURL);
  const avatarURL = path.join('avatars', filename);
  console.log(avatarURL)
 
  await User.findByIdAndUpdate(
    _id,
    { avatarURL, avatarImage: filename },
    { new: true }
  );

  res.status(200).json({
    avatarURL,
  });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
