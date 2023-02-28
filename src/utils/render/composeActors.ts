import { loadImage, requestFrame } from '../image/loadImage';
import { fillAnimation } from './fillAnimation';
import { fillStatic } from './fillStatic';
import {
	ISource,
	ICanvasParams,
	IActorsDisplay,
	ConvertedObstacle,
	ConvertedParticipant,
	ConvertedPath,
} from '../validations/models';
import { DEFAULTS } from '../../config/defaults';

export function composeActors({
	source,
	timestamp,
	actors,
	fps,
	canvasParams,
	focusSpeed,
	cycleSpeed,
	participants,
	obstacles,
	playerStats,
	startFinishSeq = false,
	duration
}: {
	source: ISource;
	timestamp: number;
	fps: number;
	actors: IActorsDisplay;
	canvasParams: ICanvasParams;
	focusSpeed: number;
	cycleSpeed: number;
	participants: number;
	obstacles: ConvertedObstacle[],
	playerStats: ConvertedParticipant[],
	startFinishSeq?: boolean,
	duration: number,
}) {

	const { canvasWidth, canvasHeight } = canvasParams;
	const phantomParams = { canvasWidth, canvasHeight };
	if (canvasWidth <= 0 || canvasHeight <= 0) return;
	if (participants <= 0) return;

	const pixelFocusSpeed = DEFAULTS.pixelsPerMapUnit * focusSpeed;
	const preciseTick = timestamp / (1000 / (fps * pixelFocusSpeed));
	const preciseSecond =  preciseTick / 10;

	const { horse, jockey, shadow, obstacle } = actors;
	const { x, y } = {
		x: startFinishSeq
			? canvasWidth / 2///////// TODO
			: canvasWidth / 2,
		y: canvasHeight / 2,
	};

	const canvasSection = canvasHeight / 2;
	const verticalOffsetCoef = 4;
	const verticalOffset = canvasSection / 100 * verticalOffsetCoef;

	for (let i = 0; i < participants; i += 1) {
		const trackPosition = y + verticalOffset + (i * ( 
			( canvasSection - (canvasSection / 100 * 30))
			/ participants));

		const playerStat : ConvertedParticipant = playerStats[i];
		const {
			horseColor,
			jockeyColor,
			speed,
			path,
		} : {
			horseColor: string,
			jockeyColor: string,
			speed: number,
			path : ConvertedPath[],
		} = playerStat;

		//const { horseColor, jockeyColor } : { horseColor?: string, jockeyColor?: string } = phantomColor;

		const horseImage = loadImage(horse);
		const { frames : horseFrames = 1 } : { frames?: number } = horse;
		const centerActorOffset = horseImage.width / horseFrames / 2 || 0;
		const deltaSpeedOffset = (focusSpeed - speed) * DEFAULTS.pixelsPerMapUnit * preciseSecond || 0;
		const horseCoordinate = {
			x: x - centerActorOffset - deltaSpeedOffset,
			y: trackPosition,
		};
		
		const jockeyImage = loadImage(jockey);
		const { frames : jockeyFrames = 1 } : { frames?: number } = jockey;
		const shadowImage = loadImage(shadow);
		const { frames : shadowFrames = 1 } : { frames?: number } = shadow;
		const jockeyOffset = 8;
		const jockeyCoordinate = {
			x: x - centerActorOffset - deltaSpeedOffset,
			y: trackPosition + jockeyOffset,
		}

		if ( horseCoordinate.x < canvasWidth && (horseCoordinate.x + horseImage?.width / horseFrames) > 0) {

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
				viaPhantom: true,
				phantomParams: { ...phantomParams, phantomColor: horseColor },
			});
	
			fillAnimation({
				source,
				image: jockeyImage,
				coordinate: jockeyCoordinate,
				timestamp,
				fps,
				cycleSpeed,
				imageFrames: jockeyFrames,
				viaPhantom: true,
				phantomParams: { ...phantomParams, phantomColor: jockeyColor },
			});

		}

		path.forEach((item : ConvertedPath) => {

			const  { break: breakPoint, obstacle: obstacleType, pass } : { break: number, obstacle?: number, pass?: boolean } = item;
			if (!obstacleType) return;

			const obstacleImage = loadImage(obstacle);
			const obstacleRange = breakPoint * DEFAULTS.pixelsPerMapUnit;
			const obstacleOffset = Math.ceil(preciseTick % duration);
			const coordinateX = x - centerActorOffset - obstacleOffset + obstacleRange;

			const { width: obstacleWidth } = obstacleImage;

			if (coordinateX > canvasWidth || coordinateX + obstacleWidth < 0) return;
			
			const obstacleCoordinate = {
				x: coordinateX,
				y: trackPosition,
			}
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

		})

		//const obstableMap = path.reduce(reducePath, {});




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
