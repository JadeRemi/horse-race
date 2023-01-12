import { fillBackground } from './fillBackground';
import { fillParallax } from './fillParallax';
import { fillAnimation } from './fillAnimation';
import { fillStatic } from './fillStatic';
import CONFIG from '../../config/canvas.json';
import { SettingsInterface } from '../validations/models'

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

const fps = 10;

const frameDuration = 1000 / fps;

export function draw({
    ctx,
    canvas,
    settings,
} : {
    ctx: CanvasRenderingContext2D | null,
    canvas: HTMLCanvasElement | null,
    settings: SettingsInterface | null,
}) {
    const { animate } = CONFIG;
    const image = RESOURCES.img1;
    const tile = RESOURCES.img2;
    const coordinateX = 50;
    const coordinateY = 50;
    const timestamp = Date.now();
    const size = 20;
    const { width: canvasWidth, height: canvasHeight } = canvas;
    const { backgroundPalette, focusSpeed } : { backgroundPalette: string, focusSpeed: number } = settings;

    fillBackground({ ctx, canvasWidth, canvasHeight, backgroundPalette});
    fillParallax({ ctx, image: tile, timestamp, size, fps, canvasWidth, canvasHeight, focusSpeed })
    fillAnimation({ ctx, image, coordinateX, coordinateY, timestamp, fps });
    fillStatic({ ctx, coordinateX, coordinateY });
    if (animate) setTimeout((()=>{
        draw({ ctx, canvas, settings })
    }), frameDuration);
}