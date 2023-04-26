import { Slogan } from "../../domain/slogan";
import { GeneratedId } from "../../domain/generated-id";

export interface SloganRepositoryPort {
  save(slogan: Slogan): Promise<GeneratedId>;
  findFirst(): Promise<Slogan | null>;
  findById(id: string): Promise<Slogan | null>;
  findByTitle(title: string): Promise<Slogan | null>;
  modifyOneById(id: string, slogan: Slogan): Promise<void>;
  deleteOneById(id: string): Promise<void>;
}
