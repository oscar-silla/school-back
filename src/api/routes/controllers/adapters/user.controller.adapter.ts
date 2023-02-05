import express, { NextFunction, Request, Response } from "express";
import { GeneratedIdResponse } from "../../../../../external-libraries/openapi/models/GeneratedIdResponse";
import { UserBody } from "../../../../../external-libraries/openapi/models/UserBody";
import { UserResponse } from "../../../../../external-libraries/openapi/models/UserResponse";
import { GeneratedId } from "../../../../application/domain/generated-id";
import { HttpCode } from "../../../../application/domain/http-code";
import { User } from "../../../../application/domain/user";
import { CreateUserUseCasePort } from "../../../../application/ports/in/usecases/user/create-user.usecase.port";
import { DeleteUserUseCasePort } from "../../../../application/ports/in/usecases/user/delete-user.usecase.port";
import { GetAllUsersUseCasePort } from "../../../../application/ports/in/usecases/user/get-all-users.usecase.port";
import { GetUserUseCasePort } from "../../../../application/ports/in/usecases/user/get-user.usecase.port";
import { CreateUserUseCase } from "../../../../application/usecases/user/create-user.usecase";
import { DeleteUserUseCase } from "../../../../application/usecases/user/delete-user.usecase";
import { GetAllUsersUseCase } from "../../../../application/usecases/user/get-all-users.usecase";
import { GetUserUseCase } from "../../../../application/usecases/user/get-user.usecase";
import { authExtract } from "../../../middlewares/auth-extract";
import { GeneratedIdMapper } from "../mappers/generated-id.mapper";
import { UserControllerMapper } from "../mappers/user.controller.mapper";
const router = express.Router();

const createUserUseCase: CreateUserUseCasePort = new CreateUserUseCase();
const getUserUseCase: GetUserUseCasePort = new GetUserUseCase();
const getAllUsersUseCase: GetAllUsersUseCasePort = new GetAllUsersUseCase();
const deleteUserUseCase: DeleteUserUseCasePort = new DeleteUserUseCase();

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

router.get(
  "/:id",
  authExtract,
  async (req: Request, res: Response<UserResponse>, next: NextFunction) => {
    try {
      const user = await getUserUseCase.getUser(req?.params?.id);
      const userResponse = userMapper.toUserResponse(user);
      res.status(HttpCode.OK).json(userResponse);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/",
  authExtract,
  async (_req: Request, res: Response<UserResponse[]>, next: NextFunction) => {
    try {
      const users: User[] = await getAllUsersUseCase.getAllUsers();
      const usersResponse: UserResponse[] = userMapper.toUsersResponse(users);
      res.status(HttpCode.OK).json(usersResponse);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:id",
  authExtract,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deleteUserUseCase.deleteUser(req?.params?.id);
      res.status(HttpCode.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }
);

export default router;
