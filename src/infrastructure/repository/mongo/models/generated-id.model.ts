export class GeneratedIdModel {
  private readonly insertedId!: string;

  constructor(insertedId: string) {
    this.insertedId = insertedId;
  }
  getInsertedId(): string {
    return this.insertedId;
  }
}
