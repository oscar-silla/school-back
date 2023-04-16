import { LastNew } from "../../domain/last-new";
import { LastNewServicePort } from "../../ports/in/services/last-new.service.port";
import { GetLastNewsUseCasePort } from "../../ports/in/usecases/lastnew/get-last-news-use-case.port";
import { LastNewService } from "../../services/last-new.service";

export class GetArticlesUseCase implements GetLastNewsUseCasePort {
  private articleService: LastNewServicePort = new LastNewService();

  async getLastNews(limit: number, page: number): Promise<LastNew[]> {
    return await this.articleService.getLastNews(limit, page);
  }
}
