import { types } from "mobx-state-tree";

export const Replay = types
  .model({
    players: types.number
  })
  .actions(self => ({
    increment() {
      self.players++;
    },
    decrement() {
      self.players--;
    }
  }));