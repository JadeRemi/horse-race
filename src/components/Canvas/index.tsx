import React, { useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Canvas as CanvasBlock, Wrapper, Text, Container } from './styled';
import { loadPlayerData } from '../../utils/clientAdapter';
import { useImage } from '../../utils/hooks/useImage';
import { useCanvas } from '../../utils/hooks/useCanvas';
import { useWindowSize } from '../../utils/hooks/useSize';
// import { Context } from '../../store/main';
import { useStateTree } from '../../store/main';
import { draw } from '../../utils/render/draw';
import CONFIG from '../../config/canvas.json';

export function Canvas() {
    const canvasBlock = useRef<HTMLCanvasElement | null>(null);
    const { width: windowWidth, height: windowHeight } : { width: number, height : number } = useWindowSize();
    const { width: canvaswidth, height: canvasHeight } : { width: number, height : number } = CONFIG;

    const { replay } = useStateTree();
    const players = replay?.players;

    useEffect(() => {
        loadPlayerData({ replay });
        if (canvasBlock.current) {
            const ctx = canvasBlock.current.getContext('2d');
            draw({ ctx, canvas: canvasBlock.current });
        }
    }, []);

    return (
        <Wrapper className="canvas-wrapper">
            <Container>
                <Text>
                    { players }
                </Text>
                <CanvasBlock className="canvas" width={canvaswidth} height={canvasHeight} ref={canvasBlock} />
            </Container>
        </Wrapper>
    )
};

export default observer(Canvas);
