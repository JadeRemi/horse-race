import { loadImage, requestFrame } from '../image/loadImage';
import {
	ImageInterface,
	CoordinateInterface,
	ISource,
	IParallaxDisplay,
	ICanvasParams,
	ITile,
	ISectionAlign,
} from '../validations/models';
import { fillStatic } from './fillStatic';

export function composeParallax({
	source,
	parallax,
	parallaxSpeed,
	timestamp,
	fps,
	canvasParams,
	focusSpeed,
	participants,
}: {
	source: ISource;
	parallax: IParallaxDisplay;
	parallaxSpeed: number;
	timestamp: number;
	fps: number;
	canvasParams: ICanvasParams;
	focusSpeed: number;
	participants: number;
}) {
	const { ctx } = source;
	const { canvasWidth, canvasHeight } = canvasParams;
	if (canvasWidth <= 0 || canvasHeight <= 0) return;
	const preciseTick = timestamp / (1000 / (fps * focusSpeed));
	const { track, sky, skyline, landscape, border: {
		top: borderTop, bottom: borderBottom,
	}, fence: {
		top: fenceTop, bottom: fenceBottom,
	} } = parallax;

	//const fixedTiles = [ ];
	const playerTrackLines = (() => {
		const lines = participants % 2 === 1
			? (participants + 1) / 2
			: participants / 2;
		return Math.floor(lines);
	})();
	const emptyPlayerTracks = new Array(playerTrackLines).fill('');
	const iterableTrackTiles : ITile[] = emptyPlayerTracks.map(
		( _, index: number) => {
			const maxHeight = 70;
			const startOffset = 15;
			const tileHeight = maxHeight / playerTrackLines;
			const tileOffset = startOffset + (tileHeight * index);
			return {
				tile: track,
				section: 'bottom',
				align: 'top',
				height: tileHeight,
				offset: tileOffset,
			}
		}
	);
	
	// [{
	// 	tile: track,
	// 	section: 'bottom',
	// 	align: 'top',
	// 	height: 70,
	// 	offset: 15,
	// }, ]
	const iterableTiles : ITile[] = [ {
			tile: sky,
			section: 'top',
			align: 'top',
			height: 80, // represents percentage of taken section
		}, {
			tile: borderTop,
			section: 'bottom',
			align: 'top',
			height: 15,
			offset: 0,
		}, {
			tile: borderBottom,
			section: 'bottom',
			align: 'bottom',
			height: 15,
			offset: 0,
		}, {
			tile: fenceTop,
			section: 'bottom',
			align: 'top',
			height: 5,
			offset: 10,
		}, {
			tile: fenceBottom,
			section: 'bottom',
			align: 'bottom',
			height: 5,
			offset: 15,
		} ];
	const iterableTilesNaturalSpeed : ITile[] = [ {
			tile: skyline,
			section: 'top',
			align: 'bottom',
			height: 50,
			offset: 5,
		}, {
			tile: landscape,
			section: 'top',
			align: 'bottom',
			height: 20,
			offset: 0,
		} ];

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

	function renderFixedTile({
		image,
	} : {
		image : HTMLImageElement,
	}): void {
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

	function renderIterableTile({
		image,
		slow = 1,
		layout,
	} : {
		image : HTMLImageElement,
		slow? : number,
		layout?: {
			section: ISectionAlign,
			align: ISectionAlign,
			height?: number,
			offset?: number,
		}
	}): void {
		const { naturalWidth: length, naturalHeight: height } = image;
		const { section, align, height: tileFitHeight, offset: sectionOffset = 0 } : {
			section? : ISectionAlign, align? : ISectionAlign, height?: number, offset?: number,
		} = layout || {};
		const slowModifier = 1.5;
		const slowdown = slow > 1
			? (slow * slowModifier)
			: slow;
		const canvasSection = canvasHeight / 2;
		const calculatedHeight = tileFitHeight ? canvasSection / 100 * tileFitHeight : 0;
		const calculatedLength = calculatedHeight
			? length * (calculatedHeight / height)
			: length;
		const offset = Math.ceil(preciseTick % (calculatedLength * slowdown));

		const { x, y }: CoordinateInterface = {
			x: 0,
			y: 0,
		};

		//ctx.drawImage(image, x - offset, y, length, height);
		if (calculatedLength <= 0 || height <= 0 || slow <= 0) {
			return;
		}
		let coordinateY = y;

		if (!!section && !!align && !!calculatedHeight) {
			const calculatedOffset = canvasSection / 100 * sectionOffset;
			if (section === 'top') {
				coordinateY = (align === 'top')
				? 0 + calculatedOffset
				: (align === 'bottom')
					? canvasSection - calculatedHeight - calculatedOffset
					: y;
			}
			if (section === 'bottom') {
				coordinateY = (align === 'top')
					? canvasSection + calculatedOffset
					: (align === 'bottom')
						? canvasHeight - calculatedHeight - calculatedOffset
						: y;
			}
		}

		coordinateY = Math.round(coordinateY);

		for (let i = +x; i <= canvasWidth + calculatedLength; i += calculatedLength) {
			const coordinateX = (i - (offset / slowdown));
			//ctx.drawImage(image, coordinateX, y, length, height);
			fillStatic({
				source,
				image,
				coordinate: { x: coordinateX, y: coordinateY },
				//fitTo: { height: canvasHeight / 2}
				...(!!calculatedHeight && {
					fitTo: { height: calculatedHeight }
				}),
			});
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

	// fixedTiles.forEach((x : ImageInterface) => renderFixedTile(
	// 	loadImage(x)
	// ));

	function tileWrap({
		tile: x,
		slow = 0,
	} : {
		tile : ITile,
		slow? : number,
	}) {
		return renderIterableTile({
			image: loadImage(x.tile),
			...(!!slow && {
				slow,
			}),
			...(!!x.section && !!x.align && {
				layout: {
					section: x.section,
					align: x.align,
					...(!!x.height && { height: x.height }),
					...(!!x.offset && { offset: x.offset }),
				}
			})
	})};

	iterableTrackTiles.forEach((x : ITile) => tileWrap({
		tile: x, 
		slow: 0,
	}));

	iterableTiles.forEach((x : ITile) => tileWrap({
		tile: x, 
		slow: 0,
	}));

	iterableTilesNaturalSpeed.forEach((x : ITile, index : number, array: ITile[]) => {
		return tileWrap({
			tile: x,
			slow: array?.length - index + 1
		})
	})};
