import React, { useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Canvas as CanvasBlock, Wrapper, Text, Container } from './styled';
import { default as imageLoader } from '../../utils/image';
import { loadPlayerData } from '../../utils/clientAdapter';
import { useImage } from '../../utils/hooks/useImage';
import { useCanvas } from '../../utils/hooks/useCanvas';
// import { Context } from '../../store/main';
import { useStateTree } from '../../store/main';

const RESOURCES = {
    img1: {
        src: "https://user-images.githubusercontent.com/85193527/205502147-169e1604-29a5-49eb-a797-1f7b84cfae33.svg",
        speed: 3,
        frames: 14,
    },
    img2: {
        src: "https://user-images.githubusercontent.com/85193527/205508448-20cba659-7c06-4ed1-95a3-0775162ed7ee.png",
    },
}

const ANIMATE = false;

const focusSpeed = 8;

const fps = 10;
const frameDuration = 1000 / fps;

const palette = {
    background: '#27c7e1',
};

export function Canvas() {
    const canvasBlock = useRef(null);

    const { replay } = useStateTree();
    const players = replay?.players;

    useEffect(() => {
        loadPlayerData();
        const canvas = canvasBlock.current.getContext('2d');
        draw(canvas);
    }, []);
      
      
    function fillStaticImage(ctx, [...coords]){
        //const img = new Image();
        //img.src = useImage(HORSE)
        //RESOURCES.img1.src;
        const img = imageLoader.HORSE;
        ctx.drawImage(img, ...coords);
    }
        
    function fillDynamicImage(ctx, image, coordinate, timestamp){
        const preciseTick = timestamp / (1000 / (fps * image.speed));
        const frame = Math.ceil( preciseTick % image.frames);
        const {frames} = image;
        const frameBound = frame < 0
            ? 0
            : frame > frames - 1
                ? frames - 1
                : frame;
        const img = new Image();
        img.src = image.src;
        const length = img.width / frames;
        const height = img.height;
        ctx.drawImage(img, length * frameBound, 0, length, height, ...coordinate, length, height);
    }
        
      function fillBackground(ctx, image, timestamp, size) {
        const preciseTick = timestamp / (1000 / (fps * focusSpeed));
        const img = new Image();
        img.src = image.src;
        const length = size;
        const height = size;
        const xAxisPoints = canvasBlock.current.width / length;
        const yAxisPoints = canvasBlock.current.height / height;
        const loopActive = 1;
        const pixelsPerCycle = size * focusSpeed;
        if (!!loopActive) {
            ctx.save();
            const offset = Math.ceil(preciseTick % pixelsPerCycle);

            for (let i = 0; i < canvasBlock.current.width + pixelsPerCycle; i += length) {
                for (let y = 0; y < canvasBlock.current.height; y += height) {
                    ctx.save();
                    ctx.drawImage(img, i - offset, y, length, height);
                    ctx.restore();
                }
            }
          ctx.restore();
        }
    }
      
        
    function draw(ctx) {
        const img = RESOURCES.img1;
        const tile = RESOURCES.img2;
        const coordinate = [50, 50];
        const timestamp = Date.now();
        const size = 20;
        ctx.fillStyle = palette.background;
        ctx.fillRect(0, 0, canvasBlock.current.width, canvasBlock.current.height);
        fillBackground(ctx, tile, timestamp, size)
        fillDynamicImage(ctx, img, coordinate, timestamp);
        fillStaticImage(ctx, coordinate);
        if (ANIMATE) setTimeout((()=>draw(ctx)), frameDuration);
    }

    return (
        <Wrapper className="canvas-wrapper">
            <Container>
                <Text>
                    { players }
                </Text>
                <CanvasBlock className="canvas" width="640" height="480" ref={canvasBlock} />
            </Container>
        </Wrapper>
    )
};

export default observer(Canvas);
