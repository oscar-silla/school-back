import { SaveSloganUseCasePort } from "../../ports/in/usecases/slogan/save-slogan.usecase.port";
import { Slogan } from "../../domain/slogan";
import { GeneratedId } from "../../domain/generated-id";
import { SloganServicePort } from "../../ports/in/services/slogan.service.port";
import { CustomError } from "../../exceptions/CustomError";
import { HttpMessage } from "../../domain/http-message";
import { HttpStatus } from "../../domain/http-status";
import { SloganService } from "../../services/slogan.service";

export class SaveSloganUseCase implements SaveSloganUseCasePort {
  private sloganService: SloganServicePort = new SloganService();

  private checkBodyParams(slogan: Slogan) {
    if (!slogan.getTitle() || !slogan.getDescription() || !slogan.getImg()) {
      throw new CustomError(
        HttpMessage.MISSING_PARAMS,
        HttpStatus.BAD_REQUEST,
        {}
      );
    }
  }

  async execute(slogan: Slogan): Promise<GeneratedId> {
    this.checkBodyParams(slogan);
    return await this.sloganService.save(slogan);
  }
}
