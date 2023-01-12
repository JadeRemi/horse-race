import { types } from 'mobx-state-tree';

import { AnimationInterface, DimensionsInterface } from '../utils/validations/models'

export const Settings = types
  .model({
    width: types.number,
    height: types.number,
    framesPerSecond: types.number,
    animate: types.boolean,
    parallaxSpeed: types.number,
    backgroundPalette: types.string,
    focusSpeed: types.number,
  })
  .actions(self => ({
    setDimensions({
      width,
      height,
    } : DimensionsInterface ) {
      self.width = width;
      self.height = height;
    },
    setAnimationParams({
      framesPerSecond,
      animate,
      parallaxSpeed,
      backgroundPalette,
      focusSpeed,
    } : AnimationInterface ) {
      self.framesPerSecond = framesPerSecond;
      self.animate = animate;
      self.parallaxSpeed = parallaxSpeed;
      self.backgroundPalette = backgroundPalette;
    }
  }));