import { LastNew } from "../../../../application/domain/last-new";
import { LastNewBody } from "../../../../../external-libraries/openapi/models/LastNewBody";
import { LastNewResponse } from "../../../../../external-libraries/openapi/models/LastNewResponse";

export class LastNewControllerMapper {
  toArticle(lastNewBody: LastNewBody): LastNew {
    const lastNew: LastNew = new LastNew();
    lastNew.setTitle(lastNewBody.title ?? "");
    lastNew.setDescription(lastNewBody.description ?? "");
    lastNew.setImg(lastNewBody.img ?? "");
    lastNew.setContent(lastNewBody.content ?? "");
    lastNew.setColor(lastNewBody.color ?? "");
    return lastNew;
  }

  toArticleResponse(lastNew: LastNew): LastNewResponse {
    const lastNewResponse: LastNewResponse = new LastNewResponse();
    lastNewResponse.id = lastNew.getId()!;
    lastNewResponse.title = lastNew.getTitle()!;
    lastNewResponse.description = lastNew.getDescription() ?? "";
    lastNewResponse.img = lastNew.getImg() ?? "";
    lastNewResponse.content = lastNew.getContent()!;
    lastNewResponse.color = lastNew.getColor()!;
    return lastNewResponse;
  }

  toArticlesResponse(lastNews: LastNew[]): LastNewResponse[] {
    return lastNews.map((lastNew: LastNew) => this.toArticleResponse(lastNew));
  }
}
