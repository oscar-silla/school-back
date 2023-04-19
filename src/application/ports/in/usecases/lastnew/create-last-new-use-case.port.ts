import { GeneratedId } from "../../../../domain/generated-id";
import { LastNew } from "../../../../domain/last-new";

export interface CreateLastNewUseCasePort {
  execute(lastNew: LastNew): Promise<GeneratedId>;
}
