import { ISource, ICanvasParams } from '../validations/models';

export function fillBackground({
	source: { ctx, atlas },
	canvasParams,
	backgroundPalette,
}: {
	source: ISource;
	canvasParams: ICanvasParams;
	backgroundPalette: string;
}) {
	const { canvasWidth, canvasHeight } = canvasParams;
	ctx.fillStyle = backgroundPalette;
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}
