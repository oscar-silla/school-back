import { HttpStatus } from "../../domain/http-status";
import { HttpMessage } from "../../domain/http-message";
import { LastNew } from "../../domain/last-new";
import { CustomError } from "../../exceptions/CustomError";
import { LastNewServicePort } from "../../ports/in/services/last-new.service.port";
import { ModifyLastNewUseCasePort } from "../../ports/in/usecases/story/modify-last-new-use-case.port";
import { LastNewService } from "../../services/last-new.service";
import { checkObjectId } from "../../utils/check-objectid.util";

export class ModifyLastNewUseCase implements ModifyLastNewUseCasePort {
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

  private checkBodyParams(lastNew: LastNew): void {
    if (
      !lastNew.getTitle() &&
      !lastNew.getDescription() &&
      !lastNew.getImg() &&
      !lastNew.getContent()
    ) {
      throw new CustomError(
        HttpMessage.MISSING_PARAMS,
        HttpStatus.BAD_REQUEST,
        {}
      );
    }
  }

  private checkParams(id: string, lastNew: LastNew): void {
    this.checkPathParams(id);
    this.checkBodyParams(lastNew);
  }

  async modifyLastNew(id: string, lastNew: LastNew): Promise<void> {
    this.checkParams(id, lastNew);
    return this.lastNewService.modifyLastNew(id, lastNew);
  }
}
