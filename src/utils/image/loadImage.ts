export function loadImage(img: string) {
    const image = new Image();
    image.src = img;
    return image;
};