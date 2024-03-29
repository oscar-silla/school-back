import express, { NextFunction, Request, Response } from "express";
import { GeneratedIdResponse } from "../../../../../external-libraries/openapi/models/GeneratedIdResponse";
import { UserBody } from "../../../../../external-libraries/openapi/models/UserBody";
import { UserResponse } from "../../../../../external-libraries/openapi/models/UserResponse";
import { GeneratedId } from "../../../../application/domain/generated-id";
import { HttpStatus } from "../../../../application/domain/http-status";
import { User } from "../../../../application/domain/user";
import { CreateUserUseCasePort } from "../../../../application/ports/in/usecases/user/create-user.usecase.port";
import { DeleteUserUseCasePort } from "../../../../application/ports/in/usecases/user/delete-user.usecase.port";
import { GetAllUsersUseCasePort } from "../../../../application/ports/in/usecases/user/get-all-users.usecase.port";
import { GetUserUseCasePort } from "../../../../application/ports/in/usecases/user/get-user.usecase.port";
import { CreateUserUseCase } from "../../../../application/usecases/user/create-user.usecase";
import { DeleteUserUseCase } from "../../../../application/usecases/user/delete-user.usecase";
import { GetAllUsersUseCase } from "../../../../application/usecases/user/get-all-users.usecase";
import { GetUserUseCase } from "../../../../application/usecases/user/get-user.usecase";
import { useExtract } from "../../../middlewares/use-extract";
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
      res.status(HttpStatus.CREATED).json(response);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:id",
  useExtract,
  async (req: Request, res: Response<UserResponse>, next: NextFunction) => {
    try {
      const user = await getUserUseCase.getUser(req?.params?.id);
      const userResponse = userMapper.toUserResponse(user);
      res.status(HttpStatus.OK).json(userResponse);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/",
  useExtract,
  async (_req: Request, res: Response<UserResponse[]>, next: NextFunction) => {
    try {
      const users: User[] = await getAllUsersUseCase.getAllUsers();
      const usersResponse: UserResponse[] = userMapper.toUsersResponse(users);
      res.status(HttpStatus.OK).json(usersResponse);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:id",
  useExtract,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deleteUserUseCase.deleteUser(req?.params?.id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }
);

export default router;
