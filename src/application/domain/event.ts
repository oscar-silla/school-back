export class Event {
  private id?: string;
  private title: string;
  private description: string;
  private img: string;
  private content: string;

  constructor(
    id?: string,
    title?: string,
    description?: string,
    img?: string,
    content?: string
  ) {
    this.id = id;
    this.title = title ?? "";
    this.description = description ?? "";
    this.img = img ?? "";
    this.content = content ?? "";
  }

  getId(): string | undefined {
    return this.id;
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
  getContent(): string {
    return this.content;
  }

  setId(id: string): void {
    this.id = id;
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
