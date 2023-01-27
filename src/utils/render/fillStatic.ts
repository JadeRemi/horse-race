// import { default as imageLoader } from '../image';
import { loadImage } from '../image/loadImage';
import { CoordinateInterface, ISource } from '../validations/models'

export function fillStatic({
    source: { ctx, atlas },
    coordinate,
} : {
    source: ISource,
    coordinate: CoordinateInterface,
}){
    const img = loadImage(
        atlas.ACTORS.HORSE
    );
    const { x: coordinateX, y: coordinateY } = coordinate;
    ctx.drawImage(img, coordinateX, coordinateY);
}