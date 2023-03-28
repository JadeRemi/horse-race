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
	IParallaxDisplay,
} from '../validations/models';
import { default as DICTIONARY } from '../../utils/image/assetDictionary';
import { DEFAULTS } from '../../config/defaults';

export function draw({
	source,
	canvas,
	settings,
	replay,
	stats,
	timestamp,
}: {
	source: ISource;
	canvas: HTMLCanvasElement | null;
	settings: SettingsInterface | null;
	replay: ReplayInterface | null;
	stats: { players: ConvertedParticipant[], obstacles: ConvertedObstacle[] };
	timestamp: number;
}) {

	const layout : IParallaxDisplay = {
		track: DICTIONARY.TILES.TRACK_GRASS,
		sky: DICTIONARY.TILES.BACK_SKY,
		skyline: DICTIONARY.TILES.BACK_ROCKS,
		landscape: DICTIONARY.TILES.BACK_DUNES,
		fence: { 
			top: DICTIONARY.TILES.FENCE_WOOD,
			bottom: DICTIONARY.TILES.FENCE_METAL,
		},
		border: {
			top: DICTIONARY.TILES.BORDER_GRASS_TOP,
			bottom: DICTIONARY.TILES.BORDER_GRASS_BOTTOM,
		},

	};
	const actors = {
		horseRun: DICTIONARY.ACTORS.HORSE_RUN,
		horseJump: DICTIONARY.ACTORS.HORSE_JUMP,
		jockeyRun: DICTIONARY.ACTORS.HORSE_RUN_JOCKEY,
		jockeyJump: DICTIONARY.ACTORS.HORSE_JUMP_JOCKEY,
		shadow: DICTIONARY.ACTORS.HORSE_SHADOW,
		obstacle: DICTIONARY.ACTORS.OBSTACLE_JUMP,
	}
	const overlay = {
		avatar: DICTIONARY.TILES.PFP_EXAMPLE,
		rating: DICTIONARY.TILES.UI_BANNER,
	}

	const fps = DEFAULTS.framesPerSecond;

	const { width: canvasWidth, height: canvasHeight } = canvas;
	const {
		backgroundPalette,
		parallaxSpeed,
		cycleSpeed,
		textColor,
		textFont,
	}: {
		backgroundPalette: string;
		parallaxSpeed: number;
		cycleSpeed: number;
		textColor: string;
		textFont: string;
	} = settings;

	const { participants, focused, duration } : {
        participants: number,
		focused: number,
		duration: number,
    } = replay;

	const {
		players, obstacles,
	} : {
		players: ConvertedParticipant[], obstacles: ConvertedObstacle[],
	} = stats;

	function mainPlayer(player : ConvertedParticipant) {
		return player?.id === focused;
	}

	const focusSpeed = players.find(mainPlayer)?.speed || DEFAULTS.focusSpeed;
	const startFinishSeq = false;


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
		participants,
		startFinishSeq,
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
		startFinishSeq,
		duration,
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
		playerStats: players,
	});

	//setTimeout((()=>{
	//    draw({ source, canvas, settings, animate })
	//}), frameDuration);
}
