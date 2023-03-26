import { HttpMessage } from "../../domain/http-message";
import { HttpStatus } from "../../domain/http-status";
import { Slogan } from "../../domain/slogan";
import { CustomError } from "../../exceptions/CustomError";
import { SloganServicePort } from "../../ports/in/services/slogan.service.port";
import { ModifySloganUseCasePort } from "../../ports/in/usecases/slogan/modify-slogan.usecase.port";
import { SloganService } from "../../services/slogan.service";
import { checkObjectId } from "../../utils/check-objectid.util";

export class ModifySloganUseCase implements ModifySloganUseCasePort {
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

  private checkBodyParams(slogan: Slogan) {
    if (
      !slogan.getTitle() &&
      !slogan.getDescription() &&
      !slogan.getImg() &&
      !slogan.getTextButton() &&
      !slogan.getUrl()
    ) {
      throw new CustomError(
        HttpMessage.MISSING_PARAMS,
        HttpStatus.BAD_REQUEST,
        {}
      );
    }
  }

  private checkParams(id: string, slogan: Slogan) {
    this.checkPathParams(id);
    this.checkBodyParams(slogan);
  }

  async execute(id: string, slogan: Slogan): Promise<void> {
    this.checkParams(id, slogan);
    this.sloganService.modifySloganById(id, slogan);
  }
}
