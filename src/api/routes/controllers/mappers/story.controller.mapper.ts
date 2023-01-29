import { StoryBody } from "../../../../../external-libraries/openapi/models/StoryBody";
import { StoryResponse } from "../../../../../external-libraries/openapi/models/StoryResponse";
import { Story } from "../../../../application/domain/story";

export class StoryControllerMapper {
  toStory(storyBody: StoryBody): Story {
    const story = new Story();
    story.setTitle(storyBody.title ?? "");
    story.setDescription(storyBody.description ?? "");
    story.setImg(storyBody.img ?? "");
    story.setContent(storyBody.content ?? "");
    return story;
  }
  toStoryResponse(story: Story): StoryResponse {
    const storyResponse = new StoryResponse();
    storyResponse.id = story.getId() ?? "";
    storyResponse.title = story.getTitle() ?? "";
    storyResponse.description = story.getDescription() ?? "";
    storyResponse.img = story.getImg() ?? "";
    storyResponse.content = story.getContent() ?? "";
    return storyResponse;
  }
  toStoriesResponse(stories: Story[]): StoryResponse[] {
    return stories.map((story) => this.toStoryResponse(story));
  }
}
