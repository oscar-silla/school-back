export class Section {
  private _id?: string;
  private title!: string;
  private description?: string;
  private img?: string;
  private ref!: string;

  constructor(
    _id?: string,
    title?: string,
    description?: string,
    img?: string,
    ref?: string
  ) {
    this._id = _id ?? "";
    this.title = title ?? "";
    this.description = description ?? "";
    this.img = img ?? "";
    this.ref = ref ?? "";
  }
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
  getRef(): string {
    return this.ref;
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
  setRef(ref: string): void {
    this.ref = ref;
  }
}
