import { useRef } from 'react';

export const useCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    return [canvasRef];
};