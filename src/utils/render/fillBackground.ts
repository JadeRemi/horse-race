import { ISource } from '../validations/models';

export function fillBackground({
	source: { ctx, atlas },
	canvasWidth,
	canvasHeight,
	backgroundPalette,
}: {
	source: ISource;
	canvasWidth: number;
	canvasHeight: number;
	backgroundPalette: string;
}) {
	ctx.fillStyle = backgroundPalette;
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}
