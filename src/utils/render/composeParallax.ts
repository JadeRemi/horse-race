import { useMemo } from 'react';
import {
	ImageInterface,
	CoordinateInterface,
	ISource,
	IParallax,
} from '../validations/models';

export function composeParallax({
	source: { ctx, atlas },
	parallax,
	parallaxSpeed,
	timestamp,
	fps,
	canvasWidth,
	canvasHeight,
	focusSpeed,
}: {
	source: ISource;
	parallax: IParallax;
	parallaxSpeed: number;
	timestamp: number;
	fps: number;
	canvasWidth: number;
	canvasHeight: number;
	focusSpeed: number;
}) {
	function getImageInfo(input: ImageInterface) {
		const img = new Image();
		img.src = input.path;
		return img;
	}

	const preciseTick = timestamp / (1000 / (fps * focusSpeed));
	const { track, sky, skyline, landscape } = parallax;

	const trackImage = getImageInfo(track);
	const skyImage = getImageInfo(sky);
	const skylineImage = getImageInfo(skyline);
	const landscapeImage = getImageInfo(landscape);

	const { naturalWidth: length, naturalHeight: height } = trackImage;
	const xAxisPoints = canvasWidth / length;
	const yAxisPoints = canvasHeight / height;
	const pixelsPerCycle = length * focusSpeed;

	function renderGrid(): void {
		ctx.save();
		const offset = Math.ceil(preciseTick % pixelsPerCycle);
		for (let i = 0; i < canvasWidth + pixelsPerCycle; i += length) {
			for (let y = 0; y < canvasHeight; y += height) {
				ctx.save();
				ctx.drawImage(trackImage, i - offset, y, length, height);
				ctx.restore();
			}
		}
		ctx.restore();
	}

	function renderSky(): void {
		const ratio = canvasWidth / canvasHeight;

		const skyHeight = height; //* ratio;
		ctx.drawImage(
			skyImage,
			0,
			0,
			length,
			height,
			0,
			0,
			canvasWidth,
			skyHeight,
		);
	}

	function renderTrack(): void {
		//ctx.save()

		//const offset = Math.ceil(preciseTick % pixelsPerCycle)
		const offset = Math.ceil(preciseTick % length);

		const { x, y }: CoordinateInterface = {
			x: 0,
			y: 50,
		};
		ctx.drawImage(trackImage, x - offset, y, length, height);

		// for (let i = x; i < canvasWidth + pixelsPerCycle; i += length) {
		//
		//         ctx.save();
		//         ctx.drawImage(img, i - offset, y, length, height);
		//         ctx.restore();
		//
		// }

		//ctx.restore()
	}

	renderSky();
	renderTrack();

	// renderGrid();
}
