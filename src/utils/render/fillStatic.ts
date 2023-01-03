import { default as imageLoader } from '../image';

export function fillStatic({
    ctx,
    coordinateX,
    coordinateY,
} : {
    ctx: CanvasRenderingContext2D | null,
    coordinateX: number,
    coordinateY: number,
}){
    const img = imageLoader.HORSE;
    ctx.drawImage(img, coordinateX, coordinateY);
}