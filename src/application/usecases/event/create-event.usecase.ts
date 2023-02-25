import { Event } from "../../domain/event";
import { GeneratedId } from "../../domain/generated-id";
import { HttpStatus } from "../../domain/http-status";
import { HttpMessage } from "../../domain/http-message";
import { CustomError } from "../../exceptions/CustomError";
import { EventServicePort } from "../../ports/in/services/event.service.port";
import { CreateEventUseCasePort } from "../../ports/in/usecases/event/create-event.usecase.port";
import { EventService } from "../../services/event.service";

export class CreateEventUseCase implements CreateEventUseCasePort {
  private eventService: EventServicePort = new EventService();

  private checkBodyParams(event: Event): void {
    if (!event.getTitle() || !event.getImg() || !event.getDescription()) {
      throw new CustomError(
        HttpMessage.MISSING_PARAMS,
        HttpStatus.BAD_REQUEST,
        {}
      );
    }
  }

  async createEvent(event: Event): Promise<GeneratedId> {
    this.checkBodyParams(event);
    return this.eventService.createEvent(event);
  }
}
