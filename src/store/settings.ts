import { types } from 'mobx-state-tree';

export const Settings = types
  .model({
    width: types.number,
    height: types.number,
  })
  .actions(self => ({
    setDimensions({
      width,
      height,
    } : {
      width: number,
      height: number,
    }) {
      self.width = width;
      self.height = height;
    }
  }));