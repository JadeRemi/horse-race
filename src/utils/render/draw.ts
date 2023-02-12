import { fillBackground } from './fillBackground';
import { composeParallax } from './composeParallax';
import { composeActors } from './composeActors';
import { composeOverlay } from './composeOverlay';
import {
	SettingsInterface,
	ReplayInterface,
	ISource,
	ConvertedParticipant,
	ConvertedObstacle,
} from '../validations/models';
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
	replay,
	stats,
}: {
	source: ISource;
	canvas: HTMLCanvasElement | null;
	settings: SettingsInterface | null;
	replay: ReplayInterface | null;
	stats: { players: ConvertedParticipant[], obstacles: ConvertedObstacle[] }
}) {
	//const { phantom } : { phantom: HTMLCanvasElement | null } = source;
	const layout = {
		track: DICTIONARY.TILES.TRACK_DIRT,
		sky: DICTIONARY.TILES.BACK_SKY,
		skyline: DICTIONARY.TILES.BACK_ROCKS,
		landscape: DICTIONARY.TILES.BACK_DUNES,
		fence: { 
			top: DICTIONARY.TILES.FENCE_GRASS_TOP,
			bottom: DICTIONARY.TILES.FENCE_GRASS_BOTTOM,
		},
		border: DICTIONARY.TILES.BORDER_GRASS,

	};
	const actors = {
		horse: DICTIONARY.ACTORS.HORSE,
		jockey: DICTIONARY.ACTORS.JOCKEY,
		shadow: DICTIONARY.ACTORS.HORSE_SHADOW,
		obstacle: DICTIONARY.ACTORS.OBSTACLE_JUMP,
	}
	const overlay = {
		avatar: DICTIONARY.TILES.PFP_EXAMPLE,
		rating: DICTIONARY.TILES.UI_BANNER,
	}

	const fps = DEFAULTS.framesPerSecond;
	const timestamp = Date.now();
	const { width: canvasWidth, height: canvasHeight } = canvas;
	const {
		backgroundPalette,
		focusSpeed,
		parallaxSpeed,
		cycleSpeed,
		textColor,
		textFont,
	}: {
		backgroundPalette: string;
		focusSpeed: number;
		parallaxSpeed: number;
		cycleSpeed: number;
		textColor: string;
		textFont: string;
	} = settings;

	const { participants } : {
        participants: number,
    } = replay;

	const {
		players, obstacles,
	} : {
		players: ConvertedParticipant[], obstacles: ConvertedObstacle[],
	} = stats;


	fillBackground({
		source,
		canvasParams: {
			canvasWidth,
			canvasHeight,
		},
		backgroundPalette,
	});
	composeParallax({
		source,
		parallax: layout,
		parallaxSpeed,
		timestamp,
		fps,
		canvasParams: {
			canvasWidth,
			canvasHeight,
		},
		focusSpeed,
	});
	composeActors({
		source,
		actors,
		timestamp,
		fps,
		canvasParams: {
			canvasWidth,
			canvasHeight,
		},
		focusSpeed,
		cycleSpeed,
		participants,
		obstacles,
		playerStats: players,
	});
	composeOverlay({
		source,
		overlay,
		timestamp,
		fps,
		canvasParams: {
			canvasWidth,
			canvasHeight,
		},
		textParams: {
			color: textColor,
			font: textFont,
		},
		focusSpeed,
		participants,
	});

	//setTimeout((()=>{
	//    draw({ source, canvas, settings, animate })
	//}), frameDuration);
}
