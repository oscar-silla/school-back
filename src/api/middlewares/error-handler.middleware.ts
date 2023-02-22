import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../application/exceptions/CustomError";

function handleError(
  err: TypeError | CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  let customError = err;
  if (!(err instanceof CustomError)) {
    customError = new CustomError(
      "Oh no, this is embarrasing. We are having troubles my friend"
    );
  }
  res.status((customError as CustomError).status).send(customError);
}

export default handleError;
