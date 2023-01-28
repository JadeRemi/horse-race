// import { default as imageLoader } from '../image';
import { loadImage } from '../image/loadImage';
import { CoordinateInterface, ISource, IFrameRequest, IDrawImageParamsMax, IDrawArgs } from '../validations/models'

export function fillStatic({
    source: { ctx, atlas },
    coordinate: { x, y },
    image,
    request,
} : {
    source: ISource,
    image: HTMLImageElement;
    coordinate: CoordinateInterface;
    request: IFrameRequest | undefined;
}){

    function params() : IDrawImageParamsMax {
        if (!request) return [ 0, 0, image.width, image.height, x, y, image.width, image.height ];
        const { x: sourceX, y: sourceY, width, height } = request;
        return [ sourceX, sourceY, width, height, x, y, width, height ]
    };
    //(HTMLImageElement|number)[]
    //const { x: coordinateX, y: coordinateY } = coordinate; // ...(params as [])

    //const args : Array<number | HTMLImageElement>  = [image, ...params()]; // ...(params() as unknown as [])
    ctx.drawImage(image, ...params());
}