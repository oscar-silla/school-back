import { SloganBody } from "../../../../../external-libraries/openapi/models/SloganBody";
import { Slogan } from "../../../../application/domain/slogan";

export class SloganControllerMapper {
  toSlogan(sloganBody: SloganBody): Slogan {
    const slogan: Slogan = new Slogan();
    slogan.setTitle(sloganBody.title ?? "");
    slogan.setDescription(sloganBody.description ?? "");
    slogan.setImg(sloganBody.img ?? "");
    slogan.setTextButton(sloganBody.textButton ?? "");
    slogan.setUrl(sloganBody.url ?? "");
    return slogan;
  }
}
