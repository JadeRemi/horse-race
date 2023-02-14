type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' |  'unshift'
type FixedLengthArray<T, L extends number, TObj = [T, ...Array<T>]> =
  Pick<TObj, Exclude<keyof TObj, ArrayLengthMutationKeys>>
  & {
    readonly length: L 
    [ I : number ] : T
    [Symbol.iterator]: () => IterableIterator<T>   
  }


export interface ImageInterface {
	path: string;
	speed?: number;
	frames?: number;
}

export interface CoordinateInterface {
	x: number;
	y: number;
}

export interface AnimationInterface {
	framesPerSecond: number;
	parallaxSpeed: number;
	cycleSpeed: number;
	backgroundPalette: string;
	focusSpeed: number;
	textColor: string;
	textFont: string;
}
export interface AnimateInterface {
	animate: boolean;
}

export interface DimensionsInterface {
	width: number;
	height: number;
}

export interface SettingsInterface
	extends DimensionsInterface,
		AnimationInterface {}

export interface ReplayInterface {
	participants: number,
	duration: number,
	length: number,
	biome: string,
	focused: number,
}

export interface PayloadSettings {
	duration: string;
	participants: string;
	biome: string;
	layout: string;
	length: string;
	focused: string;
}

export interface PayloadObstacle {
	id: string;
	name: string;
}

export interface PayloadPath {
	break: string;
	obstacle?: string;
	pass?: string;
	curve: string;
}

export interface PayloadParticipant {
	playerId: string;
	nickname: string;
	horseColor: string;
	jockeyColor: string;
	pfp: string;
	health: string;
	duration: string;
	place: string;
	speed: string;
	path: PayloadPath[];
}

export interface PayloadInterface {
	options: PayloadSettings;
	obstacles: PayloadObstacle[];
	participants: PayloadParticipant[];
}

export interface ConvertedSettings {
	duration: number;
	participants: number;
	biome: string;
	layout: string;
	length: number;
	focused: number;
}

export interface ConvertedObstacle {
	id: number;
	name: string;
}

export interface ConvertedPath {
	break: number;
	obstacle?: string;
	pass?: boolean;
	curve: string;
}

export interface ConvertedParticipant {
	playerId: number;
	nickname: string;
	horseColor: string;
	jockeyColor: string;
	pfp: number;
	health: number;
	duration: number;
	place: number;
	speed: number;
	path: ConvertedPath[];
}

export interface ConvertedInterface {
	options: ConvertedSettings;
	obstacles: ConvertedObstacle[];
	participants: ConvertedParticipant[];
}

export const optionsTypes = {
	duration: { type: 'number', required: true },
	participants: { type: 'number', required: true },
	biome: { type: 'string', required: true },
	layout: { type: 'string', required: true },
	length: { type: 'number', required: true },
};

export const obstaclesTypes = {
	id: { type: 'number', required: true },
	name: { type: 'string', required: true },
	effects: { type: 'array', required: false },
};

export const participantsTypes = {
	playerId: { type: 'number', required: true },
	nickname: { type: 'string', required: true },
	color: { type: 'string', required: true },
	health: { type: 'number', required: true },
	duration: { type: 'number', required: true },
	place: { type: 'number', required: true },
};
export interface IActorImage {
	frames: number;
	rows?: number;
	path: string;
	width?: number;
	height?: number;
}

export interface ITileImage {
	path: string;
	width?: number;
	height?: number;
}

export type IImage = IActorImage | ITileImage;

export interface IDictionary {
	ACTORS: {
		[key: string]: IActorImage;
	};
	TILES: {
		[key: string]: ITileImage;
	};
}

export interface ISource {
	ctx: CanvasRenderingContext2D | null;
	atlas: IDictionary;
	loaded: boolean;
	phantom: HTMLCanvasElement | null;
}

export interface ICanvasParams {
	canvasWidth: number;
	canvasHeight: number;
}

export interface IPhantomParams extends ICanvasParams {
	phantomColor?: string,
}

export interface ITextParams {
	font: string;
	color: string;
}

export interface IParallaxDisplay {
	sky: ImageInterface;
	skyline: ImageInterface;
	landscape: ImageInterface;
	track: ImageInterface;
	fence: { 
		top: ImageInterface;
		bottom: ImageInterface;
	},
	border: ImageInterface;
}

export interface IActorsDisplay {
	horse: ImageInterface;
	jockey: ImageInterface;
	shadow: ImageInterface;
	obstacle: ImageInterface;
}

export interface IOverlayDisplay {
	avatar: ImageInterface;
	rating: ImageInterface;
}

export interface IFrameRequest {
	x: number,
	y: number,
	height: number,
	width: number,
}

export type IDrawImageParamsFixed =
	FixedLengthArray<number, 2> |
	FixedLengthArray<number, 4> |
	FixedLengthArray<number, 8>


export type IDrawImageParamsConditional =
	[ number, number ] |
	[ number, number, number, number ] |
	[ number, number, number, number, number, number, number, number ]

export type IDrawImageParamsMax =
	[ number, number, number, number, number, number, number, number ]	

export type IDrawArgs = Array<number | HTMLImageElement>;

export interface IFitTo {
	height?: number,
	width?: number,
}

export interface TDefaults {
	participants: number,
	duration: number,
	length: number,
	biome: string,
	width: number,
	height: number,
	framesPerSecond: number,
	animate: boolean,
	parallaxSpeed: number,
	cycleSpeed: number,
	backgroundPalette: string,
	focusSpeed: number,
	instantErrorNotification: boolean,
	focused: number,
	textColor: string,
	textFont: string,
	trackToBGRatio: number,
	horseColor: string,
	players: ConvertedParticipant[],
	obstacles: ConvertedObstacle[],
}