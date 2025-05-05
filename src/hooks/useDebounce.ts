
import { useCallback, useEffect, useRef } from "react";

export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  wait: number
): (...args: Parameters<T>) => void {
  // Use a ref to store the timeout between renders
  // and prevent changes to it from causing re-renders
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  
  // Use a ref to store the callback because it can change but we don't
  // want to change the debounced function once it's created.
  const callbackRef = useRef<T>(callback);

  // Update the callback whenever the function changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Use useCallback to avoid recreating the debounced function on each render
  const debouncedFunction = useCallback(
    (...args: Parameters<T>) => {
      // Clear the old timeout
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      // Set a new timeout
      timeout.current = setTimeout(() => {
        callbackRef.current(...args);
      }, wait);
    },
    [wait]
  );

  // Clear the timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  return debouncedFunction;
}
