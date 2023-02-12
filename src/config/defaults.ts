import { TDefaults } from '../utils/validations/models';

export const DEFAULTS : TDefaults = {
	participants: 1,
	duration: 1,
	length: 1,
	biome: 'grass',
	width: 640,
	height: 480,
	framesPerSecond: 10,
	animate: true,
	parallaxSpeed: 10,
	cycleSpeed: 3,
	backgroundPalette: '#FFFFFF',
	focusSpeed: 8,
	instantErrorNotification: false,
	focused: 1,
	textColor: '#FFFFFF',
	textFont: 'Ocra',
	trackToBGRatio: 35,
	horseColor: '#FFFFFF',
	players: [],
	obstacles: [],
};

export const DEFAULT_NAMES = {
	YES: '✓',
	NO: '✗',
	UNKNOWN: 'UNKNOWN',
};
