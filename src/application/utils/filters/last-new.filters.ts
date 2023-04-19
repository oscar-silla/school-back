export class LastNewFilters {
  private id!: string;
  private title!: string;

  getId(): string {
    return this.id;
  }
  getTitle(): string {
    return this.title;
  }

  setId(id: string): void {
    this.id = id;
  }
  setTitle(title: string): void {
    this.title = title;
  }
}
