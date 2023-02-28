import { loadImage, requestFrame } from '../image/loadImage';
import { fillStatic } from './fillStatic';
import { fillText } from './fillText';
import {
	ITextParams,
	ISource,
	ICanvasParams,
	IOverlayDisplay,
	ConvertedParticipant,
} from '../validations/models';

import { ordinal } from '../misc/ordinal';
import { DEFAULTS, DEFAULT_NAMES } from '../../config/defaults';

export function composeOverlay({
	source,
	overlay,
	timestamp,
	fps,
	canvasParams,
	textParams,
	focusSpeed,
	participants,
	playerStats,
}: {
	source: ISource;
	overlay: IOverlayDisplay;
	timestamp: number;
	fps: number;
	canvasParams: ICanvasParams;
	textParams: ITextParams;
	focusSpeed: number;
	participants: number;
	playerStats: ConvertedParticipant[];
}) {

	const { canvasWidth, canvasHeight } = canvasParams;
	if (canvasWidth <= 0 || canvasHeight <= 0) return;
	if (participants <= 0) return;

	const { rating, avatar } = overlay;
	const { color: textColor, font: textFont } = textParams;

	function reduceToDistance(acc : number[], item : ConvertedParticipant) {
		const pixelFocusSpeed = DEFAULTS.pixelsPerMapUnit * item.speed;
		const preciseStep : number = (timestamp / 1000) * pixelFocusSpeed;
		return acc.concat([ preciseStep ]);
	}
	const distanceComparison = playerStats.reduce(reduceToDistance, []);

	function reduceToPosition(acc : number[], item : number) {
		const position = distanceComparison.filter(x => x > item)?.length || 0;
		return acc.concat([ position + 1 ]);
	}

	const positionComparison = distanceComparison.reduce(reduceToPosition, []);

	for (let i = 0; i < participants; i += 1) {
		const playerStat : ConvertedParticipant = playerStats[i];

		const canvasSection = canvasHeight / 2;
		const verticalOffsetCoef = 12;
		const verticalOffset = canvasSection / 100 * verticalOffsetCoef;

		const trackPosition = (canvasHeight / 2) + verticalOffset + (i * ( 
			( canvasSection - (canvasSection / 100 * 30))
			/ participants));

		/* [ Render rating GUI ] */
		const ratingImage = loadImage(rating);
		const ratingCoordinate = {
			 x: 0,
			 y: trackPosition,
		};
		const requestRating = requestFrame({
			 image: ratingImage,
			 framesCount: 1,
			 frame: 1,
			 rowsCount: 4,
			 row: 1,
		})

		fillStatic({
			source,
			image: ratingImage,
			coordinate: ratingCoordinate,
			request: requestRating,
		});

		/* [ Render pfp avatar ] */
		const { pfp = DEFAULTS.pfp, speed } : { pfp : number, speed : number } = playerStat;
		const avatarOffset = 5;
		const avatarImage = loadImage(avatar);
		const avatarCoordinate = {
			x: 0 + avatarOffset,
			y: trackPosition,
		};
		const requestAvatar = requestFrame({
			image: avatarImage,
			framesCount: 7,
			frame: pfp,
		})

		fillStatic({
			source,
			image: avatarImage,
			coordinate: avatarCoordinate,
			request: requestAvatar,
			fitTo: {
				width: 20,
			}
		});

		/* [ Render position text ] */
		const textOffset = 25;
		const fontSize = 20;
		const textCoordinate = {
			x: 0 + textOffset,
			y: trackPosition + fontSize,
		};
		const playerPlace = positionComparison[i];
		const textMessage = ordinal(playerPlace) || DEFAULT_NAMES.UNKNOWN;

		fillText({
			source,
			font: textFont,
			text: textMessage,
			color: textColor,
			coordinate: textCoordinate,
		});

	}
}
