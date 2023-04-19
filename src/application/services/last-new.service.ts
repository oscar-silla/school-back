import { LastNewRepositoryAdapter } from "../../infrastructure/repository/mongo/adapters/last-new.repository.adapter";
import { GeneratedId } from "../domain/generated-id";
import { HttpStatus } from "../domain/http-status";
import { HttpMessage } from "../domain/http-message";
import { LastNew } from "../domain/last-new";
import { CustomError } from "../exceptions/CustomError";
import { LastNewServicePort } from "../ports/in/services/last-new.service.port";
import { LastNewRepositoryPort } from "../ports/out/last-new.repository.port";

export class LastNewService implements LastNewServicePort {
  private lastNewRepository: LastNewRepositoryPort =
    new LastNewRepositoryAdapter();

  async createLastNew(lastNew: LastNew): Promise<GeneratedId> {
    const possibleLastNew: LastNew | null =
      await this.lastNewRepository.findByTitle(lastNew.getTitle());
    this.throwConflictExceptionIfAlreadyExistsLastNew(possibleLastNew);
    return await this.lastNewRepository.save(lastNew);
  }

  async getLastNews(limit: number, page: number): Promise<LastNew[]> {
    const lastNews: LastNew[] | null = await this.lastNewRepository.find(
      limit,
      page
    );
    this.throwExceptionIfNotFoundLastNew(lastNews);
    return lastNews!;
  }

  async getLastNew(id: string): Promise<LastNew> {
    const lastNew: LastNew | null = await this.lastNewRepository.findById(id);
    this.throwExceptionIfNotFoundLastNew(lastNew);
    return lastNew!;
  }

  async modifyLastNew(id: string, lastNew: LastNew): Promise<void> {
    const lastNewToModify: LastNew = await this.getLastNew(id);
    const payload: LastNew = this.buildPayloadToModifyLastNew(
      lastNew,
      lastNewToModify
    );
    await this.lastNewRepository.modifyOne(id, payload);
  }

  async deleteLastNew(id: string): Promise<void> {
    await this.getLastNew(id);
    await this.lastNewRepository.deleteOne(id);
  }

  private buildPayloadToModifyLastNew(
    lastNew: LastNew,
    lastNewToModify: LastNew
  ): LastNew {
    const payload: LastNew = new LastNew();
    payload.setTitle(
      lastNew.getTitle() ? lastNew.getTitle() : lastNewToModify.getTitle()
    );
    payload.setDescription(
      lastNew.getDescription()
        ? lastNew.getDescription()!
        : lastNewToModify.getDescription() ?? ""
    );
    payload.setImg(
      lastNew.getImg() ? lastNew.getImg()! : lastNewToModify.getImg() ?? ""
    );
    payload.setContent(
      lastNew.getContent() ? lastNew.getContent() : lastNewToModify.getContent()
    );
    payload.setColor(
      lastNew.getColor() ? lastNew.getColor() : lastNewToModify.getColor()
    );
    return payload;
  }

  private throwExceptionIfNotFoundLastNew(
    lastNew: LastNew | LastNew[] | null
  ): void {
    if (!lastNew) {
      throw new CustomError(HttpMessage.NOT_FOUND, HttpStatus.NOT_FOUND, {});
    }
  }

  private throwConflictExceptionIfAlreadyExistsLastNew(
    lastNew: LastNew | null
  ): void {
    if (lastNew) {
      throw new CustomError(HttpMessage.CONFLICT, HttpStatus.CONFLICT, {});
    }
  }
}
