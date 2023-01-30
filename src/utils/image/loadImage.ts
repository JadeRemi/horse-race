import { IImage, IFrameRequest } from "../validations/models";

export function loadImage(img: IImage) : HTMLImageElement {
    const image = new Image();
    image.src = img.path;
    return image;
};

export function requestFrame({
    image,
    framesCount,
    frame,
    rowsCount,
    row,
} : {
    image: HTMLImageElement,
    framesCount: number,
    frame: number,
    rowsCount?: number,
    row?: number,
}) : IFrameRequest | undefined {

    const vertical = !!rowsCount && !!row;

    const frameLength = vertical ? image.width : image.width / framesCount;
	const frameHeight = vertical ? image.height / rowsCount : image.height;


    if (frameLength <= 0 || frameHeight <= 0 || frame < 1) return;

    return {
        x: vertical ? 0 : (frame - 1) * frameLength, // (frame - 1)
        y: vertical ? (row - 1) * frameHeight : 0,
        height: frameHeight,
        width: frameLength,
    };
};

export function fitImageToScale({
    sourceWidth,
    sourceHeight,
    destinationWidth,
    destinationHeight,
} : {
    sourceWidth: number;
    sourceHeight: number;
    destinationWidth?: number;
    destinationHeight?: number;
}) : {
    fitWidth: number;
    fitHeight: number;
} {

    const avoidFit = !destinationWidth && !destinationHeight;


    const fitWidth = avoidFit
        ? sourceWidth
        : destinationWidth || sourceWidth / (sourceHeight / destinationHeight);
    const fitHeight = avoidFit
        ? sourceHeight
        : destinationHeight || sourceHeight / (sourceWidth / destinationWidth);

    return {
        fitWidth,
        fitHeight,
    };
}