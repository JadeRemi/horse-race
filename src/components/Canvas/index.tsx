import React, { useRef, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ErrorBoundary } from '../Error/errorBoundary'

import { Canvas as CanvasBlock, Wrapper, Text, Container, Button, Bar, Debug, Row, ButtonText } from './styled';
import { loadPlayerData, loadSettings, loadStats } from '../../utils/clientAdapter';
import { useImage } from '../../utils/hooks/useImage';
import { useCanvas } from '../../utils/hooks/useCanvas';
import { useImageLoader } from '../../utils/hooks/useImageLoader';
import { useWindowSize } from '../../utils/hooks/useSize';
import { useStateTree } from '../../store/main';
import { draw } from '../../utils/render/draw';
import { default as DICTIONARY } from '../../utils/image/assetDictionary';
import {
    IImage,
    IDictionary,
} from '../../utils/validations/models';
import { DEFAULTS, DEFAULT_NAMES } from '../../config/defaults';
import CONFIG from '../../config/canvas.json';

export function Canvas() {
    const canvasBlock = useRef<HTMLCanvasElement | null>(null);
    const phantomBlock = useRef<HTMLCanvasElement | null>(null);
    const { width: windowWidth, height: windowHeight } : { width: number, height : number } = useWindowSize();

    const { replay, settings, stats } = useStateTree();
    const [ currentDelta, setCurrentDelta ] = useState(0);
    const { participants, duration, length, biome, focused, lastBreakpoint, timeRecord } : {
        participants: number, duration: number, length: number, biome: string, focused: number,
        lastBreakpoint: number, timeRecord: number,
    } = replay;
    const { width: canvaswidth, height: canvasHeight, animate } : {
        width: number, height: number, animate: boolean
    } = settings;

    const fps = DEFAULTS.framesPerSecond;

    function markStart() {
        replay.setDelta({
            lastBreakpoint: Date.now(),
        });
    }

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
        const dateNow = Date.now();
        if (!animate) {

            replay.setDelta({
                lastBreakpoint: dateNow,
            });

            window.requestAnimationFrame(loopDraw);
        } else {
            if (replay.lastBreakpoint > 0) {
                replay.setDelta({
                    lastBreakpoint: dateNow,
                    timeRecord: dateNow - replay.lastBreakpoint + replay.timeRecord,
                });
            }
        }



        settings.setAnimate({
            animate: !animate,
        });
    }



    function loopDraw() {
        const ctx = canvasBlock.current.getContext('2d');
        const { animate: innerLoopAnimate } = settings;
        const newDelta = Date.now() - replay.lastBreakpoint + replay.timeRecord;
        setCurrentDelta(newDelta);

        draw({
            source: {
                ctx,
                atlas: DICTIONARY,
                loaded: graphicsLoaded,
                phantom: phantomBlock?.current || null,
            },
            canvas: canvasBlock.current,
            settings,
            replay,
            stats,
            timestamp: newDelta,
        });

        if (innerLoopAnimate) window.requestAnimationFrame(loopDraw);
    }

    useEffect(() => {
        loadSettings({ settings });
        loadPlayerData({ replay });
        loadStats({ stats });

        markStart();
        window.requestAnimationFrame(loopDraw);
        
        //return () => clearInterval(interval.current);
    }, []);

    function debugStats() {
        return (
            <Bar>
                <Row>
                    <Text>Players:</Text><Text>{ participants }</Text>
                </Row>
                <Row>
                    <Text>Total time:</Text><Text>{ duration }</Text>
                </Row>
                <Row>
                    <Text>Total length:</Text><Text>{ length }</Text>
                </Row>
                <Row>
                    <Text>Biome:</Text><Text>{ biome }</Text>
                </Row>
                <Row>
                    <Text>Main player:</Text><Text>{ focused }</Text>
                </Row>
                <Row>
                    <Text>Last pause:</Text><Text>{ replay.lastBreakpoint }</Text>
                </Row>
                <Row>
                    <Text>Time record:</Text><Text>{ replay.timeRecord }</Text>
                </Row>
                <Row>
                    <Text>Time now:</Text><Text>{ currentDelta }</Text>
                </Row>
            </Bar>
        )
    }

    return (
        <ErrorBoundary>
            <Wrapper className="canvas-wrapper">
                <Container>
                    <Debug>
                        <Button
                            onClick={toggleAnimate}
                        >
                            <ButtonText>
                                Animate: {animate ? DEFAULT_NAMES.YES : DEFAULT_NAMES.NO}
                            </ButtonText>
                        </Button>
                        {debugStats()}
                    </Debug>
                    <CanvasBlock
                        className="canvas"
                        width={canvaswidth}
                        height={canvasHeight}
                        ref={canvasBlock}
                    />
                </Container>
            </Wrapper>
            <CanvasBlock
                className="canvas phantom"
                width={canvaswidth}
                height={canvasHeight}
                ref={phantomBlock}
            />
        </ErrorBoundary>
        
    )
};

export default observer(Canvas);
