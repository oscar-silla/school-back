export class Section {
  private title: string;
  private description: string;
  private img: string;
  private ref: string;

  constructor(title: string, description: string, img: string, ref: string) {
    this.title = title;
    this.description = description;
    this.img = img;
    this.ref = ref;
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
  getRef() {
    return this.ref;
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
  setRef(ref: string) {
    this.ref = ref;
  }
}
