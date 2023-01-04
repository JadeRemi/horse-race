import { useEffect, useState, useLayoutEffect, useCallback, useRef } from 'react';

export function useMediaQuery({
    enabled = true,
    query,
} : {
    enabled: boolean,
    query: string,
}) {
  function mediaQuery() : MediaQueryList {
    return window.matchMedia(query);
  }

  function getInitialState() {
    return mediaQuery().matches;
  }
  const [state, setState] = useState(getInitialState);

  useEffect(
    function effect() {
      const mediaQueryList = mediaQuery();

      function changeState(event: MediaQueryListEvent) {
        setState(event.matches);
      }

      function cleanUp() {
        try {
          mediaQueryList.removeEventListener('change', changeState);
        } catch (error) {
          mediaQueryList.removeListener(changeState);
        }
      }

      if (!enabled) return cleanUp();

      try {
        mediaQueryList.addEventListener('change', changeState);
      } catch (error) {
        mediaQueryList.addListener(changeState);
      }

      return cleanUp;
    },
    [enabled]
  );

  return state;
}

export function useWindowSize() {
  const [state, setState] = useState({
    width: 0,
    height: 0
});

  function onResize() {
    setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  useLayoutEffect(
    function effect() {
      onResize();
      window.addEventListener('resize', onResize);

      return function cleanUp() {
        window.removeEventListener('resize', onResize);
      };
    },
    []
  );

  return state;
}

export function useElementSize() {
  const [state, setState] = useState({});
  const ref = useRef(null);

  const updateState = useCallback(
    function callback() {
      if (!ref.current) return;

      const { width, height } = ref.current.getBoundingClientRect();
      const result = { width: Math.round(width), height: Math.round(height) };
      setState(result);
    },
    [ref.current]
  );

  useEffect(
    function effect() {
      updateState();

      window.addEventListener('resize', updateState);

      return function cleanUp() {
        window.removeEventListener('resize', updateState);
      };
    },
    [updateState]
  );

  return [state, ref];
}