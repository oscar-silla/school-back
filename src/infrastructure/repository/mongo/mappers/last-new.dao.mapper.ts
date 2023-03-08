import { LastNew } from "../../../../application/domain/last-new";
import { LastNewDao } from "../models/last-new.dao";

export class LastNewMapperModel {
  toLastNew(lastNewModel: LastNewDao): LastNew {
    const lastNew: LastNew = new LastNew();
    lastNew.setId(lastNewModel?._id ?? "");
    lastNew.setTitle(lastNewModel?.title ?? "");
    lastNew.setDescription(lastNewModel?.description ?? "");
    lastNew.setImg(lastNewModel?.img ?? "");
    lastNew.setContent(lastNewModel?.content ?? "");
    return lastNew;
  }

  toLastNews(lastNewModels: LastNewDao[]): LastNew[] {
    return lastNewModels.map((lastNewModel: LastNewDao) =>
      this.toLastNew(lastNewModel)
    );
  }
}
