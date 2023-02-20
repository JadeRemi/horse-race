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
	pfp: 1,
	debugBGColor: '#3b3834',
	lastBreakpoint: 0,
	timeRecord: 0,
};

export const DEFAULT_NAMES = {
	YES: '✓',
	NO: '✗',
	UNKNOWN: 'UNKNOWN',
};
