import { GeneratedId } from "../../domain/generated-id";
import { LastNew } from "../../domain/last-new";

export interface LastNewRepositoryPort {
  save(lastNew: LastNew): Promise<GeneratedId>;
  find(limit: number, page: number): Promise<LastNew[] | null>;
  findById(id: string): Promise<LastNew | null>;
  findByTitle(title: string): Promise<LastNew | null>;
  modifyOne(id: string, lastNew: LastNew): Promise<void>;
  deleteOne(id: string): Promise<void>;
}
