import { IImage } from "../validations/models";

export function loadImage(img: IImage) {
    const image = new Image();
    image.src = img.path;
    return image;
};