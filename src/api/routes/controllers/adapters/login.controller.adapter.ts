import express, { NextFunction, Request, Response } from "express";
import { LoginBody } from "../../../../../external-libraries/openapi/models/LoginBody";
import { LoginResponse } from "../../../../../external-libraries/openapi/models/LoginResponse";
import { HttpStatus } from "../../../../application/domain/http-status";
import { LoginCredentials } from "../../../../application/domain/login-credentials";
import { Token } from "../../../../application/domain/token";
import { LoginUseCasePort } from "../../../../application/ports/in/usecases/login/login.usecase.port";
import { LoginUseCase } from "../../../../application/usecases/login/login.usecase";
import { LoginControllerMapper } from "../mappers/login.controller.mapper";

const router = express.Router();

const loginUseCase: LoginUseCasePort = new LoginUseCase();
const loginMapper: LoginControllerMapper = new LoginControllerMapper();

router.post(
  "/",
  async (
    req: Request<LoginBody>,
    res: Response<LoginResponse>,
    next: NextFunction
  ) => {
    try {
      const loginCredentials: LoginCredentials = loginMapper.toLoginCredentials(
        req?.body
      );
      const token: Token = await loginUseCase.login(loginCredentials);
      const loginResponse: LoginResponse = loginMapper.toLoginResponse(
        token.get()
      );
      res.status(HttpStatus.OK).json(loginResponse);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
