import express, { NextFunction, Request, Response } from "express";
import { SaveSloganUseCasePort } from "../../../../application/ports/in/usecases/slogan/save-slogan.usecase.port";
import { SaveSloganUseCase } from "../../../../application/usecases/slogan/save-slogan.usecase";
import { SloganControllerMapper } from "../mappers/slogan.controller.mapper";
import { Slogan } from "../../../../application/domain/slogan";
import { SloganBody } from "../../../../../external-libraries/openapi/models/SloganBody";
import { GeneratedIdResponse } from "../../../../../external-libraries/openapi/models/GeneratedIdResponse";
import { GeneratedId } from "../../../../application/domain/generated-id";
import { GeneratedIdMapper } from "../mappers/generated-id.mapper";
import { HttpStatus } from "../../../../application/domain/http-status";
import { SloganResponse } from "../../../../../external-libraries/openapi/models/SloganResponse";
import { GetFirstSloganUseCase } from "../../../../application/usecases/slogan/get-first-slogan-use.case";
import { GetFirstSloganUseCasePort } from "../../../../application/ports/in/usecases/slogan/get-first-slogan-use-case.port";
import { GetSloganUseCase } from "../../../../application/usecases/slogan/get-slogan.usecase";
import { GetSloganUseCasePort } from "../../../../application/ports/in/usecases/slogan/get-slogan.usecase.port";
import { ModifySloganUseCasePort } from "../../../../application/ports/in/usecases/slogan/modify-slogan.usecase.port";
import { ModifySloganUseCase } from "../../../../application/usecases/slogan/modify-slogan.usecase";
import { DeleteSloganUseCasePort } from "../../../../application/ports/in/usecases/slogan/delete-slogan.usecase.port";
import { DeleteSloganUseCase } from "../../../../application/usecases/slogan/delete-slogan.usecase";
import { useExtract } from "../../../middlewares/use-extract";

const router = express.Router();

type idParamType = {
  id: string;
};

const saveSloganUseCase: SaveSloganUseCasePort = new SaveSloganUseCase();
const getFirstSloganUseCase: GetFirstSloganUseCasePort =
  new GetFirstSloganUseCase();
const getSloganUseCase: GetSloganUseCasePort = new GetSloganUseCase();
const modifySloganUseCase: ModifySloganUseCasePort = new ModifySloganUseCase();
const deleteSloganUseCase: DeleteSloganUseCasePort = new DeleteSloganUseCase();

const sloganControllerMapper: SloganControllerMapper =
  new SloganControllerMapper();
const generatedIdMapper: GeneratedIdMapper = new GeneratedIdMapper();

router.post(
  "/",
  useExtract,
  async (
    req: Request<any, any, SloganBody, any>,
    res: Response<GeneratedIdResponse>,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log("POST /slogans");
      const slogan: Slogan = sloganControllerMapper.toSlogan(req.body);
      const generatedId: GeneratedId = await saveSloganUseCase.execute(slogan);
      const generatedIdResponse: GeneratedIdResponse =
        await generatedIdMapper.toGeneratedIdResponse(generatedId);
      res.status(HttpStatus.CREATED).json(generatedIdResponse);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/",
  async (
    _req: Request,
    res: Response<SloganResponse>,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log("GET /slogans");
      const slogan: Slogan = await getFirstSloganUseCase.execute();
      const sloganResponse: SloganResponse =
        sloganControllerMapper.toSloganResponse(slogan);
      res.status(HttpStatus.OK).json(sloganResponse);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:id",
  async (
    req: Request<any, any, idParamType, any>,
    res: Response<SloganResponse>,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log("GET /slogans/:id");
      const slogan: Slogan = await getSloganUseCase.execute(req?.params?.id);
      const sloganResponse: SloganResponse =
        sloganControllerMapper.toSloganResponse(slogan);
      res.status(HttpStatus.OK).json(sloganResponse);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  "/:id",
  useExtract,
  async (
    req: Request<idParamType, any, SloganBody, any>,
    res: Response<void>,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log("PATCH /slogans/:id");
      const slogan: Slogan = sloganControllerMapper.toSlogan(req?.body);
      const id: string = req?.params?.id;
      await modifySloganUseCase.execute(id, slogan);
      res.status(HttpStatus.OK).send();
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:id",
  useExtract,
  async (
    req: Request<idParamType, any, any, any>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log("DELETE /slogans/:id");
      const id: string = req?.params?.id;
      await deleteSloganUseCase.execute(id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }
);

export default router;
