import { EventModel } from "../models/event.model";
import { Event } from "../../../../application/domain/event";
import { EventType } from "../types/event.type";

export class EventModelModelMapper {
  toEventModel(event: Event | EventType): EventModel | null {
    const eventModel: EventModel = new EventModel();
    if (event instanceof Event) {
      eventModel.setTitle(event.getTitle());
      eventModel.setDescription(event.getDescription());
      eventModel.setImg(event.getImg());
      eventModel.setContent(event.getContent() ?? "");
      eventModel.setColor(event.getColor() ?? "");
    } else if (event?._id) {
      eventModel.setId(event._id);
      eventModel.setTitle(event.title);
      eventModel.setDescription(event.description);
      eventModel.setImg(event.img);
      eventModel.setContent(event?.content ?? "");
      eventModel.setColor(event.color);
    } else {
      return null;
    }
    return eventModel;
  }
  toEventModels(events: Event[] | EventType[]): EventModel[] | null {
    return events.length > 0
      ? events.map((event: Event | EventType) => this.toEventModel(event)!)
      : null;
  }
  toEvent(eventModel: EventModel | null): Event | null {
    if (!eventModel) {
      return null;
    }
    const event: Event = new Event();
    event.setId(eventModel.getId()!);
    event.setTitle(eventModel.getTitle());
    event.setDescription(eventModel.getDescription());
    event.setImg(eventModel.getImg());
    event.setContent(eventModel?.getContent() ?? "");
    event.setColor(eventModel.getColor());
    return event;
  }

  toEvents(eventModels: EventModel[] | null): Event[] | null {
    return eventModels && eventModels.length > 0
      ? eventModels.map((eventModel: EventModel) => this.toEvent(eventModel)!)
      : null;
  }
}
