import { EventModel } from "../models/event.model";
import { Event } from "../../../../application/domain/event";
import { EventType } from "../types/event.type";

export class EventModelModelMapper {
  toEventModel(event: Event | EventType): EventModel {
    const eventModel: EventModel = new EventModel();
    if (event instanceof Event) {
      eventModel.setTitle(event.getTitle());
      eventModel.setDescription(event.getDescription());
      eventModel.setImg(event.getImg());
      eventModel.setContent(event.getContent() ?? "");
      eventModel.setColor(event.getColor() ?? "");
    } else {
      eventModel.setId(event?._id ?? "");
      eventModel.setTitle(event?.title ?? "");
      eventModel.setDescription(event?.description ?? "");
      eventModel.setImg(event?.img ?? "");
      eventModel.setContent(event?.content ?? "");
      eventModel.setColor(event?.color ?? "");
    }
    return eventModel;
  }
  toEventModels(events: Event[] | EventType[]): EventModel[] {
    return events.map((event: Event | EventType) => this.toEventModel(event));
  }
  toEvent(eventModel: EventModel): Event {
    const event: Event = new Event();
    event.setId(eventModel?.getId() ?? "");
    event.setTitle(eventModel?.getTitle() ?? "");
    event.setDescription(eventModel?.getDescription() ?? "");
    event.setImg(eventModel?.getImg() ?? "");
    event.setContent(eventModel?.getContent() ?? "");
    event.setColor(eventModel?.getColor() ?? "");
    return event;
  }

  toEvents(eventModels: EventModel[]): Event[] {
    return eventModels.map((eventModel: EventModel) =>
      this.toEvent(eventModel)
    );
  }
}
