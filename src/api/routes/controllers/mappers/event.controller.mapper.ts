import { EventBody } from "../../../../../external-libraries/openapi/models/EventBody";
import { Event } from "../../../../application/domain/event";

export class EventControllerMapper {
  toEvent(eventBody: EventBody): Event {
    const event: Event = new Event();
    event.setTitle(eventBody.title ?? "");
    event.setImg(eventBody.img ?? "");
    event.setDescription(eventBody.description ?? "");
    event.setContent(eventBody.content ?? "");
    return event;
  }
}
