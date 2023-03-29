export class Slogan {
  private id?: string;
  private title?: string;
  private description?: string;
  private img?: string;
  private textButton?: string;
  private url?: string;

  constructor(
    title?: string,
    description?: string,
    img?: string,
    textButton?: string,
    url?: string
  ) {
    this.title = title ? title : "";
    this.description = description ? description : "";
    this.img = img ? img : "";
    this.textButton = textButton ? textButton : "";
    this.url = url ? url : "";
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
  getTextButton() {
    return this.textButton;
  }
  getUrl() {
    return this.url;
  }
  setId(id: string) {
    this.id = id;
  }

  setTitle(title: string | undefined) {
    this.title = title;
  }
  setDescription(description: string) {
    this.description = description;
  }
  setImg(img: string) {
    this.img = img;
  }
  setTextButton(textButton: string) {
    this.textButton = textButton;
  }
  setUrl(url: string) {
    this.url = url;
  }
}
