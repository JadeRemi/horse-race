import React, { useRef, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ErrorBoundary } from '../Error/errorBoundary'

import { Canvas as CanvasBlock, Wrapper, Text, Container, Button, Bar } from './styled';
import { loadPlayerData, loadSettings } from '../../utils/clientAdapter';
import { useImage } from '../../utils/hooks/useImage';
import { useCanvas } from '../../utils/hooks/useCanvas';
import { useImageLoader } from '../../utils/hooks/useImageLoader';
import { useWindowSize } from '../../utils/hooks/useSize';
import { useStateTree } from '../../store/main';
import { draw } from '../../utils/render/draw';
import { default as DICTIONARY } from '../../utils/image/assetDictionary';
import { IImage, IDictionary } from '../../utils/validations/models';
import { DEFAULTS, DEFAULT_NAMES } from '../../config/defaults';
import CONFIG from '../../config/canvas.json';

export function Canvas() {
    const canvasBlock = useRef<HTMLCanvasElement | null>(null);
    //const [ animate, setAnimate ] = useState<boolean | null>(null);
    const { width: windowWidth, height: windowHeight } : { width: number, height : number } = useWindowSize();

    const interval = useRef(null);

    const { replay, settings } = useStateTree();
    const { participants, duration, length, biome, focused } : {
        participants: number, duration: number, length: number, biome: string, focused: number
    } = replay;
    const { width: canvaswidth, height: canvasHeight, animate } : {
        width: number, height: number, animate: boolean
    } = settings;

    const fps = DEFAULTS.framesPerSecond;
    const frameDuration = 1000 / fps;

    function reduceDictionary(acc : string[], graphic : IImage) : string[] {
        const { path } = graphic;
        return !!path
            ? acc.concat([ path ])
            : acc;
        
    }

    function reduceAtlas(acc: IImage[], atlasTag: keyof IDictionary ) : IImage[] {
        return acc.concat(
            Object.values((DICTIONARY as IDictionary)[atlasTag])
        )
    }

    const atlas = Object.keys(DICTIONARY).reduce(reduceAtlas, []);

    const pathList = atlas.reduce(
        reduceDictionary, []
    )
    const { graphicsLoaded } = useImageLoader(pathList);

    function toggleAnimate() {
        if (animate) {
            clearInterval(interval.current);
        } else {
            handleInterval();
        }
        settings.setAnimate({
            animate: !animate,
        });
        
    }

    function handleInterval() {
        if (canvasBlock.current) {
            const ctx = canvasBlock.current.getContext('2d');

            interval.current = setInterval(() => {
                draw({
                    source: {
                        ctx,
                        atlas: DICTIONARY,
                        loaded: graphicsLoaded,
                    },
                    canvas: canvasBlock.current,
                    settings,
                    replay,
                });
            }, frameDuration);
        }
    };

    useEffect(() => {
        loadSettings({ settings });
        loadPlayerData({ replay });
        
        handleInterval();
        return () => clearInterval(interval.current);
    }, []);

    return (
        <ErrorBoundary>
            <Wrapper className="canvas-wrapper">
                <Container>
                    <Bar>
                        { false &&
                            <Text>
                            { participants } { duration } { length } { biome } { focused }
                        </Text>
                        }
                        <Button
                            onClick={toggleAnimate}
                        >
                            Animate: {animate ? DEFAULT_NAMES.YES : DEFAULT_NAMES.NO}
                        </Button>
                    </Bar>
                    <CanvasBlock
                        className="canvas"
                        width={canvaswidth}
                        height={canvasHeight}
                        ref={canvasBlock}
                    />
                </Container>
            </Wrapper>
        </ErrorBoundary>
        
    )
};

export default observer(Canvas);
