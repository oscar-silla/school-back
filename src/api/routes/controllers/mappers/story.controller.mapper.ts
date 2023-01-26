import { StoryBody } from "../../../../../external-libraries/openapi/models/StoryBody";
import { Story } from "../../../../application/domain/story";

export class StoryControllerMapper {
  toNew(storyBody: StoryBody): Story {
    const story = new Story();
    story.setTitle(storyBody.title ?? "");
    story.setDescription(storyBody.description ?? "");
    story.setImg(storyBody.img ?? "");
    story.setContent(storyBody.content ?? "");
    return story;
  }
}
