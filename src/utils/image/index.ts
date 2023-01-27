import HORSE from '../../assets/images/actor/horse_3.png';
import { loadImage } from './loadImage';
import { memo } from 'react';
import { IDictionary } from '../validations/models';

// 
// export function pickImage() {
//     return { DICTIONARY.HORSE };
// }

// const loadImage = (setImageDimensions, imageUrl) => {
//     const img = new Image();
//     img.src = imageUrl;
//   
//     img.onload = () => {
//       setImageDimensions({
//         height: img.height,
//         width: img.width
//       });
//     };
//     img.onerror = (err) => {
//       console.error(err);
//     };
// };

const loadGraphic = (path : string) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'Anonymous';
      img.src = path;
      img.onload = () => {
        resolve(img);
      }
      img.onerror = (error) => {
        reject(error);
      }
    })
  }


// export default {
//     HORSE: loadImage(HORSE),
// };