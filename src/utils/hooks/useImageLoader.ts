import { useEffect, useState } from 'react'

function preloadImage (src: string) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = function() {
      resolve(img);
    }
    img.onerror = img.onabort = function() {
      reject(src);
    }
    img.src = src;
  })
}

export function useImageLoader(imageList: string[]) {
  const [graphicsLoaded, setGraphicsLoaded] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;

    async function effect() {

      if (isCancelled) {
        return;
      }

      const imagesPromiseList: Promise<any>[] = []
      for (const i of imageList) {
        imagesPromiseList.push(preloadImage(i))
      }
  
      await Promise.all(imagesPromiseList);

      if (isCancelled) {
        return;
      }

      setGraphicsLoaded(true);
    }

    effect();

    return () => {
      isCancelled = true;
    }
  }, [imageList]);

  return { graphicsLoaded };
}
