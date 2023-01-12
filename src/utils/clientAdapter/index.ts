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
} from  '../validations/models';
import { toString, toNumber, toBoolean } from  '../validations/conversions';
import { collectErrors } from  '../validations/errors';

const baseAccum: {
    errors: string[],
    items: any[],
} = {
    errors: [],
    items: [],
}
interface PlayerContext {
    setPlayerData: Function,
    participants: number,
    duration: number,
    length: number,
    biome: string,
}

interface ConfigContext {
    setDimensions: Function,
    setAnimationParams: Function,
    width: number,
    height: number,
}

export function loadPlayerData({
    replay
} : {
    replay: PlayerContext,
}) {
    const { options } = convertPlayerData({
        payload: PAYLOAD,
    });
    const { participants, duration, length, biome } = options;
    replay.setPlayerData({
        participants, duration, length, biome
    });

}

export function convertPlayerData({
    payload,
} : {
    payload: PayloadInterface,
}) {

    const errorsToDispatch: string[] = [];

    const {
        options,
        obstacles = [],
        participants: players = [],
    } = payload;

    function convertOptions({ _options } : { _options: PayloadSettings }){
        const {
            duration,
            participants,
            biome,
            layout,
            length,
        } = _options;

        const { error: durationError, value: convertedDuration } = toNumber({ value: duration, type: 'duration' });
        const { error: participantsError, value: convertedParticipants } = toNumber({ value: participants, type: 'participants' });
        const { error: biomeError, value: convertedBiome } = toString({ value: biome, type: 'biome' });
        const { error: layoutError, value: convertedLayout } = toString({ value: layout, type: 'layout' });
        const { error: lengthError, value: convertedLength } = toNumber({ value: length, type: 'length' });
        const errorCollection = [
            durationError,
            participantsError,
            biomeError,
            layoutError,
            lengthError,
        ];

        collectErrors({
            dispatch: errorsToDispatch,
            collection: errorCollection,
        })

        return {
            duration: convertedDuration,
            participants: convertedParticipants,
            biome: convertedBiome,
            layout: convertedLayout,
            length: convertedLength,
        }
    }

    function reduceObstacles(acc: {
        errors: string[],
        items: ConvertedObstacle[] | any[],
    }, _obstacle: PayloadObstacle) {
        const {
            id,
            name,
        } = _obstacle;

        const { errors = [] } = acc;
        const { error: idError, value: convertedId } = toNumber({ value: id, type: 'id' });
        const { error: nameError, value: convertedName } = toString({ value: name, type: 'name' });
        const errorCollection = [
            idError,
            nameError,
        ];

        collectErrors({
            dispatch: errors,
            collection: errorCollection,
        })

        return {
            errors: errors,
            items: acc.items.concat({
                id: convertedId,
                name: convertedName,
            })
        }
    }

    function convertObstacles({ _obstacles } : { _obstacles: PayloadObstacle[] }){
        const convertedObstacles = (Array.isArray(_obstacles) && _obstacles.length > 0)
            ? _obstacles.reduce(reduceObstacles, { ...baseAccum })
            : { ...baseAccum };

        const { items = [], errors = [] } = convertedObstacles;

        collectErrors({
            dispatch: errorsToDispatch,
            collection: errors,
        })

        return items;
    }

    function reducePlayers(acc: {
        errors: string[],
        items: ConvertedParticipant[] | any[],
    }, _player: PayloadParticipant) {
        const {
            playerId,
            nickname,
            color,
            health,
            duration,
            place,
            path,
        } = _player;

        const { errors = [] } = acc;
        const { error: playerIdError, value: convertedPlayerId } = toNumber({ value: playerId, type: 'playerId' });
        const { error: nicknameError, value: convertedNickname } = toString({ value: nickname, type: 'nickname' });
        const { error: colorError, value: convertedColor } = toString({ value: color, type: 'color' });
        const { error: healthError, value: convertedHealth } = toNumber({ value: health, type: 'health' });
        const { error: durationError, value: convertedDuration } = toNumber({ value: duration, type: 'duration' });
        const { error: placeError, value: convertedPlace } = toNumber({ value: place, type: 'place' });
        const { errors: pathErrors, value: convertedPath } = convertPath({ _path: path });

        const errorCollection = [
            playerIdError,
            nicknameError,
            colorError,
            healthError,
            durationError,
            placeError,
            ...pathErrors,
        ];

        collectErrors({
            dispatch: errors,
            collection: errorCollection,
        })

        return {
            errors: errors,
            items: acc.items.concat({
                playerId: convertedPlayerId,
                nickname: convertedNickname,
                color: convertedColor,
                health: convertedHealth,
                duration: convertedDuration,
                place: convertedPlace,
                path: convertedPath,
            })
        }
    }

    function convertPlayers({ _players } : { _players: PayloadParticipant[] }){
        const convertedPlayers = (Array.isArray(_players) && _players.length > 0)
        ? _players.reduce(reducePlayers, { ...baseAccum })
        : { ...baseAccum };

        const { items = [], errors = [] } = convertedPlayers;

        collectErrors({
            dispatch: errorsToDispatch,
            collection: errors,
        })

        return items;
    }


    function reducePath(acc: {
        errors: string[],
        items: ConvertedPath[] | any[],
    }, _path: PayloadPath) {
        const {
            break: breakPoint,
            curve,
            obstacle,
            pass, 
        } = _path;

        const { errors = [] } = acc;
        const { error: breakError, value: convertedBreak } = toNumber({ value: breakPoint, type: 'break' });
        const { error: curveError, value: convertedCurve } = toString({ value: curve, type: 'curve' });
        const { error: obstacleError = null, value: convertedObstacle = null } = obstacle
            ? toString({ value: obstacle, type: 'obstacle' })
            : {};
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
        })

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
            })
        }
    }


    function convertPath({ _path } : { _path: PayloadPath[] }){
        const convertedPath = (Array.isArray(_path) && _path.length > 0)
        ? _path.reduce(reducePath, { ...baseAccum })
        : { ...baseAccum };

        const { items = [], errors = [] } = convertedPath;

        return {
            errors,
            value: items,
        }

    }

    return {
        options: convertOptions({
            _options: options,
        }),
        obstacles: convertObstacles({
            _obstacles: obstacles,
        }),
        participants: convertPlayers({
            _players: players
        }),
    };
}

export function loadSettings({
    settings
} : {
    settings: ConfigContext,
}) {
    const {
        width,
        height,
        framesPerSecond,
        animate,
        parallaxSpeed,
        backgroundPalette,
        focusSpeed,
    } : {
        width: number,
        height: number,
        framesPerSecond: number,
        animate: boolean,
        parallaxSpeed: number,
        backgroundPalette: string,
        focusSpeed: number,
    } = CONFIG;
    settings.setDimensions({
        width, height
    });
    settings.setAnimationParams({
        framesPerSecond, animate, parallaxSpeed, backgroundPalette, focusSpeed
    });

}