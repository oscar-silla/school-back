import express, { Request, Response, NextFunction } from "express";
import { EventBody } from "../../../../../external-libraries/openapi/models/EventBody";
import { GeneratedIdResponse } from "../../../../../external-libraries/openapi/models/GeneratedIdResponse";
import { Event } from "../../../../application/domain/event";
import { EventControllerMapper } from "../mappers/event.controller.mapper";
const router = express.Router();

const eventControllerMapper: EventControllerMapper =
  new EventControllerMapper();

router.post(
  "/",
  async (
    req: Request<EventBody>,
    res: Response<GeneratedIdResponse>,
    next: NextFunction
  ) => {
    try {
      const event: Event = eventControllerMapper.toEvent(req?.body);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
