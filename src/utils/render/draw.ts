import { fillBackground } from './fillBackground';
import { composeParallax } from './composeParallax';
import { fillAnimation } from './fillAnimation';
import { fillStatic } from './fillStatic';
import { SettingsInterface, ISource } from '../validations/models';
import { default as DICTIONARY } from '../../utils/image/assetDictionary';
import { DEFAULTS } from '../../config/defaults';

const RESOURCES = {
	img1: {
		path: 'https://user-images.githubusercontent.com/85193527/205502147-169e1604-29a5-49eb-a797-1f7b84cfae33.svg',
		speed: 3,
		frames: 14,
	},
	img2: {
		path: 'https://user-images.githubusercontent.com/85193527/205508448-20cba659-7c06-4ed1-95a3-0775162ed7ee.png',
	},
};

export function draw({
	source,
	canvas,
	settings,
}: {
	source: ISource;
	canvas: HTMLCanvasElement | null;
	settings: SettingsInterface | null;
}) {
	const horse = DICTIONARY.ACTORS.HORSE;
	const layout = {
		track: DICTIONARY.TILES.TRACK_DIRT,
		sky: DICTIONARY.TILES.BACK_SKY,
		skyline: DICTIONARY.TILES.BACK_ROCKS,
		landscape: DICTIONARY.TILES.BACK_DUNES,
	};
	const coordinate = {
		x: 50,
		y: 50,
	};
	const coordinate2 = {
		x: 150,
		y: 150,
	};
	const fps = DEFAULTS.framesPerSecond;
	const timestamp = Date.now();
	const { width: canvasWidth, height: canvasHeight } = canvas;
	const {
		backgroundPalette,
		focusSpeed,
		parallaxSpeed,
		cycleSpeed,
	}: {
		backgroundPalette: string;
		focusSpeed: number;
		parallaxSpeed: number;
		cycleSpeed: number;
	} = settings;

	fillBackground({ source, canvasWidth, canvasHeight, backgroundPalette });
	composeParallax({
		source,
		parallax: layout,
		parallaxSpeed,
		timestamp,
		fps,
		canvasWidth,
		canvasHeight,
		focusSpeed,
	});
	fillAnimation({
		source,
		image: horse,
		coordinate: coordinate2,
		timestamp,
		fps,
		cycleSpeed,
	});
	fillStatic({ source, coordinate });

	//setTimeout((()=>{
	//    draw({ source, canvas, settings, animate })
	//}), frameDuration);
}
