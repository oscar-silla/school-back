import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HttpStatus } from "../../application/domain/http-status";
import { HttpMessage } from "../../application/domain/http-message";
import { CustomError } from "../../application/exceptions/CustomError";

export const useExtract = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const auth: string = req?.headers["authorization"] ?? "";

  if (auth && auth.toLowerCase().startsWith("bearer")) {
    const token = auth.split(" ")[1];
    if (token && process.env?.SECRET) {
      try {
        jwt.verify(token, process.env.SECRET);
      } catch (err) {
        throwError();
      }
    } else {
      throwError();
    }
  } else {
    throwError();
  }
  next();
};

const throwError = () => {
  throw new CustomError(HttpMessage.UNAUTHORIZED, HttpStatus.UNAUTHORIZED, {});
};
