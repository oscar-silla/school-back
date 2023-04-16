import { EventBody } from "../../../../../external-libraries/openapi/models/EventBody";
import { Event } from "../../../../application/domain/event";
import { EventResponse } from "../../../../../external-libraries/openapi/models/EventResponse";

export class EventControllerMapper {
  toEvent(eventBody: EventBody): Event {
    const event: Event = new Event();
    event.setTitle(eventBody.title ?? "");
    event.setImg(eventBody.img ?? "");
    event.setDescription(eventBody.description ?? "");
    event.setContent(eventBody.content ?? "");
    event.setColor(eventBody.color ?? "");
    return event;
  }

  toEventResponse(event: Event): EventResponse {
    const eventResponse: EventResponse = new EventResponse();
    eventResponse.id = event.getId();
    eventResponse.title = event.getTitle();
    eventResponse.description = event.getDescription();
    eventResponse.img = event.getImg();
    eventResponse.content = event.getContent();
    eventResponse.color = event.getColor();
    return eventResponse;
  }

  toEventsResponse(events: Event[]): EventResponse[] {
    return events.map((event: Event) => this.toEventResponse(event));
  }
}
