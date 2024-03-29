import { HttpStatus } from "../domain/http-status";
import { HttpMessage } from "../domain/http-message";
import { CustomError } from "../exceptions/CustomError";
import { removeAccents } from "./remove-accents.util";

export const generateReference = (title: string) => {
  if (!title) {
    throw new CustomError(
      HttpMessage.MISSING_PARAMS,
      HttpStatus.BAD_REQUEST,
      {}
    );
  } else {
    let reference = removeAccents(title)?.toLowerCase();
    if (title.split(" ").length > 1) {
      reference = removeAccents(title.split(" ").join("_"))?.toLowerCase();
    }
    return reference;
  }
};
