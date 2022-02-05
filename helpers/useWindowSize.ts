import { useLayoutEffect, useState } from "react";

// See: https://usehooks-ts.com/react-hook/use-event-listener
import useEventListener from "./useEventListener";

interface WindowSize {
  width: number;
  height: number;
}

function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  const handleSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEventListener("resize", handleSize);

  useLayoutEffect(() => {
    handleSize();
  }, []);

  return windowSize;
}

export default useWindowSize;
