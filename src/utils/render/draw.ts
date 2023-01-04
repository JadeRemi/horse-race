import { fillBackground } from './fillBackground';
import { fillAnimation } from './fillAnimation';
import { fillStatic } from './fillStatic';
import CONFIG from '../../config/canvas.json';

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

const palette = {
    background: '#27c7e1',
};

const fps = 10;

const frameDuration = 1000 / fps;

export function draw({
    ctx,
    canvas
} : {
    ctx: CanvasRenderingContext2D | null,
    canvas: HTMLCanvasElement | null
}) {
    const { animate } = CONFIG;
    const image = RESOURCES.img1;
    const tile = RESOURCES.img2;
    const coordinateX = 50;
    const coordinateY = 50;
    const timestamp = Date.now();
    const size = 20;
    const { width: canvasWidth, height: canvasHeight } = canvas;
    ctx.fillStyle = palette.background;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    fillBackground({ ctx, image: tile, timestamp, size, fps, canvasWidth, canvasHeight })
    fillAnimation({ ctx, image, coordinateX, coordinateY, timestamp, fps });
    fillStatic({ ctx, coordinateX, coordinateY });
    if (animate) setTimeout((()=>{
        draw({ ctx, canvas })
    }), frameDuration);
}