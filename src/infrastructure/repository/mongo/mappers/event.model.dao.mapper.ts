import { EventModel } from "../models/event.model";
import { Event } from "../../../../application/domain/event";

export class EventModelDaoMapper {
  toEventModel(event: Event | any): EventModel {
    const eventModel: EventModel = new EventModel();
    if (event instanceof Event) {
      eventModel.setTitle(event.getTitle());
      eventModel.setDescription(event.getDescription());
      eventModel.setImg(event.getImg());
      eventModel.setContent(eventModel.getContent() ?? "");
    } else {
      event.setId(event._id ?? "");
      event.setTitle(event.title ?? "");
      event.setDescription(event.description ?? "");
      event.setImg(event.img ?? "");
      event.setContent(event.content ?? "");
    }
    return eventModel;
  }
  toEvent(eventModel: EventModel): Event {
    const event: Event = new Event();
    event.setId(eventModel?.getId() ?? "");
    event.setTitle(eventModel?.getTitle() ?? "");
    event.setDescription(eventModel?.getDescription() ?? "");
    event.setImg(eventModel?.getImg() ?? "");
    event.setContent(eventModel?.getContent() ?? "");
    return event;
  }

  toEvents(eventModels: EventModel[]): Event[] {
    return eventModels.map((eventModel) => this.toEvent(eventModel));
  }
}
