import { types, Instance } from 'mobx-state-tree';

import { createContext, useContext } from 'react';
import { Replay } from "./replay";

const RootModel = types.model({
    replay: Replay
});

let initialState = RootModel.create({
    replay: {
        players: 0,
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

// const store = Store.create(
//     {
//     }
//   );
// export const Context = createContext();
// export default store;