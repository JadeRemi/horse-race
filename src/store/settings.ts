import { types } from 'mobx-state-tree';

export const Settings = types
  .model({
    width: types.number,
    height: types.number,
    framesPerSecond: types.number,
    animate: types.boolean,
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
    },
    setAnimationParams({
      framesPerSecond,
      animate,
    } : {
      framesPerSecond: number,
      animate: boolean,
    }) {
      self.framesPerSecond = framesPerSecond;
      self.animate = animate;
    }
  }));