import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/HttpError.js";

const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  const isCorrectId = isValidObjectId(contactId);
  if (!isCorrectId) {
    const error = new HttpError(
      400,
      `${contactId} is not correct id format`
    );
    return next(error);
  }
  next();
};

export default isValidId;