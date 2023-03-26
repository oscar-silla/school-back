import { Slogan } from "../../domain/slogan";
import { SloganServicePort } from "../../ports/in/services/slogan.service.port";
import { GetSlogansUseCasePort } from "../../ports/in/usecases/slogan/get-slogans.usecase.port";
import { SloganService } from "../../services/slogan.service";

export class GetSlogansUseCase implements GetSlogansUseCasePort {
  private sloganService: SloganServicePort = new SloganService();

  async execute(): Promise<Slogan[]> {
    return await this.sloganService.findAll();
  }
}
