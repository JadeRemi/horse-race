import React, { useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { ErrorBoundary } from '../Error/errorBoundary'

import { Canvas as CanvasBlock, Wrapper, Text, Container } from './styled';
import { loadPlayerData, loadSettings } from '../../utils/clientAdapter';
import { useImage } from '../../utils/hooks/useImage';
import { useCanvas } from '../../utils/hooks/useCanvas';
import { useWindowSize } from '../../utils/hooks/useSize';
import { useStateTree } from '../../store/main';
import { draw } from '../../utils/render/draw';

export function Canvas() {
    const canvasBlock = useRef<HTMLCanvasElement | null>(null);
    const { width: windowWidth, height: windowHeight } : { width: number, height : number } = useWindowSize();

    const { replay, settings } = useStateTree();
    const { participants, duration, length, biome } : {
        participants: number, duration: number, length: number, biome: string
    } = replay;
    const { width: canvaswidth, height: canvasHeight } : { width: number, height : number } = settings;

    useEffect(() => {
        loadSettings({ settings });
        loadPlayerData({ replay });
        if (canvasBlock.current) {
            const ctx = canvasBlock.current.getContext('2d');
            draw({ ctx, canvas: canvasBlock.current, settings });
        }
    }, []);

    return (
        <ErrorBoundary>
            <Wrapper className="canvas-wrapper">
                <Container>
                    <Text>
                        { participants } { duration } { length } { biome }
                    </Text>
                    <CanvasBlock className="canvas" width={canvaswidth} height={canvasHeight} ref={canvasBlock} />
                </Container>
            </Wrapper>
        </ErrorBoundary>
        
    )
};

export default observer(Canvas);
