import { Slogan } from "../../../../application/domain/slogan";
import { SloganModel } from "../models/slogan.model";
import { SloganType } from "../types/slogan.type";

export class SloganModelMapper {
  toSloganModel(slogan: Slogan | SloganType | null): SloganModel | null {
    const sloganModel: SloganModel = new SloganModel();
    if (slogan instanceof Slogan) {
      sloganModel.setTitle(slogan?.getTitle() ?? "");
      sloganModel.setDescription(slogan?.getDescription() ?? "");
      sloganModel.setImg(slogan?.getImg() ?? "");
      sloganModel.setTextButton(slogan?.getTextButton() ?? "");
      sloganModel.setUrl(slogan?.getUrl() ?? "");
    } else if (slogan?._id) {
      sloganModel.setId(slogan?._id ?? "");
      sloganModel.setTitle(slogan.title);
      sloganModel.setDescription(slogan.description);
      sloganModel.setImg(slogan.img);
      sloganModel.setTextButton(slogan?.textButton ?? "");
      sloganModel.setUrl(slogan?.url ?? "");
    } else {
      return null;
    }
    return sloganModel;
  }
  toSloganModels(slogans: Slogan[] | SloganType[]): SloganModel[] | null {
    return slogans.length > 0
      ? slogans.map(
          (slogan: Slogan | SloganType) => this.toSloganModel(slogan)!
        )
      : null;
  }
  toSlogan(sloganModel: SloganModel | null): Slogan | null {
    if (!sloganModel) {
      return null;
    }
    const slogan: Slogan = new Slogan();
    slogan.setId(sloganModel.getId()!);
    slogan.setTitle(sloganModel.getTitle());
    slogan.setDescription(sloganModel.getDescription());
    slogan.setImg(sloganModel.getImg());
    slogan.setTextButton(sloganModel?.getTextButton() ?? "");
    slogan.setUrl(sloganModel?.getUrl() ?? "");
    return slogan;
  }

  toSlogans(sloganDaoList: SloganModel[] | null): Slogan[] | null {
    return sloganDaoList && sloganDaoList.length > 0
      ? sloganDaoList.map((sloganDao: SloganModel) => this.toSlogan(sloganDao)!)
      : null;
  }
}
