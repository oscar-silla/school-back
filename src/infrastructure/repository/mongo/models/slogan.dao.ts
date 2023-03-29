export class SloganDao {
  private _id?: string;
  private title!: string;
  private description!: string;
  private img!: string;
  private textButton?: string;
  private url?: string;

  getId() {
    return this._id;
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
    this._id = id;
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
  setTextButton(textButton: string) {
    this.textButton = textButton;
  }
  setUrl(url: string) {
    this.url = url;
  }
}
