import {GeneratedIdResponse} from "../../../../../external-libraries/openapi/models/GeneratedIdResponse";
import {GeneratedId} from "../../../../application/domain/generated-id";

export class GeneratedIdMapper {
    toGeneratedIdResponse(generatedId: GeneratedId): GeneratedIdResponse {
        const generatedIdResponse = new GeneratedIdResponse();
        generatedIdResponse.generatedId = generatedId.getGeneratedId();
        return generatedIdResponse;
    }
}
