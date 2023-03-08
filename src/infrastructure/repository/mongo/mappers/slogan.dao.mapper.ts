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
}
