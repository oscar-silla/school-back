import { GeneratedId } from "../../../../domain/generated-id";
import { LastNew } from "../../../../domain/last-new";

export interface CreateLastNewUseCasePort {
  createLastNew(lastNew: LastNew): Promise<GeneratedId>;
}
