import * as React from "react";

interface UseCountUpProps {
  target: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
}

export function useCountUp({
  target,
  duration = 2000,
  decimals = 0,
  suffix = "",
}: UseCountUpProps): string {
  const [value, setValue] = React.useState("0");
  const hasStarted = React.useRef(false);

  React.useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setValue(target.toFixed(decimals) + suffix);
      return;
    }

    const element = document.getElementById("hero");
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasStarted.current) {
          return;
        }

        hasStarted.current = true;

        const startTime = performance.now();
        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          const currentValue = target * easedProgress;

          setValue(currentValue.toFixed(decimals) + suffix);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setValue(target.toFixed(decimals) + suffix);
          }
        };

        requestAnimationFrame(animate);
      },
      { threshold: 0.5 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [target, duration, decimals, suffix]);

  return value;
}
