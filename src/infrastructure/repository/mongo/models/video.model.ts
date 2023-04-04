export class VideoModel {
  private _id?: string;
  private ref!: string;
  private src!: string;

  getId(): string | undefined {
    return this._id;
  }
  getRef(): string {
    return this.ref;
  }
  getSrc(): string {
    return this.src;
  }
  setId(_id: string): void {
    this._id = _id;
  }
  setRef(ref: string): void {
    this.ref = ref;
  }
  setSrc(src: string): void {
    this.src = src;
  }
}
