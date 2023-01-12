
export function fillBackground({
    ctx,
    canvasWidth,
    canvasHeight,
    backgroundPalette,
}: {
    ctx: CanvasRenderingContext2D | null,
    canvasWidth: number,
    canvasHeight: number,
    backgroundPalette: string,
}) {
    ctx.fillStyle = backgroundPalette;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}