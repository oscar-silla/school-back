import { LastNew } from "../../../../application/domain/last-new";
import { LastNewModel } from "../models/last-new.model";

export class LastNewModelMapper {
  toLastNewModel(lastNew: LastNew | any): LastNewModel {
    const lastNewModel: LastNewModel = new LastNewModel();
    if (lastNew instanceof LastNew) {
      lastNewModel.setTitle(lastNew.getTitle());
      lastNewModel.setDescription(lastNew.getDescription() ?? "");
      lastNewModel.setImg(lastNew.getImg() ?? "");
      lastNewModel.setContent(lastNew.getContent());
    } else {
      lastNewModel.setId(lastNew?._id ?? "");
      lastNewModel.setTitle(lastNew?.title ?? "");
      lastNewModel.setDescription(lastNew?.title ?? "");
      lastNewModel.setImg(lastNew?.img ?? "");
      lastNewModel.setContent(lastNew?.content ?? "");
    }
    return lastNewModel;
  }

  toLastNewModels(lastNews: LastNew[] | any[]): LastNewModel[] {
    return lastNews.map((lastNew: LastNew | any) =>
      this.toLastNewModel(lastNew)
    );
  }

  toLastNew(lastNewModel: LastNewModel): LastNew {
    const lastNew: LastNew = new LastNew();
    lastNew.setId(lastNewModel?.getId() ?? "");
    lastNew.setTitle(lastNewModel?.getTitle() ?? "");
    lastNew.setDescription(lastNewModel?.getDescription() ?? "");
    lastNew.setImg(lastNewModel?.getImg() ?? "");
    lastNew.setContent(lastNewModel?.getContent() ?? "");
    return lastNew;
  }

  toLastNews(lastNewModels: LastNewModel[]): LastNew[] {
    return lastNewModels.map((lastNewModel: LastNewModel) =>
      this.toLastNew(lastNewModel)
    );
  }
}
