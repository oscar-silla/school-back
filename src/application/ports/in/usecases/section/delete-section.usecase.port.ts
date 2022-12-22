export interface DeleteSectionUseCasePort {
  deleteSection(ref: string): Promise<void>;
}
