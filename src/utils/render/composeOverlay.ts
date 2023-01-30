import { loadImage, requestFrame } from '../image/loadImage';
import { fillStatic } from './fillStatic';
import { fillText } from './fillText';
import {
	ITextParams,
	ISource,
	ICanvasParams,
	IOverlayDisplay,
} from '../validations/models';

import { ordinal } from '../misc/ordinal';
import { DEFAULT_NAMES } from '../../config/defaults';

export function composeOverlay({
	source,
	overlay,
	timestamp,
	fps,
	canvasParams,
	textParams,
	focusSpeed,
	participants,
}: {
	source: ISource;
	overlay: IOverlayDisplay;
	timestamp: number;
	fps: number;
	canvasParams: ICanvasParams;
	textParams: ITextParams;
	focusSpeed: number;
	participants: number;
}) {

	const { canvasWidth, canvasHeight } = canvasParams;
	if (canvasWidth <= 0 || canvasHeight <= 0) return;
	if (participants <= 0) return;
	//const preciseTick = timestamp / (1000 / (fps * focusSpeed));
	const { rating, avatar } = overlay;
	const { color: textColor, font: textFont } = textParams;

	for (let i = 0; i < participants; i += 1) {
		const verticalOffset = -30;
		const trackPosition = (canvasHeight / 2) + verticalOffset + (i * ( 
			(canvasHeight / 2 - 50)
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
		const avatarOffset = 5;
		const avatarImage = loadImage(avatar);
		const avatarCoordinate = {
			x: 0 + avatarOffset,
			y: trackPosition,
		};
		const requestAvatar = requestFrame({
			image: avatarImage,
			framesCount: 7,
			frame: 1,
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
		const textMessage = ordinal(i + 1) || DEFAULT_NAMES.UNKNOWN;

		fillText({
			source,
			font: textFont,
			text: textMessage,
			color: textColor,
			coordinate: textCoordinate,
		});

	}
}
