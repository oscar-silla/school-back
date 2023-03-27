import { HttpMessage } from "../../domain/http-message";
import { HttpStatus } from "../../domain/http-status";
import { CustomError } from "../../exceptions/CustomError";
import { SloganServicePort } from "../../ports/in/services/slogan.service.port";
import { SloganService } from "../../services/slogan.service";
import { checkObjectId } from "../../utils/check-objectid.util";

export class DeleteSloganUseCase implements DeleteSloganUseCase {
  private sloganService: SloganServicePort = new SloganService();

  private checkPathParams(id: string) {
    if (!id || !checkObjectId(id)) {
      throw new CustomError(
        HttpMessage.MISSING_PARAMS,
        HttpStatus.BAD_REQUEST,
        {}
      );
    }
  }

  async execute(id: string): Promise<void> {
    this.checkPathParams(id);
    await this.sloganService.deleteSloganById(id);
  }
}
