import { UpdateEventUseCasePort } from "../../ports/in/usecases/event/update-event.usecase.port";
import { EventServicePort } from "../../ports/in/services/event.service.port";
import { EventService } from "../../services/event.service";
import { Event } from "../../domain/event";
import { checkObjectId } from "../../utils/check-objectid.util";
import { CustomError } from "../../exceptions/CustomError";
import { HttpMessage } from "../../domain/http-message";
import { HttpStatus } from "../../domain/http-status";

export class UpdateEventUseCase implements UpdateEventUseCasePort {
  private eventService: EventServicePort = new EventService();

  private checkPathParams(id: string): void {
    if (!id || !checkObjectId(id)) {
      throw new CustomError(
        HttpMessage.MISSING_PARAMS,
        HttpStatus.BAD_REQUEST,
        {}
      );
    }
  }

  private checkBodyParams(event: Event): void {
    if (
      !event.getTitle() &&
      !event.getDescription() &&
      !event.getImg() &&
      !event.getContent()
    ) {
      throw new CustomError(
        HttpMessage.MISSING_PARAMS,
        HttpStatus.BAD_REQUEST,
        {}
      );
    }
  }

  private checkParams(id: string, event: Event) {
    this.checkPathParams(id);
    this.checkBodyParams(event);
  }

  async updateEvent(id: string, event: Event): Promise<void> {
    this.checkParams(id, event);
    await this.eventService.updateEvent(id, event);
  }
}
