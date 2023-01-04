

const focusSpeed = 8;

export function fillBackground({
    ctx,
    image,
    timestamp,
    size,
    fps,
    canvasWidth,
    canvasHeight,
}: {
    ctx: CanvasRenderingContext2D | null,
    image: Object,
    timestamp: number,
    size: number,
    fps: number,
    canvasWidth: number,
    canvasHeight: number,
}) {
    const preciseTick = timestamp / (1000 / (fps * focusSpeed));
    const img = new Image();
    img.src = image.src;
    const length = size;
    const height = size;
    const xAxisPoints = canvasWidth / length;
    const yAxisPoints = canvasHeight / height;
    const pixelsPerCycle = size * focusSpeed;

    function activeLoop() {
        ctx.save();
        const offset = Math.ceil(preciseTick % pixelsPerCycle);

        for (let i = 0; i < canvasWidth + pixelsPerCycle; i += length) {
            for (let y = 0; y < canvasHeight; y += height) {
                ctx.save();
                ctx.drawImage(img, i - offset, y, length, height);
                ctx.restore();
            }
        }
      ctx.restore();
    }

    activeLoop();
}