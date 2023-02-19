import { Event } from "../../domain/event";
import { GeneratedId } from "../../domain/generated-id";
import { HttpCode } from "../../domain/http-code";
import { HttpMessage } from "../../domain/http-message";
import { CustomError } from "../../exceptions/CustomError";
import { CreateEventUseCasePort } from "../../ports/in/usecases/event/create-event.usecase.port";

export class CreateEventUseCase implements CreateEventUseCasePort {
  private checkBodyParams(event: Event): void {
    if (!event.getTitle() || !event.getImg() || !event.getDescription()) {
      throw new CustomError(
        HttpMessage.MISSING_PARAMS,
        HttpCode.BAD_REQUEST,
        {}
      );
    }
  }

  async createEvent(event: Event): Promise<GeneratedId> {
    this.checkBodyParams(event);
    return;
  }
}
