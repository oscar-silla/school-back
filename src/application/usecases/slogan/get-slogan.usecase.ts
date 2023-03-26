import { HttpMessage } from "../../domain/http-message";
import { HttpStatus } from "../../domain/http-status";
import { Slogan } from "../../domain/slogan";
import { CustomError } from "../../exceptions/CustomError";
import { SloganServicePort } from "../../ports/in/services/slogan.service.port";
import { GetSloganUseCasePort } from "../../ports/in/usecases/slogan/get-slogan.usecase.port";
import { SloganService } from "../../services/slogan.service";
import { checkObjectId } from "../../utils/check-objectid.util";

export class GetSloganUseCase implements GetSloganUseCasePort {
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

  async execute(id: string): Promise<Slogan> {
    this.checkPathParams(id);
    return await this.sloganService.findSloganById(id);
  }
}
