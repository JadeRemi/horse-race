import {
	ImageInterface,
	CoordinateInterface,
	ISource,
	IFitTo,
} from '../validations/models';
import { fillStatic } from './fillStatic';
import { requestFrame } from '../image/loadImage';

export function fillAnimation({
	source,//: { ctx, atlas },
	image,
	coordinate,
	timestamp,
	fps,
	cycleSpeed,
	imageFrames,
	fitTo,
}: {
	source: ISource;
	image: HTMLImageElement;
	coordinate: CoordinateInterface;
	timestamp: number;
	fps: number;
	cycleSpeed: number;
	imageFrames: number;
	fitTo?: IFitTo;
}) {

	const preciseTick = timestamp / (1000 / (fps * cycleSpeed));
	const frame = Math.ceil(preciseTick % imageFrames);
	const frameBound = frame < 0
		? 0
		: frame > imageFrames - 1
			? imageFrames - 1
			: frame;

	const requestImageFrame = requestFrame({
		image,
		framesCount: imageFrames,
		frame: frameBound,
   })

	fillStatic({
		source,
		image,
		coordinate,
		request: requestImageFrame,
	});

	// ctx.drawImage(
	// 	image,
	// 	length * frameBound,
	// 	0,
	// 	length,
	// 	height,
	// 	coordinateX,
	// 	coordinateY,
	// 	length,
	// 	height,
	// );
}
