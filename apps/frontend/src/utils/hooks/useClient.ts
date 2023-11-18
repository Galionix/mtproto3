// exeties provided funtion only when the component is mounted

import { useRef, useEffect } from "react";

export const useClient = (fn: () => void) => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    fn();
    return () => {
      isMounted.current = false;
    };
  }, [fn]);

  return isMounted;
};
