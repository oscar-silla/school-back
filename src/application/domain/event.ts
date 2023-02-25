export class Event {
  private id?: string;
  private title: string;
  private description: string;
  private img: string;
  private content: string;

  constructor(
    title?: string,
    description?: string,
    img?: string,
    content?: string
  ) {
    this.title = title ?? "";
    this.description = description ?? "";
    this.img = img ?? "";
    this.content = content ?? "";
  }

  getId() {
    return this.id;
  }
  getTitle() {
    return this.title;
  }
  getDescription() {
    return this.description;
  }
  getImg() {
    return this.img;
  }
  getContent() {
    return this.content;
  }

  setId(id: string) {
    this.id = id;
  }
  setTitle(title: string) {
    this.title = title;
  }
  setDescription(description: string) {
    this.description = description;
  }
  setImg(img: string) {
    this.img = img;
  }
  setContent(content: string) {
    this.content = content;
  }
}
