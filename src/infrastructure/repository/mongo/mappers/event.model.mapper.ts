import { EventModel } from "../models/EventModel";
import { Event } from "../../../../application/domain/event";

export class EventModelMapper {
  toEvent(eventModel: EventModel): Event {
    const event: Event = new Event();
    event.setId(eventModel?.id ?? "");
    event.setTitle(eventModel?.title ?? "");
    event.setDescription(eventModel?.description ?? "");
    event.setImg(eventModel?.img ?? "");
    event.setContent(eventModel?.img ?? "");
    return event;
  }
  toEvents(eventModels: EventModel[]): Event[] {
    return eventModels.map((eventModel) => this.toEvent(eventModel));
  }
}
