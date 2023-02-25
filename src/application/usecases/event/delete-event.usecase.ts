import { DeleteEventUseCasePort } from "../../ports/in/usecases/event/delete-event.usecase.port";
import { checkObjectId } from "../../utils/check-objectid.util";
import { CustomError } from "../../exceptions/CustomError";
import { HttpMessage } from "../../domain/http-message";
import { HttpStatus } from "../../domain/http-status";
import { EventServicePort } from "../../ports/in/services/event.service.port";
import { EventService } from "../../services/event.service";

export class DeleteEventUseCase implements DeleteEventUseCasePort {
  private eventService: EventServicePort = new EventService();

  private checkPathParams(id: string) {
    if (!id || !checkObjectId(id)) {
      throw new CustomError(
        HttpMessage.MISSING_PARAMS,
        HttpStatus.BAD_REQUEST,
        {}
      );
    }
  }

  async deleteEvent(id: string): Promise<void> {
    this.checkPathParams(id);
    await this.eventService.deleteEvent(id);
  }
}
