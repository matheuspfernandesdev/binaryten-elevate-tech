import * as React from "react";

export function useReducedMotion(): boolean {
  const [reduceMotion, setReduceMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);

    const onChange = () => setReduceMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);

    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  return reduceMotion;
}
