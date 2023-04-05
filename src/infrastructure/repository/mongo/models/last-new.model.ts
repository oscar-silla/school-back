export class LastNewModel {
  private _id?: string;
  private title!: string;
  private description?: string;
  private img?: string;
  private content!: string;

  getId(): string | undefined {
    return this._id;
  }
  getTitle(): string {
    return this.title;
  }
  getDescription(): string | undefined {
    return this.description;
  }
  getImg(): string | undefined {
    return this.img;
  }
  getContent(): string {
    return this.content;
  }
  setId(_id: string): void {
    this._id = _id;
  }
  setTitle(title: string): void {
    this.title = title;
  }
  setDescription(description: string): void {
    this.description = description;
  }
  setImg(img: string): void {
    this.img = img;
  }
  setContent(content: string): void {
    this.content = content;
  }
}
