import { types, cast } from 'mobx-state-tree';
import { ConvertedParticipant, ConvertedObstacle } from '../utils/validations/models';

const Obstacle = types.model({
    id: types.number,
    name: types.string,
});

const Path = types.model({
  break: types.number,
  obstacle: types.optional(types.number, 0),
  pass: types.optional(types.boolean, false),
  curve: types.string,
});

const Player = types.model({
  id: types.number,
  playerId: types.number,
  nickname: types.string,
  horseColor: types.string,
  jockeyColor: types.string,
  pfp: types.number,
  health: types.number,
  duration: types.number,
  place: types.number,
  speed: types.number,
  path: types.array(Path),
});

export const Stats = types
  .model({
    players: types.array(Player),
    obstacles: types.array(Obstacle),
  })
  .actions(self => ({
    setStats({
      players,
      obstacles,
    } : {
      players: ConvertedParticipant[],
      obstacles: ConvertedObstacle[],
    }) {
      self.players = cast(players);
      self.obstacles = cast(obstacles);
    },
  }));