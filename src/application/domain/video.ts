export class Video {
  private _id?: string;
  private ref: string;
  private src: string;

  constructor(_id?: string, ref?: string, src?: string) {
    this.ref = ref ? ref : "";
    this.src = src ? src : "";
  }

  getId() {
    return this._id ?? "";
  }
  getRef() {
    return this.ref;
  }
  getSrc() {
    return this.src;
  }

  setId(_id: string) {
    this._id = _id;
  }
  setRef(ref: string) {
    this.ref = ref;
  }
  setSrc(src: string) {
    this.src = src;
  }
}
