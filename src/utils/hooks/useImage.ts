import React, { useRef, useState, useLayoutEffect } from 'react';

export function useImage({
    url, crossOrigin = 'anonymous', referrerpolicy = 'origin'
}: {url: string; crossOrigin?: string, referrerpolicy?: string }) {
  const statusRef = useRef('loading');
  const imageRef = useRef<HTMLImageElement | undefined>();
  const [_, setStateToken] = useState(0);

  const oldUrl = useRef<string | undefined>();
  const oldCrossOrigin = useRef<string | undefined>();
  const oldReferrerPolicy = useRef<string | undefined>();
  if (oldUrl.current !== url || oldCrossOrigin.current !== crossOrigin || oldReferrerPolicy.current !== referrerpolicy) {
    statusRef.current = 'loading';
    imageRef.current = undefined;
    oldUrl.current = url;
    oldCrossOrigin.current = crossOrigin;
    oldReferrerPolicy.current = referrerpolicy;
  }

  useLayoutEffect(
    () => {
      if (!url) return;
      const img = new Image();

      function onLoad() {
        statusRef.current = 'loaded';
        imageRef.current = img;
        setStateToken(Math.random());
      }

      function onError() {
        statusRef.current = 'failed';
        imageRef.current = undefined;
        setStateToken(Math.random());
      }

      img.addEventListener('load', onLoad);
      img.addEventListener('error', onError);
      crossOrigin && (img.crossOrigin = crossOrigin);
      referrerpolicy && (img.referrerPolicy = referrerpolicy);
      img.src = url;

      return function cleanup() {
        img.removeEventListener('load', onLoad);
        img.removeEventListener('error', onError);
      };
    },
    [url, crossOrigin, referrerpolicy]
  );

  return [imageRef.current, statusRef.current];
};