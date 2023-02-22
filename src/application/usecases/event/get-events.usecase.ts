import { GetEventsUseCasePort } from "../../ports/in/usecases/event/get-events.usecase.port";
import { EventServicePort } from "../../ports/in/services/event.service.port";
import { EventService } from "../../services/event.service";
import { Event } from "../../domain/event";

export class GetEventsUseCase implements GetEventsUseCasePort {
  private eventService: EventServicePort = new EventService();

  async getEvents(limit: number, page: number): Promise<Event[]> {
    return await this.eventService.getEvents(limit, page);
  }
}
