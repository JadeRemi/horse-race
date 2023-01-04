import React from 'react';
import Canvas from './components/Canvas';
import { GlobalStyle } from './styles/global';
import { Provider, rootStore } from './store/main';

export function App() {
    return (
        <Provider value={rootStore}>
            <GlobalStyle />
            <Canvas />
        </Provider>
    )
}
