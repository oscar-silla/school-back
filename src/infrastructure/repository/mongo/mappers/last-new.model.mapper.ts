import { LastNew } from "../../../../application/domain/last-new";
import { LastNewModel } from "../models/last-new.model";
import { LastNewType } from "../types/last-new.type";

export class LastNewModelMapper {
  toLastNewModel(lastNew: LastNew | LastNewType): LastNewModel | null {
    const lastNewModel: LastNewModel = new LastNewModel();
    if (lastNew instanceof LastNew) {
      lastNewModel.setTitle(lastNew.getTitle());
      lastNewModel.setDescription(lastNew.getDescription() ?? "");
      lastNewModel.setImg(lastNew.getImg() ?? "");
      lastNewModel.setContent(lastNew.getContent());
      lastNewModel.setColor(lastNew.getColor());
    } else if (lastNew?._id) {
      lastNewModel.setId(lastNew._id);
      lastNewModel.setTitle(lastNew.title);
      lastNewModel.setDescription(lastNew?.description ?? "");
      lastNewModel.setImg(lastNew?.img ?? "");
      lastNewModel.setContent(lastNew.content);
      lastNewModel.setColor(lastNew.color);
    } else {
      return null;
    }
    return lastNewModel;
  }

  toLastNewModels(lastNews: LastNew[] | LastNewType[]): LastNewModel[] | null {
    if (lastNews.length > 0) {
      return lastNews.map(
        (lastNew: LastNew | LastNewType) => this.toLastNewModel(lastNew)!
      );
    } else {
      return null;
    }
  }

  toLastNew(lastNewModel: LastNewModel | null): LastNew | null {
    const lastNew: LastNew = new LastNew();
    if (!lastNewModel) {
      return null;
    }
    lastNew.setId(lastNewModel.getId()!);
    lastNew.setTitle(lastNewModel.getTitle());
    lastNew.setDescription(lastNewModel?.getDescription() ?? "");
    lastNew.setImg(lastNewModel?.getImg() ?? "");
    lastNew.setContent(lastNewModel.getContent());
    lastNew.setColor(lastNewModel.getColor());
    return lastNew;
  }

  toLastNews(lastNewModels: LastNewModel[] | null): LastNew[] | null {
    if (!lastNewModels) {
      return null;
    }
    return lastNewModels.map(
      (lastNewModel: LastNewModel) => this.toLastNew(lastNewModel)!
    );
  }
}
