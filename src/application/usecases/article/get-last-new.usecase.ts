import { HttpStatus } from "../../domain/http-status";
import { HttpMessage } from "../../domain/http-message";
import { LastNew } from "../../domain/last-new";
import { CustomError } from "../../exceptions/CustomError";
import { LastNewServicePort } from "../../ports/in/services/last-new.service.port";
import { GetLastNewUseCasePort } from "../../ports/in/usecases/story/get-last-new-use-case.port";
import { LastNewService } from "../../services/last-new.service";
import { checkObjectId } from "../../utils/check-objectid.util";

export class GetLastNewUseCase implements GetLastNewUseCasePort {
  private lastNewService: LastNewServicePort = new LastNewService();

  private checkPathParams(id: string): void {
    if (!id || !checkObjectId(id)) {
      throw new CustomError(
        HttpMessage.MISSING_PARAMS,
        HttpStatus.BAD_REQUEST,
        {}
      );
    }
  }

  async getLastNew(id: string): Promise<LastNew> {
    this.checkPathParams(id);
    return await this.lastNewService.getLastNew(id);
  }
}
