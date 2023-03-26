import { Slogan } from "../../../../application/domain/slogan";
import { SloganDao } from "../models/slogan.dao";

export class SloganDaoMapper {
  toSloganDao(slogan: Slogan): SloganDao {
    const sloganDao: SloganDao = new SloganDao();
    sloganDao.setTitle(slogan.getTitle() ?? "");
    sloganDao.setDescription(slogan.getDescription() ?? "");
    sloganDao.setImg(slogan.getImg() ?? "");
    sloganDao.setTextButton(slogan.getTextButton() ?? "");
    sloganDao.setUrl(slogan.getUrl() ?? "");
    return sloganDao;
  }
  toSlogan(sloganDao: SloganDao): Slogan {
    const slogan: Slogan = new Slogan();
    slogan.setId(sloganDao.getId() ?? "");
    slogan.setTitle(sloganDao.getTitle() ?? "");
    slogan.setDescription(sloganDao.getDescription() ?? "");
    slogan.setImg(sloganDao.getDescription() ?? "");
    slogan.setTextButton(sloganDao.getTextButton() ?? "");
    slogan.setUrl(sloganDao.getUrl() ?? "");
    return slogan;
  }
  toSlogans(sloganDaoList: SloganDao[]): Slogan[] {
    return sloganDaoList.map((sloganDao) => this.toSlogan(sloganDao));
  }
}
