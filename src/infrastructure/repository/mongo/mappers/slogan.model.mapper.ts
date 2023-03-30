import { Slogan } from "../../../../application/domain/slogan";
import { SloganDao } from "../models/slogan.dao";

export class SloganModelMapper {
  toSloganDao(slogan: Slogan): SloganDao {
    const sloganDao: SloganDao = new SloganDao();
    sloganDao.setTitle(slogan.getTitle() ?? "");
    sloganDao.setDescription(slogan.getDescription() ?? "");
    sloganDao.setImg(slogan.getImg() ?? "");
    sloganDao.setTextButton(slogan.getTextButton() ?? "");
    sloganDao.setUrl(slogan.getUrl() ?? "");
    return sloganDao;
  }
  toSlogan(sloganDao: SloganDao | any): Slogan {
    const slogan: Slogan = new Slogan();
    if (sloganDao instanceof SloganDao) {
      slogan.setTitle(sloganDao?.getTitle() ?? "");
      slogan.setId(sloganDao?.getId() ?? "");
      slogan.setDescription(sloganDao?.getDescription() ?? "");
      slogan.setImg(sloganDao?.getImg() ?? "");
      slogan.setTextButton(sloganDao?.getTextButton() ?? "");
      slogan.setUrl(sloganDao?.getUrl() ?? "");
    } else {
      slogan.setId(sloganDao?._id ?? "");
      slogan.setTitle(sloganDao?.title ?? "");
      slogan.setDescription(sloganDao?.description ?? "");
      slogan.setImg(sloganDao?.img ?? "");
      slogan.setTextButton(sloganDao?.textButton ?? "");
      slogan.setUrl(sloganDao?.url ?? "");
    }
    return slogan;
  }

  toSlogans(sloganDaoList: SloganDao[]): Slogan[] {
    return sloganDaoList.map((sloganDao) => this.toSlogan(sloganDao));
  }
}
