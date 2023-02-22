import {GetEventUseCasePort} from "../../ports/in/usecases/event/get-event.usecase.port";
import {checkObjectId} from "../../utils/check-objectid.util";
import {CustomError} from "../../exceptions/CustomError";
import {HttpMessage} from "../../domain/http-message";
import {HttpCode} from "../../domain/http-code";
import {EventServicePort} from "../../ports/in/services/event.service.port";
import {EventService} from "../../services/event.service";
import {Event} from "../../domain/event";

export class GetEventUseCase implements GetEventUseCasePort {
    private eventService: EventServicePort = new EventService();

    private checkPathParams(id: string): void {
        if (!id || !checkObjectId(id)) {
            throw new CustomError(HttpMessage.MISSING_PARAMS, HttpCode.BAD_REQUEST, {})
        }
    }

    async getEvent(id: string): Promise<Event> {
        this.checkPathParams(id);
        return await this.eventService.getEvent(id);
    }
}