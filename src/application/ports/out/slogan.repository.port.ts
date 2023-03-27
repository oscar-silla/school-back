import { Slogan } from "../../domain/slogan";
import { GeneratedId } from "../../domain/generated-id";

export interface SloganRepositoryPort {
  save(slogan: Slogan): Promise<GeneratedId>;
  findAll(): Promise<Slogan[]>;
  findById(id: string): Promise<Slogan>;
  modifyOneById(id: string, slogan: Slogan): Promise<void>;
  deleteOneById(id: string): Promise<void>;
}
