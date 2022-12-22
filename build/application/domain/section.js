"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Section = void 0;
class Section {
    constructor(title, description, img, ref) {
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
    setTitle(title) {
        this.title = title;
    }
    setDescription(description) {
        this.description = description;
    }
    setImg(img) {
        this.img = img;
    }
    setRef(ref) {
        this.ref = ref;
    }
}
exports.Section = Section;
