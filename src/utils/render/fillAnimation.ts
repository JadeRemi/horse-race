import {
	ImageInterface,
	CoordinateInterface,
	ISource,
	IFitTo,
	IPhantomParams,
} from '../validations/models';
import { fillStatic } from './fillStatic';
import { requestFrame } from '../image/loadImage';

export function fillAnimation({
	source,
	image,
	coordinate,
	timestamp,
	fps,
	cycleSpeed,
	imageFrames,
	fitTo,
	viaPhantom = false,
	phantomParams,
	fillColor,
}: {
	source: ISource;
	image: HTMLImageElement;
	coordinate: CoordinateInterface;
	timestamp: number;
	fps: number;
	cycleSpeed: number;
	imageFrames: number;
	fitTo?: IFitTo;
	viaPhantom?: boolean;
	phantomParams?: IPhantomParams;
	fillColor?: string;
}) {

	const preciseTick = timestamp / (1000 / (fps * cycleSpeed));
	const frame = Math.ceil(preciseTick % imageFrames);
	const frameBound = frame <= 0
		? 0
		: frame > imageFrames - 1
			? imageFrames - 1
			: frame;

	const requestImageFrame = requestFrame({
		image,
		framesCount: imageFrames,
		frame: frameBound + 1,
   })

	fillStatic({
		source,
		image,
		coordinate,
		request: requestImageFrame,
		viaPhantom,
		phantomParams,
		fillColor,
	});
}
