
export function fillAnimation({
    ctx,
    image,
    coordinateX,
    coordinateY,
    timestamp,
    fps,
} : {
    ctx: CanvasRenderingContext2D | null,
    image: Object,
    coordinateX: number,
    coordinateY: number,
    timestamp: number,
    fps: number,
}){
    const { frames, speed, src } = image;
    const preciseTick = timestamp / (1000 / (fps * speed));
    const frame = Math.ceil( preciseTick % frames);
    const frameBound = frame < 0
        ? 0
        : frame > frames - 1
            ? frames - 1
            : frame;
    const img = new Image();
    img.src = src;
    const length = img.width / frames;
    const height = img.height;
    ctx.drawImage(img, length * frameBound, 0, length, height, coordinateX, coordinateY, length, height);
}