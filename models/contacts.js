import { Schema, model } from "mongoose";

import Joi from "joi";

import {handleSaveError, addUpdateSettings} from "./hooks.js";

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email:  {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
  },
        favorite: {
        type: Boolean,
        default: false,
    },

}, {versionKey: false, timestamps: true});

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", addUpdateSettings);

contactSchema.post("findOneAndUpdate", handleSaveError);

export const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

export const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required()
});

const Contact = model("contact", contactSchema);

export default Contact;