import { CoordinateInterface, ISource, IFrameRequest, IDrawImageParamsMax } from '../validations/models'

export function fillText({
    source: { ctx, atlas },
    coordinate: { x, y },
    font,
    text,
    color,
} : {
    source: ISource,
    coordinate: CoordinateInterface;
    font: string,
    text: string,
    color: string,
}){
    const fontSize = '14';

	ctx.font = `${fontSize}px ${font}`;
	ctx.textAlign = "start";
    ctx.textBaseline = "bottom";

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.strokeText(text, x, y);

	ctx.fillStyle = color;
	ctx.fillText(text, x, y);
}