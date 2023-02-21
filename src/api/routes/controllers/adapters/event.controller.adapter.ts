import express, { Request, Response, NextFunction } from "express";
import { EventBody } from "../../../../../external-libraries/openapi/models/EventBody";
import { GeneratedIdResponse } from "../../../../../external-libraries/openapi/models/GeneratedIdResponse";
import { Event } from "../../../../application/domain/event";
import { GeneratedId } from "../../../../application/domain/generated-id";
import { HttpCode } from "../../../../application/domain/http-code";
import { CreateEventUseCasePort } from "../../../../application/ports/in/usecases/event/create-event.usecase.port";
import { CreateEventUseCase } from "../../../../application/usecases/event/create-event.usecase";
import { EventControllerMapper } from "../mappers/event.controller.mapper";
import { GeneratedIdMapper } from "../mappers/generated-id.mapper";
const router = express.Router();

const createEventUseCase: CreateEventUseCasePort = new CreateEventUseCase();

const eventControllerMapper = new EventControllerMapper();
const generatedIdMapper = new GeneratedIdMapper();

router.post(
  "/",
  async (
    req: Request<EventBody>,
    res: Response<GeneratedIdResponse>,
    next: NextFunction
  ) => {
    try {
      const event: Event = eventControllerMapper.toEvent(req?.body);
      const generatedId: GeneratedId = await createEventUseCase.createEvent(
        event
      );
      const generatedIdResponse: GeneratedIdResponse =
        generatedIdMapper.toGeneratedIdResponse(generatedId);
      res.status(HttpCode.CREATED).json(generatedIdResponse);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
