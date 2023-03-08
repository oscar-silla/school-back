import { GeneratedId } from "../../../../application/domain/generated-id";
import { GeneratedIdDao } from "../models/generated-id.dao";

export class GeneratedIdModelMapper {
  toGeneratedId(generatedId: GeneratedIdDao): GeneratedId {
    return new GeneratedId(generatedId?.insertedId?.toString());
  }
}
