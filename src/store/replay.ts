import { types } from 'mobx-state-tree';

export const Replay = types
  .model({
    participants: types.number,
    duration: types.number,
    length: types.number,
    biome: types.string,
  })
  .actions(self => ({
    setPlayerData({
      participants,
      duration,
      length,
      biome,
    } : {
      participants: number,
      duration: number,
      length: number,
      biome: string,
    }) {
      self.participants = participants;
      self.duration = duration;
      self.length = length;
      self.biome = biome;
    },
  }));