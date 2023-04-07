import { GeneratedId } from "../../../../application/domain/generated-id";
import { GeneratedIdModel } from "../models/generated-id.model";
import { GeneratedIdType } from "../types/generated-id.type";

export class GeneratedIdModelMapper {
  toGeneratedId(generatedId: GeneratedIdModel): GeneratedId {
    return new GeneratedId(generatedId.getInsertedId().toString());
  }
  toGenerateIdModel(generateIdModel: GeneratedIdType): GeneratedIdModel {
    return new GeneratedIdModel(generateIdModel.insertedId.toString());
  }
}
