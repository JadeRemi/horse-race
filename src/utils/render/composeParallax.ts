import { loadImage } from '../image/loadImage';
import {
	ImageInterface,
	CoordinateInterface,
	ISource,
	IParallaxDisplay,
	ICanvasParams,
} from '../validations/models';

export function composeParallax({
	source: { ctx, atlas },
	parallax,
	parallaxSpeed,
	timestamp,
	fps,
	canvasParams,
	focusSpeed,
}: {
	source: ISource;
	parallax: IParallaxDisplay;
	parallaxSpeed: number;
	timestamp: number;
	fps: number;
	canvasParams: ICanvasParams;
	focusSpeed: number;
}) {

	const { canvasWidth, canvasHeight } = canvasParams;
	if (canvasWidth <= 0 || canvasHeight <= 0) return;
	const preciseTick = timestamp / (1000 / (fps * focusSpeed));
	const { track, sky, skyline, landscape, border, fence: {
		top: fenceTop, bottom: fenceBottom,
	} } = parallax;

	const fixedTiles = [ sky ];
	const iterableTiles = [ track, border, fenceTop, fenceBottom ];
	const iterableTilesNaturalSpeed = [ skyline, landscape ];

	function renderGrid(image : HTMLImageElement): void {
		//const xAxisPoints = canvasWidth / length;
		//const yAxisPoints = canvasHeight / height;
		const { naturalWidth: length, naturalHeight: height } = image;
		const pixelsPerCycle = length * focusSpeed;
		const offset = Math.ceil(preciseTick % pixelsPerCycle);

		ctx.save();
		for (let i = 0; i < canvasWidth + pixelsPerCycle; i += length) {
			for (let y = 0; y < canvasHeight; y += height) {
				ctx.save();
				ctx.drawImage(image, i - offset, y, length, height);
				ctx.restore();
			}
		}
		ctx.restore();
	}

	function renderFixedTile(image : HTMLImageElement): void {
		const ratio = canvasWidth / canvasHeight;
		const { naturalWidth: length, naturalHeight: height } = image;
		if (length <= 0 || height <= 0) return;

		const imageHeight = height * ratio;
		ctx.drawImage(
			image,
			0,
			0,
			length,
			height,
			0,
			0,
			canvasWidth,
			imageHeight,
		);
	}

	function renderIterableTile(image : HTMLImageElement, slow : number = 1): void {
		const { naturalWidth: length, naturalHeight: height } = image;
		const slowModifier = 1.5;
		const slowdown = slow > 1
			? (slow * slowModifier)
			: slow;
		const offset = Math.ceil(preciseTick % (length * slowdown));

		const { x, y }: CoordinateInterface = {
			x: 0,
			y: 0,
		};
		//ctx.drawImage(image, x - offset, y, length, height);
		if (length <= 0 || height <= 0 || slow <= 0) {
			return;
		}
		for (let i = +x; i <= canvasWidth + length; i += length) {
			const coordinateX = (i - (offset / slowdown));
			ctx.drawImage(image, coordinateX, y, length, height);
		}

		//ctx.save()
		//const offset = Math.ceil(preciseTick % pixelsPerCycle)
		// for (let i = x; i < canvasWidth + pixelsPerCycle; i += length) {
		//
		//         ctx.save();
		//         ctx.drawImage(img, i - offset, y, length, height);
		//         ctx.restore();
		//
		// }
		//ctx.restore()
	}


	//const fixedTilesImages = Object.values(fixedTiles) || [];
	//const iterableTilesImages = Object.values(iterableTiles) || [];
	fixedTiles.forEach((x : ImageInterface) => renderFixedTile(
		loadImage(x)
	));
	iterableTiles.forEach((x : ImageInterface) => renderIterableTile(
		loadImage(x)
	));

	iterableTilesNaturalSpeed.forEach((x : ImageInterface, index : number, array: ImageInterface[]) => renderIterableTile(
		loadImage(x), array?.length - index + 1
	));
}
