import {
    CoordinateInterface,
    ISource,
    IFrameRequest,
    IDrawImageParamsMax,
    IFitTo,
    IPhantomParams,
} from '../validations/models'
import { fitImageToScale } from '../image/loadImage';
import { DEFAULTS } from '../../config/defaults';

export function fillStatic({
    source: { ctx, atlas, phantom },
    coordinate: { x, y },
    image,
    request,
    fitTo,
    viaPhantom = false,
    phantomParams,
    //fillColor,
} : {
    source: ISource,
    image: HTMLImageElement;
    coordinate: CoordinateInterface;
    request: IFrameRequest | undefined;
    fitTo?: IFitTo;
    viaPhantom?: boolean;
    phantomParams?: IPhantomParams;
	//fillColor?: string;
}){
    const phantomCtx = phantom.getContext('2d');
    const {
        canvasWidth: phantomWidth = 0,
        canvasHeight: phantomHeight = 0,
        phantomColor = DEFAULTS.horseColor,
    } = phantomParams || {};

    // function createOffset() : void {
    //     const phantomX = 0;
    //     const phantomY = 0;

    //     const offsetArray = [-1,-1, 0,-1, 1,-1, -1,0, 1,0, -1,1, 0,1, 1,1];
    //     const thickness = 2;
    //  
    //     for (let iterator = 0; iterator < offsetArray.length; iterator += 2) {
    //         ctx.drawImage(image,
    //             phantomX + offsetArray[iterator] * thickness,
    //             phantomY + offsetArray[iterator+1] * thickness,
    //         );
    //     }

    //     phantomCtx.globalCompositeOperation = "source-in";
    //     phantomCtx.fillStyle = "black";
    //     phantomCtx.fillRect( 0, 0, phantomWidth, phantomHeight );
    //     
    //     
    //     phantomCtx.globalCompositeOperation = "source-over";
    //     phantomCtx.drawImage(image, phantomX, phantomY);
    // }

    function params() : IDrawImageParamsMax {

        const { width: fitToWidth, height: fitToHeight } = fitTo || {
            width: null,
            height: null,
        }
        if (!request) {
            const { fitWidth, fitHeight } = fitImageToScale({
                sourceWidth: image.width,
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
    if (!viaPhantom || !phantom || !phantomParams) ctx.drawImage(image, ...params());
    else {
        phantomCtx.clearRect(0, 0, phantomWidth, phantomHeight)

        const [ sourceX, sourceY, width, height, x, y, fitWidth, fitHeight ] : [
            number, number, number, number, number, number, number, number, 
        ] = params();

        phantomCtx.drawImage(image,
            sourceX, sourceY, width, height, 0, 0, fitWidth, fitHeight
        );

        phantomCtx.globalCompositeOperation = 'source-atop';
        phantomCtx.fillStyle = phantomColor;
        phantomCtx.fillRect(0,0,phantomWidth, phantomHeight);
        phantomCtx.globalCompositeOperation = 'darken';

        ctx.drawImage(phantom,
            0, 0, fitWidth, fitHeight, x, y, fitWidth, fitHeight
        );

    }

    
}