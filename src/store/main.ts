import { types, Instance } from 'mobx-state-tree';

import { createContext, useContext } from 'react';
import { Replay } from './replay';
import { Settings } from './settings';
import { DEFAULTS } from '../config/defaults';
import { Stats } from './stats';

const RootModel = types.model({
	replay: Replay,
	settings: Settings,
	stats: Stats,
});

const initialState = RootModel.create({
	stats: {
		players: DEFAULTS.players,
		obstacles: DEFAULTS.obstacles,
	},
	replay: {
		participants: DEFAULTS.participants,
		duration: DEFAULTS.duration,
		length: DEFAULTS.length,
		biome: DEFAULTS.biome,
		focused: DEFAULTS.focused,
	},
	settings: {
		width: DEFAULTS.width,
		height: DEFAULTS.height,
		framesPerSecond: DEFAULTS.framesPerSecond,
		animate: DEFAULTS.animate,
		parallaxSpeed: DEFAULTS.parallaxSpeed,
		cycleSpeed: DEFAULTS.cycleSpeed,
		backgroundPalette: DEFAULTS.backgroundPalette,
		focusSpeed: DEFAULTS.focusSpeed,
		textColor: DEFAULTS.textColor,
		textFont: DEFAULTS.textFont,
	},
});

export const rootStore = initialState;

export type RootInstance = Instance<typeof RootModel>;

const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;

export function useStateTree() {
	const store = useContext(RootStoreContext);
	if (store === null) {
		throw new Error('Store was not found, provide a context');
	}
	return store;
}
