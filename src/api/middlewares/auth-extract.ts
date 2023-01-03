import { NextFunction } from "express";
import jwt from "jsonwebtoken";

type AuthorizatedRequest = Express.Request & { authorization: string };

export const authExtract = (
  req: AuthorizatedRequest,
  res: Response,
  next: NextFunction
) => {
  const auth: string = req?.authorization ?? "";

  if (auth && auth.toLowerCase().startsWith("bearer")) {
    const token = auth.split(" ")[1];
    if (token && process.env?.SECRET) {
      const decodeToken = jwt.verify(token, process.env.SECRET);
      //TODO: Login previously finish this code
    }
  }
};
