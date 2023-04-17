import { Slogan } from "../../domain/slogan";
import { SloganServicePort } from "../../ports/in/services/slogan.service.port";
import { GetFirstSloganUseCasePort } from "../../ports/in/usecases/slogan/get-first-slogan-use-case.port";
import { SloganService } from "../../services/slogan.service";

export class GetFirstSloganUseCase implements GetFirstSloganUseCasePort {
  private sloganService: SloganServicePort = new SloganService();

  async execute(): Promise<Slogan> {
    return await this.sloganService.findFirstSlogan();
  }
}
