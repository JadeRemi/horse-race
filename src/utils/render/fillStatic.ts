import { CoordinateInterface, ISource, IFrameRequest, IDrawImageParamsMax, IFitTo } from '../validations/models'
import { fitImageToScale } from '../image/loadImage';

export function fillStatic({
    source: { ctx, atlas },
    coordinate: { x, y },
    image,
    request,
    fitTo,
} : {
    source: ISource,
    image: HTMLImageElement;
    coordinate: CoordinateInterface;
    request: IFrameRequest | undefined;
    fitTo?: IFitTo;
}){

    function params() : IDrawImageParamsMax {

        const { width: fitToWidth, height: fitToHeight } = fitTo || {
            width: null,
            height: null,
        }
        if (!request) {
            const { fitWidth, fitHeight } = fitImageToScale({
                sourceWidth: image.height,
                sourceHeight: image.height,
                destinationWidth: fitToWidth,
                destinationHeight: fitToHeight,
            })

            return [ 0, 0, image.width, image.height, x, y, fitWidth, fitHeight ];
        }
        const { x: sourceX, y: sourceY, width, height } = request;

        const { fitWidth, fitHeight } = fitImageToScale({
            sourceWidth: width,
            sourceHeight: height,
            destinationWidth: fitToWidth,
            destinationHeight: fitToHeight,
        })

        return [ sourceX, sourceY, width, height, x, y, fitWidth, fitHeight ]
    };
    //(HTMLImageElement|number)[]
    //const { x: coordinateX, y: coordinateY } = coordinate; // ...(params as [])

    //const args : Array<number | HTMLImageElement>  = [image, ...params()]; // ...(params() as unknown as [])
    ctx.drawImage(image, ...params());
}