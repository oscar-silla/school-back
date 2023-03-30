import { GeneratedId } from "../../../../application/domain/generated-id";
import { GeneratedIdModel } from "../models/generated-id.model";

export class GeneratedIdModelMapper {
  toGeneratedId(generatedId: GeneratedIdModel): GeneratedId {
    return new GeneratedId(generatedId.getInsertedId().toString());
  }
  toGenerateIdModel(generateIdModel: any): GeneratedIdModel {
    return new GeneratedIdModel(generateIdModel.insertedId.toString());
  }
}
