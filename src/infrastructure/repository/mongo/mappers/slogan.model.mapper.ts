import { Slogan } from "../../../../application/domain/slogan";
import { SloganModel } from "../models/slogan.model";

export class SloganModelMapper {
  toSloganModel(slogan: Slogan | any): SloganModel {
    const sloganDao: SloganModel = new SloganModel();
    if (slogan instanceof Slogan) {
      sloganDao.setTitle(slogan?.getTitle() ?? "");
      sloganDao.setDescription(slogan?.getDescription() ?? "");
      sloganDao.setImg(slogan?.getImg() ?? "");
      sloganDao.setTextButton(slogan?.getTextButton() ?? "");
      sloganDao.setUrl(slogan?.getUrl() ?? "");
    } else {
      sloganDao.setId(slogan?._id ?? "");
      sloganDao.setTitle(slogan?.title ?? "");
      sloganDao.setDescription(slogan?.description ?? "");
      sloganDao.setImg(slogan?.img ?? "");
      sloganDao.setTextButton(slogan?.textButton ?? "");
      sloganDao.setUrl(slogan?.url ?? "");
    }
    return sloganDao;
  }
  toSloganModels(slogans: Slogan[] | any[]): SloganModel[] {
    return slogans.map((slogan: Slogan | any) => this.toSloganModel(slogan));
  }
  toSlogan(sloganModel: SloganModel): Slogan {
    const slogan: Slogan = new Slogan();
    slogan.setId(sloganModel?.getId() ?? "");
    slogan.setTitle(sloganModel?.getTitle() ?? "");
    slogan.setDescription(sloganModel?.getDescription() ?? "");
    slogan.setImg(sloganModel?.getImg() ?? "");
    slogan.setTextButton(sloganModel?.getTextButton() ?? "");
    slogan.setUrl(sloganModel?.getUrl() ?? "");
    return slogan;
  }

  toSlogans(sloganDaoList: SloganModel[]): Slogan[] {
    return sloganDaoList.map((sloganDao) => this.toSlogan(sloganDao));
  }
}
