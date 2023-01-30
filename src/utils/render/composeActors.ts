import { loadImage, requestFrame } from '../image/loadImage';
import { fillAnimation } from './fillAnimation';
import { fillStatic } from './fillStatic';
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

	const { horse, jockey, shadow, obstacle } = actors;
	const { x, y } = {
		x: canvasWidth / 2,
		y: canvasHeight / 2,
	};

	const verticalOffset = -30;

	for (let i = 0; i < participants; i += 1) {
		const trackPosition = y + verticalOffset + (i * ( 
			(canvasHeight / 2 - 50)
			/ participants));



		const horseImage = loadImage(horse);
		const { frames : horseFrames = 1 } : { frames?: number } = horse;
		const centerActorOffset = horseImage.width / horseFrames / 2 || 0;
		const horseCoordinate = {
			x: x - centerActorOffset,
			y: trackPosition,
		}
		
		const jockeyImage = loadImage(jockey);
		const { frames : jockeyFrames = 1 } : { frames?: number } = jockey;
		const shadowImage = loadImage(shadow);
		const { frames : shadowFrames = 1 } : { frames?: number } = shadow;
		const jockeyOffset = 8;
		const jockeyCoordinate = {
			x: x - centerActorOffset,
			y: trackPosition + jockeyOffset,
		}

		const obstacleImage = loadImage(obstacle);
		const obstacleRange = 800;
		const obstacleOffset = Math.ceil(preciseTick % obstacleRange);
		const obstacleCoordinate = {
			x: x - centerActorOffset - obstacleOffset + obstacleRange/2,
			y: trackPosition + jockeyOffset,
		}

		fillAnimation({
			source,
			image: shadowImage,
			coordinate: jockeyCoordinate,
			timestamp,
			fps,
			cycleSpeed,
			imageFrames: shadowFrames,
		});

		fillAnimation({
			source,
			image: horseImage,
			coordinate: horseCoordinate,
			timestamp,
			fps,
			cycleSpeed,
			imageFrames: horseFrames,
		});

		fillAnimation({
			source,
			image: jockeyImage,
			coordinate: jockeyCoordinate,
			timestamp,
			fps,
			cycleSpeed,
			imageFrames: jockeyFrames,
		});

		const requestObstacle = requestFrame({
			image: obstacleImage,
			framesCount: 2,
			frame: 1,
	   })

	   	fillStatic({
			source,
			image: obstacleImage,
			coordinate: obstacleCoordinate,
			request: requestObstacle,
	   	});

		// fillAnimation({
		// 	source,
		// 	image: obstacleImage,
		// 	coordinate: obstacleCoordinate,
		// 	timestamp,
		// 	fps,
		// 	cycleSpeed,
		// 	imageFrames: 1,
		// });




	}
	

}
