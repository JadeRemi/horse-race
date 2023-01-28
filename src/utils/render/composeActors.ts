import { loadImage } from '../image/loadImage';
import { fillAnimation } from './fillAnimation';
import {
	ISource,
	ICanvasParams,
	IActorsDisplay,
} from '../validations/models';

export function composeActors({
	source,
	timestamp,
	actors,
	fps,
	canvasParams,
	focusSpeed,
	cycleSpeed,
	participants,
}: {
	source: ISource;
	timestamp: number;
	fps: number;
	actors: IActorsDisplay;
	canvasParams: ICanvasParams;
	focusSpeed: number;
	cycleSpeed: number;
	participants: number;
}) {

	const { canvasWidth, canvasHeight } = canvasParams;
	if (canvasWidth <= 0 || canvasHeight <= 0) return;
	if (participants <= 0) return;

	const preciseTick = timestamp / (1000 / (fps * focusSpeed));
	const { horse } = actors;
	const { x, y } = {
		x: canvasWidth / 2,
		y: canvasHeight / 2,
	};

	const verticalOffset = -30

	for (let i = 0; i < participants; i += 1) {
		const trackPosition = y + verticalOffset + (i * ( 
			(canvasHeight / 2 - 50)
			 / participants));
		const coordinate = {
			x,
			y: trackPosition,
		}

		fillAnimation({
			source,
			image: horse,
			coordinate,
			timestamp,
			fps,
			cycleSpeed,
		});

	}
	

}
