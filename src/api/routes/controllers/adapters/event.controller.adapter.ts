import express, { NextFunction, Request, Response, Router } from "express";
import { EventBody } from "../../../../../external-libraries/openapi/models/EventBody";
import { GeneratedIdResponse } from "../../../../../external-libraries/openapi/models/GeneratedIdResponse";
import { Event } from "../../../../application/domain/event";
import { GeneratedId } from "../../../../application/domain/generated-id";
import { HttpStatus } from "../../../../application/domain/http-status";
import { CreateEventUseCasePort } from "../../../../application/ports/in/usecases/event/create-event.usecase.port";
import { CreateEventUseCase } from "../../../../application/usecases/event/create-event.usecase";
import { EventControllerMapper } from "../mappers/event.controller.mapper";
import { GeneratedIdMapper } from "../mappers/generated-id.mapper";
import { GetEventUseCasePort } from "../../../../application/ports/in/usecases/event/get-event.usecase.port";
import { GetEventUseCase } from "../../../../application/usecases/event/get-event.usecase";
import { EventResponse } from "../../../../../external-libraries/openapi/models/EventResponse";
import { GetEventsUseCasePort } from "../../../../application/ports/in/usecases/event/get-events.usecase.port";
import { GetEventsUseCase } from "../../../../application/usecases/event/get-events.usecase";
import { UpdateEventUseCasePort } from "../../../../application/ports/in/usecases/event/update-event.usecase.port";
import { UpdateEventUseCase } from "../../../../application/usecases/event/update-event.usecase";
import { DeleteEventUseCase } from "../../../../application/usecases/event/delete-event.usecase";
import { DeleteEventUseCasePort } from "../../../../application/ports/in/usecases/event/delete-event.usecase.port";
import { useExtract } from "../../../middlewares/use-extract";

const router: Router = express.Router();
type idParamType = {
  id: string;
};

const createEventUseCase: CreateEventUseCasePort = new CreateEventUseCase();
const updateEventUseCase: UpdateEventUseCasePort = new UpdateEventUseCase();
const deleteEventUseCase: DeleteEventUseCasePort = new DeleteEventUseCase();
const getEventsUseCase: GetEventsUseCasePort = new GetEventsUseCase();
const getEventUseCase: GetEventUseCasePort = new GetEventUseCase();

const eventControllerMapper = new EventControllerMapper();
const generatedIdMapper = new GeneratedIdMapper();

router.post(
  "/",
  useExtract,
  async (
    req: Request<any, any, EventBody, any>,
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
      res.status(HttpStatus.CREATED).json(generatedIdResponse);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:id",
  async (
    req: Request<idParamType, any, any, any>,
    res: Response<EventResponse>,
    next: NextFunction
  ) => {
    try {
      const event: Event = await getEventUseCase.getEvent(req?.params?.id);
      const eventResponse: EventResponse =
        eventControllerMapper.toEventResponse(event);
      res.status(HttpStatus.OK).json(eventResponse);
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
      res.status(HttpStatus.OK).json(eventsResponse);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  "/:id",
  useExtract,
  async (
    req: Request<idParamType, any, EventBody, any>,
    res: Response<void>,
    next: NextFunction
  ) => {
    try {
      const event: Event = eventControllerMapper.toEvent(req?.body);
      await updateEventUseCase.updateEvent(req?.params?.id, event);
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
    res: Response<void>,
    next: NextFunction
  ) => {
    try {
      await deleteEventUseCase.deleteEvent(req?.params?.id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }
);

export default router;
