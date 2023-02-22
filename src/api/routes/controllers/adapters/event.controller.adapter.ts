import express, { NextFunction, Request, Response } from "express";
import { EventBody } from "../../../../../external-libraries/openapi/models/EventBody";
import { GeneratedIdResponse } from "../../../../../external-libraries/openapi/models/GeneratedIdResponse";
import { Event } from "../../../../application/domain/event";
import { GeneratedId } from "../../../../application/domain/generated-id";
import { HttpCode } from "../../../../application/domain/http-code";
import { CreateEventUseCasePort } from "../../../../application/ports/in/usecases/event/create-event.usecase.port";
import { CreateEventUseCase } from "../../../../application/usecases/event/create-event.usecase";
import { EventControllerMapper } from "../mappers/event.controller.mapper";
import { GeneratedIdMapper } from "../mappers/generated-id.mapper";
import { GetEventUseCasePort } from "../../../../application/ports/in/usecases/event/get-event.usecase.port";
import { GetEventUseCase } from "../../../../application/usecases/event/get-event.usecase";
import { EventResponse } from "../../../../../external-libraries/openapi/models/EventResponse";
import { GetEventsUseCasePort } from "../../../../application/ports/in/usecases/event/get-events.usecase.port";
import { GetEventsUseCase } from "../../../../application/usecases/event/get-events.usecase";

const router = express.Router();

const createEventUseCase: CreateEventUseCasePort = new CreateEventUseCase();
const getEventsUseCase: GetEventsUseCasePort = new GetEventsUseCase();
const getEventUseCase: GetEventUseCasePort = new GetEventUseCase();

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

router.get(
  "/:id",
  async (req: Request, res: Response<EventResponse>, next: NextFunction) => {
    try {
      const event: Event = await getEventUseCase.getEvent(req?.params?.id);
      const eventResponse: EventResponse =
        eventControllerMapper.toEventResponse(event);
      res.status(HttpCode.OK).json(eventResponse);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/",
  async (req: Request, res: Response<EventResponse[]>, next: NextFunction) => {
    try {
      const events: Event[] = await getEventsUseCase.getEvents(
        +(req?.query?.limit ?? 0),
        +(req?.query?.limit ?? 0)
      );
      const eventsResponse: EventResponse[] =
        eventControllerMapper.toEventsResponse(events);
      res.status(HttpCode.OK).json(eventsResponse);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
