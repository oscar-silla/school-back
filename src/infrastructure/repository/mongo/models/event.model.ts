export class EventModel {
  private _id?: string;
  private title!: string;
  private description!: string;
  private img!: string;
  private content?: string;
  private color!: string;

  getId(): string | undefined {
    return this._id;
  }
  getTitle(): string {
    return this.title;
  }
  getDescription(): string {
    return this.description;
  }
  getImg(): string {
    return this.img;
  }
  getContent(): string | undefined {
    return this.content;
  }
  getColor(): string {
    return this.color;
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
  setColor(color: string): void {
    this.color = color;
  }
}
