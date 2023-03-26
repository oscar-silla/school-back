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
import { GetSlogansUseCase } from "../../../../application/usecases/slogan/get-slogans.usecase";
import { GetSlogansUseCasePort } from "../../../../application/ports/in/usecases/slogan/get-slogans.usecase.port";

const router = express.Router();

const saveSloganUseCase: SaveSloganUseCasePort = new SaveSloganUseCase();
const getSlogansUseCase: GetSlogansUseCasePort = new GetSlogansUseCase();

const sloganControllerMapper: SloganControllerMapper =
  new SloganControllerMapper();
const generatedIdMapper: GeneratedIdMapper = new GeneratedIdMapper();

router.post(
  "/",
  async (
    req: Request<any, any, SloganBody, any>,
    res: Response<GeneratedIdResponse>,
    next: NextFunction
  ) => {
    try {
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
  async (req: Request, res: Response<SloganResponse[]>, next: NextFunction) => {
    try {
      const slogans: Slogan[] = await getSlogansUseCase.execute();
      const sloganResponse: SloganResponse[] =
        sloganControllerMapper.toSlogansResponse(slogans);
      res.status(HttpStatus.OK).json(sloganResponse);
    } catch (err) {
      next(err);
    }
  }
);
