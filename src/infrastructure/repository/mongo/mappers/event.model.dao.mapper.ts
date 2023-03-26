import { EventDao } from "../models/event.dao";
import { Event } from "../../../../application/domain/event";

export class EventModelDaoMapper {
  toEvent(eventModel: EventDao): Event {
    const event: Event = new Event();
    event.setId(eventModel?._id ?? "");
    event.setTitle(eventModel?.title ?? "");
    event.setDescription(eventModel?.description ?? "");
    event.setImg(eventModel?.img ?? "");
    event.setContent(eventModel?.img ?? "");
    return event;
  }

  toEvents(eventModels: EventDao[]): Event[] {
    return eventModels.map((eventModel) => this.toEvent(eventModel));
  }
}
