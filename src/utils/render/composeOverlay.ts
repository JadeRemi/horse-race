import { loadImage, requestFrame } from '../image/loadImage';
import { fillStatic } from './fillStatic';
import {
	ImageInterface,
	CoordinateInterface,
	ISource,
	ICanvasParams,
	IOverlayDisplay,
} from '../validations/models';

export function composeOverlay({
	source,
	overlay,
	timestamp,
	fps,
	canvasParams,
	focusSpeed,
}: {
	source: ISource;
	overlay: IOverlayDisplay;
	timestamp: number;
	fps: number;
	canvasParams: ICanvasParams;
	focusSpeed: number;
}) {

	const { canvasWidth, canvasHeight } = canvasParams;
	if (canvasWidth <= 0 || canvasHeight <= 0) return;
	//const preciseTick = timestamp / (1000 / (fps * focusSpeed));
	const { rating, avatar } = overlay;

	const avatarImage = loadImage(avatar);
	const avatarCoordinate = {
		x: 50,
		y: 50,
	};
	const requestAvatar = requestFrame({
		image: avatarImage,
		framesCount: 7,
		frame: 1,
	})

	const ratingImage = loadImage(rating);
	const ratingCoordinate = {
		x: 50,
		y: 150,
	};
	const requestRating = requestFrame({
		image: avatarImage,
		framesCount: 1,
		frame: 1,
		rowsCount: 4,
		row: 1,
	})

	fillStatic({
		source,
		image: avatarImage,
		coordinate: avatarCoordinate,
		request: requestAvatar,
	});

	fillStatic({
		source,
		image: ratingImage,
		coordinate: ratingCoordinate,
		request: requestRating,
	});

	source.ctx.font = "30px Ocra";
	source.ctx.textAlign = "start";
    source.ctx.textBaseline = "bottom";
	source.ctx.fillStyle = "#ff00ff";
	source.ctx.fillText("1st", 10, 50);
	
}
