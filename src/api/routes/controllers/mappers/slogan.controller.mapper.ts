import { SloganBody } from "../../../../../external-libraries/openapi/models/SloganBody";
import { SloganResponse } from "../../../../../external-libraries/openapi/models/SloganResponse";
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
  toSloganResponse(slogan: Slogan): SloganResponse {
    const sloganResponse: SloganResponse = new SloganResponse();
    sloganResponse.id = slogan.getId() ?? "";
    sloganResponse.title = slogan.getTitle() ?? "";
    sloganResponse.description = slogan.getDescription() ?? "";
    sloganResponse.img = slogan.getImg() ?? "";
    sloganResponse.textButton = slogan.getTextButton() ?? "";
    sloganResponse.url = slogan.getUrl() ?? "";
    return sloganResponse;
  }
  toSlogansResponse(slogans: Slogan[]): SloganResponse[] {
    return slogans.map((slogan) => this.toSloganResponse(slogan));
  }
}
