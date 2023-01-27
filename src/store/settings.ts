import { types } from 'mobx-state-tree';

import {
	AnimationInterface,
	DimensionsInterface,
	AnimateInterface,
} from '../utils/validations/models';

export const Settings = types
	.model({
		width: types.number,
		height: types.number,
		framesPerSecond: types.number,
		animate: types.boolean,
		parallaxSpeed: types.number,
		cycleSpeed: types.number,
		backgroundPalette: types.string,
		focusSpeed: types.number,
	})
	.actions(self => ({
		setDimensions({ width, height }: DimensionsInterface) {
			self.width = width;
			self.height = height;
		},
		setAnimationParams({
			framesPerSecond,
			parallaxSpeed,
			cycleSpeed,
			backgroundPalette,
			focusSpeed,
		}: AnimationInterface) {
			self.framesPerSecond = framesPerSecond;
			self.parallaxSpeed = parallaxSpeed;
			self.cycleSpeed = cycleSpeed;
			self.backgroundPalette = backgroundPalette;
			self.focusSpeed = focusSpeed;
		},
		setAnimate({ animate }: AnimateInterface) {
			self.animate = animate;
		},
	}));
