import PAYLOAD from '../../assets/payload/payload.json';
import CONFIG from '../../config/canvas.json';
import { useStateTree } from '../../store/main';
import {
	PayloadInterface,
	PayloadSettings,
	PayloadObstacle,
	PayloadPath,
	PayloadParticipant,
	ConvertedSettings,
	ConvertedObstacle,
	ConvertedPath,
	ConvertedParticipant,
	ConvertedInterface,
} from '../validations/models';
import { toString, toNumber, toBoolean } from '../validations/conversions';
import { collectErrors } from '../validations/errors';

const baseAccum: {
	errors: string[];
	items: any[];
} = {
	errors: [],
	items: [],
};
interface PlayerContext {
	setPlayerData: Function;
	participants: number;
	duration: number;
	length: number;
	biome: string;
	focused: number;
}

interface ConfigContext {
	setDimensions: Function;
	setAnimationParams: Function;
	setAnimate: Function;
	width: number;
	height: number;
}

interface StatContext {
	setStats: Function;
	players: ConvertedParticipant[];
	obstacles: ConvertedObstacle[];
}

export function loadPlayerData({ replay }: { replay: PlayerContext }) {
	const { options } = convertPlayerData({
		payload: PAYLOAD,
	});
	const { participants, duration, length, biome, focused } = options;
	replay.setPlayerData({
		participants,
		duration,
		length,
		biome,
		focused,
	});
}

export function convertPlayerData({ payload }: { payload: PayloadInterface }) {
	const errorsToDispatch: string[] = [];

	const { options, obstacles = [], participants: players = [] } = payload;

	function convertOptions({ _options }: { _options: PayloadSettings }) {
		const { duration, participants, biome, layout, length, focused } =
			_options;

		const { error: durationError, value: convertedDuration } = toNumber({
			value: duration,
			type: 'duration',
		});
		const { error: participantsError, value: convertedParticipants } =
			toNumber({ value: participants, type: 'participants' });
		const { error: biomeError, value: convertedBiome } = toString({
			value: biome,
			type: 'biome',
		});
		const { error: layoutError, value: convertedLayout } = toString({
			value: layout,
			type: 'layout',
		});
		const { error: lengthError, value: convertedLength } = toNumber({
			value: length,
			type: 'length',
		});
		const { error: focusedError, value: convertedFocused } = toNumber({
			value: focused,
			type: 'focused',
		});
		const errorCollection = [
			durationError,
			participantsError,
			biomeError,
			layoutError,
			lengthError,
			focusedError,
		];

		collectErrors({
			dispatch: errorsToDispatch,
			collection: errorCollection,
		});

		return {
			duration: convertedDuration,
			participants: convertedParticipants,
			biome: convertedBiome,
			layout: convertedLayout,
			length: convertedLength,
			focused: convertedFocused,
		};
	}

	function reduceObstacles(
		acc: {
			errors: string[];
			items: ConvertedObstacle[] | any[];
		},
		_obstacle: PayloadObstacle,
	) {
		const { id, name } = _obstacle;

		const { errors = [] } = acc;
		const { error: idError, value: convertedId } = toNumber({
			value: id,
			type: 'id',
		});
		const { error: nameError, value: convertedName } = toString({
			value: name,
			type: 'name',
		});
		const errorCollection = [idError, nameError];

		collectErrors({
			dispatch: errors,
			collection: errorCollection,
		});

		return {
			errors: errors,
			items: acc.items.concat({
				id: convertedId,
				name: convertedName,
			}),
		};
	}

	function convertObstacles({
		_obstacles,
	}: {
		_obstacles: PayloadObstacle[];
	}) {
		const convertedObstacles =
			Array.isArray(_obstacles) && _obstacles.length > 0
				? _obstacles.reduce(reduceObstacles, { ...baseAccum })
				: { ...baseAccum };

		const { items = [], errors = [] } = convertedObstacles;

		collectErrors({
			dispatch: errorsToDispatch,
			collection: errors,
		});

		return items;
	}

	function reducePlayers(
		acc: {
			errors: string[];
			items: ConvertedParticipant[] | any[];
		},
		_player: PayloadParticipant,
	) {
		const {
			playerId,
			nickname,
			horseColor,
            jockeyColor,
			pfp,
			health,
			duration,
			place,
			speed,
			path,
		} = _player;

		const { errors = [] } = acc;
		const { error: playerIdError, value: convertedPlayerId } = toNumber({
			value: playerId,
			type: 'playerId',
		});
		const { error: nicknameError, value: convertedNickname } = toString({
			value: nickname,
			type: 'nickname',
		});
		const { error: horseColorError, value: convertedHorseColor } = toString({
			value: horseColor,
			type: 'horseColor',
		});
		const { error: jockeyColorError, value: convertedJockeyColor } = toString({
			value: jockeyColor,
			type: 'jockeyColor',
		});
		const { error: pfpError, value: convertedPfp } = toNumber({
			value: pfp,
			type: 'pfp',
		});
		const { error: healthError, value: convertedHealth } = toNumber({
			value: health,
			type: 'health',
		});
		const { error: durationError, value: convertedDuration } = toNumber({
			value: duration,
			type: 'duration',
		});
		const { error: placeError, value: convertedPlace } = toNumber({
			value: place,
			type: 'place',
		});
		const { error: speedError, value: convertedSpeed } = toNumber({
			value: speed,
			type: 'speed',
		});
		const { errors: pathErrors, value: convertedPath } = convertPath({
			_path: path,
		});

		const errorCollection = [
			playerIdError,
			nicknameError,
			horseColorError,
			jockeyColorError,
			pfpError,
			healthError,
			durationError,
			placeError,
			speedError,
			...pathErrors,
		];

		collectErrors({
			dispatch: errors,
			collection: errorCollection,
		});

		return {
			errors: errors,
			items: acc.items.concat({
				playerId: convertedPlayerId,
				nickname: convertedNickname,
				horseColor: convertedHorseColor,
				jockeyColor: convertedJockeyColor,
				pfp: convertedPfp,
				health: convertedHealth,
				duration: convertedDuration,
				place: convertedPlace,
				speed: convertedSpeed,
				path: convertedPath,
			}),
		};
	}

	function convertPlayers({ _players }: { _players: PayloadParticipant[] }) {
		const convertedPlayers =
			Array.isArray(_players) && _players.length > 0
				? _players.reduce(reducePlayers, { ...baseAccum })
				: { ...baseAccum };

		const { items = [], errors = [] } = convertedPlayers;

		collectErrors({
			dispatch: errorsToDispatch,
			collection: errors,
		});

		return items;
	}

	function reducePath(
		acc: {
			errors: string[];
			items: ConvertedPath[] | any[];
		},
		_path: PayloadPath,
	) {
		const { break: breakPoint, curve, obstacle, pass } = _path;

		const { errors = [] } = acc;
		const { error: breakError, value: convertedBreak } = toNumber({
			value: breakPoint,
			type: 'break',
		});
		const { error: curveError, value: convertedCurve } = toString({
			value: curve,
			type: 'curve',
		});
		const { error: obstacleError = null, value: convertedObstacle = null } =
			obstacle ? toString({ value: obstacle, type: 'obstacle' }) : {};
		const { error: passError = null, value: convertedPass = null } = pass
			? toBoolean({ value: pass, type: 'pass' })
			: {};
		const errorCollection = [
			breakError,
			curveError,
			obstacleError,
			passError,
		];

		collectErrors({
			dispatch: errors,
			collection: errorCollection,
		});

		return {
			errors: errors,
			items: acc.items.concat({
				break: convertedBreak,
				curve: convertedCurve,
				...(!!obstacle && {
					obstacle: convertedObstacle,
				}),
				...(!!pass && {
					pass: convertedPass,
				}),
			}),
		};
	}

	function convertPath({ _path }: { _path: PayloadPath[] }) {
		const convertedPath =
			Array.isArray(_path) && _path.length > 0
				? _path.reduce(reducePath, { ...baseAccum })
				: { ...baseAccum };

		const { items = [], errors = [] } = convertedPath;

		return {
			errors,
			value: items,
		};
	}

	return {
		options: convertOptions({
			_options: options,
		}),
		obstacles: convertObstacles({
			_obstacles: obstacles,
		}),
		participants: convertPlayers({
			_players: players,
		}),
	};
}

export function loadSettings({ settings }: { settings: ConfigContext }) {
	const {
		width,
		height,
		framesPerSecond,
		animate,
		parallaxSpeed,
		cycleSpeed,
		backgroundPalette,
		focusSpeed,
		textColor,
		textFont,
	}: {
		width: number;
		height: number;
		framesPerSecond: number;
		animate: boolean;
		parallaxSpeed: number;
		cycleSpeed: number;
		backgroundPalette: string;
		focusSpeed: number;
		textColor: string;
		textFont: string;
	} = CONFIG;
	settings.setDimensions({
		width,
		height,
	});
	settings.setAnimationParams({
		framesPerSecond,
		parallaxSpeed,
		cycleSpeed,
		backgroundPalette,
		focusSpeed,
		textColor,
		textFont,
	});
	settings.setAnimate({
		animate,
	});
}

export function loadStats({ stats }: { stats: StatContext }) {

	// const {
	// 	participants: players,
	// 	obstacles,
	// } : {
	// 	participants: PayloadParticipant[];
	// 	obstacles: PayloadObstacle[];
	// } = CONFIG;

	const { obstacles, participants: players } = convertPlayerData({
		payload: PAYLOAD,
	});

	stats.setStats({
		players,
		obstacles,
	});
}
