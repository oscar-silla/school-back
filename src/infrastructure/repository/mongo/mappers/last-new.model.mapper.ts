import { LastNew } from "../../../../application/domain/last-new";
import { LastNewModel } from "../models/last-new.model";

export class LastNewMapperModel {
  toLastNew(lastNewModel: LastNewModel): LastNew {
    const lastNew: LastNew = new LastNew();
    lastNew.setId(lastNewModel?._id ?? "");
    lastNew.setTitle(lastNewModel?.title ?? "");
    lastNew.setDescription(lastNewModel?.description ?? "");
    lastNew.setImg(lastNewModel?.img ?? "");
    lastNew.setContent(lastNewModel?.content ?? "");
    return lastNew;
  }

  toLastNews(lastNewModels: LastNewModel[]): LastNew[] {
    return lastNewModels.map((lastNewModel: LastNewModel) =>
      this.toLastNew(lastNewModel)
    );
  }
}
