import { SloganServicePort } from "../ports/in/services/slogan.service.port";
import { Slogan } from "../domain/slogan";
import { GeneratedId } from "../domain/generated-id";
import { SloganRepositoryPort } from "../ports/out/slogan.repository.port";
import { SloganRepositoryAdapter } from "../../infrastructure/repository/mongo/adapters/slogan.repository.adapter";
import { CustomError } from "../exceptions/CustomError";
import { HttpMessage } from "../domain/http-message";
import { HttpStatus } from "../domain/http-status";

export class SloganService implements SloganServicePort {
  private sloganRepository: SloganRepositoryPort =
    new SloganRepositoryAdapter();

  async createSlogan(slogan: Slogan): Promise<GeneratedId> {
    await this.checkIfAlreadyExistsSlogan(slogan);
    return await this.sloganRepository.save(slogan);
  }

  async findFirstSlogan(): Promise<Slogan> {
    const slogan: Slogan = await this.sloganRepository.findFirst();
    this.checkIfSloganIsPresent(slogan);
    return slogan;
  }

  async findSloganById(id: string): Promise<Slogan> {
    const slogan: Slogan = await this.sloganRepository.findById(id);
    this.checkIfSloganIsPresent(slogan);
    return slogan;
  }

  async modifySloganById(id: string, newSlogan: Slogan): Promise<void> {
    const currentSlogan: Slogan = await this.findSloganById(id);
    const slogan: Slogan = this.buildSloganToModify(newSlogan, currentSlogan);
    await this.sloganRepository.modifyOneById(id, slogan);
  }

  async deleteSloganById(id: string): Promise<void> {
    await this.findSloganById(id);
    await this.sloganRepository.deleteOneById(id);
  }

  private async checkIfAlreadyExistsSlogan(slogan: Slogan): Promise<void> {
    const possibleSlogan: Slogan = await this.sloganRepository.findByTitle(
      slogan.getTitle() ?? ""
    );
    if (possibleSlogan.getTitle()) {
      throw new CustomError(HttpMessage.CONFLICT, HttpStatus.CONFLICT, {});
    }
  }

  private checkIfSloganIsPresent(slogan: Slogan) {
    if (!slogan.getId()) {
      throw new CustomError(HttpMessage.NOT_FOUND, HttpStatus.NOT_FOUND, {});
    }
  }

  private buildSloganToModify(newSlogan: Slogan, currentSlogan: Slogan) {
    return new Slogan(
      newSlogan?.getTitle() ? newSlogan.getTitle() : currentSlogan?.getTitle(),
      newSlogan?.getDescription()
        ? newSlogan.getDescription()
        : currentSlogan?.getDescription(),
      newSlogan?.getImg() ? newSlogan.getImg() : currentSlogan?.getImg(),
      newSlogan?.getTextButton()
        ? newSlogan.getTextButton()
        : currentSlogan?.getTextButton(),
      newSlogan?.getUrl() ? newSlogan.getUrl() : currentSlogan?.getUrl()
    );
  }
}
