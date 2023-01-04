import PAYLOAD from '../../assets/payload/payload.json';
import { useStateTree } from '../../store/main';

interface PlayerContext {
    increment: Function,
    decrement: Function,
    players: number,
}

export function loadPlayerData({
    replay
} : {
    replay: PlayerContext,
}) {
    console.log(PAYLOAD);
    replay.increment();

}