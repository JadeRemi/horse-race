import { types, Instance } from 'mobx-state-tree';

import { createContext, useContext } from 'react';
import { Replay } from './replay';
import { Settings } from './settings';
import { DEFAULTS } from '../config/defaults';

const RootModel = types.model({
    replay: Replay,
    settings: Settings,
});

const initialState = RootModel.create({
    replay: {
        players: DEFAULTS.players,
    },
    settings: {
        width: DEFAULTS.width,
        height: DEFAULTS.height,
        framesPerSecond: DEFAULTS.framesPerSecond,
        animate: DEFAULTS.animate,
    }
});

export const rootStore = initialState;

export type RootInstance = Instance<typeof RootModel>;

const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;

export function useStateTree() {
    const store = useContext(RootStoreContext);
    if (store === null) {
        throw new Error("Store was not found, provide a context");
    }
    return store;
}