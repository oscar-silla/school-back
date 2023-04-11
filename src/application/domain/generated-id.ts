export class GeneratedId {
  private generatedId: string;

  constructor(generatedId: string) {
    this.generatedId = generatedId;
  }

  getGeneratedId(): string {
    return this.generatedId;
  }

  setGeneratedId(generatedId: string): void {
    this.generatedId = generatedId;
  }
}
