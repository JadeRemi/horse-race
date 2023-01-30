import {
	ImageInterface,
	CoordinateInterface,
	ISource,
} from '../validations/models';

export function fillAnimation({
	source: { ctx, atlas },
	image,
	coordinate,
	timestamp,
	fps,
	cycleSpeed,
	imageFrames,
}: {
	source: ISource;
	image: HTMLImageElement;
	coordinate: CoordinateInterface;
	timestamp: number;
	fps: number;
	cycleSpeed: number;
	imageFrames: number;
}) {

	const preciseTick = timestamp / (1000 / (fps * cycleSpeed));
	const frame = Math.ceil(preciseTick % imageFrames);
	const { x: coordinateX, y: coordinateY } = coordinate;
	const frameBound = frame < 0
		? 0
		: frame > imageFrames - 1
			? imageFrames - 1
			: frame;
	const length = image.width / imageFrames;
	const height = image.height;
	ctx.drawImage(
		image,
		length * frameBound,
		0,
		length,
		height,
		coordinateX,
		coordinateY,
		length,
		height,
	);
}
