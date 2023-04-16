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
    return await this.lastNewRepository.save(lastNew);
  }

  async getLastNews(limit: number, page: number): Promise<LastNew[]> {
    const lastNews: LastNew[] = await this.lastNewRepository.find(limit, page);
    this.checkIfIsItAnEmptyLastNewsList(lastNews);
    return lastNews;
  }

  async getLastNew(id: string): Promise<LastNew> {
    const lastNew: LastNew = await this.lastNewRepository.findOne(id);
    this.checkIfLastNewIsPresent(lastNew);
    return lastNew;
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

  private checkIfLastNewIsPresent(lastNew: LastNew): void {
    if (!lastNew.getId()) {
      throw new CustomError(HttpMessage.NOT_FOUND, HttpStatus.NOT_FOUND, {});
    }
  }

  private checkIfIsItAnEmptyLastNewsList(lastNews: LastNew[]): void {
    if (lastNews.length === 0) {
      throw new CustomError(HttpMessage.NOT_FOUND, HttpStatus.NOT_FOUND, {});
    }
  }
}
