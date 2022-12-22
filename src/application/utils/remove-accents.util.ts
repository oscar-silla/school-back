import { HttpCode } from "../domain/http-code";
import { HttpMessage } from "../domain/http-message";
import { CustomError } from "../exceptions/CustomError";

export const removeAccents = (str: string) => {
  try {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } catch (_error) {
    throw new CustomError(
      HttpMessage.INTERNAL_SERVER_ERROR,
      HttpCode.INTERNAL_SERVER_ERROR
    );
  }
};
