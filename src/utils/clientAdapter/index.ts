import PAYLOAD from '../../assets/payload/payload.json';
import CONFIG from '../../config/canvas.json';
import { useStateTree } from '../../store/main';

interface PlayerContext {
    increment: Function,
    decrement: Function,
    players: number,
}

interface ConfigContext {
    setDimensions: Function,
    width: number,
    height: number,
}

export function loadPlayerData({
    replay
} : {
    replay: PlayerContext,
}) {
    console.log(PAYLOAD);
    replay.increment();

}

export function loadSettings({
    settings
} : {
    settings: ConfigContext,
}) {
    const { width, height } : { width: number, height: number} = CONFIG;
    settings.setDimensions({
        width, height
    });

}