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
}: {
	source: ISource;
	image: ImageInterface;
	coordinate: CoordinateInterface;
	timestamp: number;
	fps: number;
	cycleSpeed: number;
}) {
	const { frames, path } = image;
	const preciseTick = timestamp / (1000 / (fps * cycleSpeed));
	const frame = Math.ceil(preciseTick % frames);
	const { x: coordinateX, y: coordinateY } = coordinate;
	const frameBound = frame < 0 ? 0 : frame > frames - 1 ? frames - 1 : frame;
	const img = new Image();
	img.src = path;
	const length = img.width / frames;
	const height = img.height;
	ctx.drawImage(
		img,
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
