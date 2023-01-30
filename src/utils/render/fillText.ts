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
    const fontSize = '20';

	ctx.font = `${fontSize}px ${font}`;
	ctx.textAlign = "start";
    ctx.textBaseline = "bottom";
	ctx.fillStyle = color;
	ctx.fillText(text, x, y);
}