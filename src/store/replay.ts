import { types } from 'mobx-state-tree';

export const Replay = types
  .model({
    participants: types.number,
    duration: types.number,
    length: types.number,
    biome: types.string,
    focused: types.number,
  })
  .actions(self => ({
    setPlayerData({
      participants,
      duration,
      length,
      biome,
      focused,
    } : {
      participants: number,
      duration: number,
      length: number,
      biome: string,
      focused: number,
    }) {
      self.participants = participants;
      self.duration = duration;
      self.length = length;
      self.biome = biome;
      self.focused = focused;
    },
  }));