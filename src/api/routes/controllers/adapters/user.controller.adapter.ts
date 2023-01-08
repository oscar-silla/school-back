import express, { NextFunction, Request, Response } from "express";
import { GeneratedIdResponse } from "../../../../../external-libraries/openapi/models/GeneratedIdResponse";
import { UserBody } from "../../../../../external-libraries/openapi/models/UserBody";
import { GeneratedId } from "../../../../application/domain/generated-id";
import { HttpCode } from "../../../../application/domain/http-code";
import { User } from "../../../../application/domain/user";
import { CreateUserUseCasePort } from "../../../../application/ports/in/usecases/user/create-user.usecase.port";
import { CreateUserUseCase } from "../../../../application/usecases/user/create-user.usecase";
import { GeneratedIdMapper } from "../mappers/generated-id.mapper";
import { UserControllerMapper } from "../mappers/user.controller.mapper";
const router = express.Router();

const createUserUseCase: CreateUserUseCasePort = new CreateUserUseCase();

const userMapper = new UserControllerMapper();
const generatedIdMapper = new GeneratedIdMapper();

router.post(
  "/",
  async (
    req: Request<UserBody>,
    res: Response<GeneratedIdResponse>,
    next: NextFunction
  ) => {
    try {
      const user: User = userMapper.toUser(req?.body);
      const generatedId: GeneratedId = await createUserUseCase.createUser(user);
      const response: GeneratedIdResponse =
        generatedIdMapper.toGeneratedIdResponse(generatedId);
      res.status(HttpCode.CREATED).json(response);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
