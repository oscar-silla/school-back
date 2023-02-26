import { GeneratedId } from "../../domain/generated-id";
import { LastNew } from "../../domain/last-new";

export interface LastNewRepositoryPort {
  save(lastNew: LastNew): Promise<GeneratedId>;

  find(limit: number, page: number): Promise<LastNew[]>;

  findOne(id: string): Promise<LastNew>;

  modifyOne(id: string, lastNew: LastNew): Promise<void>;

  deleteOne(id: string): Promise<void>;
}
