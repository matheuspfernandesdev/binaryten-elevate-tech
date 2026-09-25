import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
  autoPlay?: boolean;
  autoPlayDelay?: number;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const Carousel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & CarouselProps>(
  ({ orientation = "horizontal", opts, setApi, plugins, autoPlay = true, autoPlayDelay = 2000, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins,
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    // Autoplay logic
    const autoPlayTimerRef = React.useRef<number | null>(null);
    const isHoveringRef = React.useRef(false);

    const clearAutoPlayTimer = React.useCallback(() => {
      if (autoPlayTimerRef.current) {
        window.clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
    }, []);

    const startAutoPlayTimer = React.useCallback(() => {
      if (!autoPlay || !api) return;
      clearAutoPlayTimer();
      autoPlayTimerRef.current = window.setInterval(() => {
        if (!isHoveringRef.current && api) {
          api.scrollNext();
        }
      }, autoPlayDelay);
    }, [autoPlay, autoPlayDelay, api, clearAutoPlayTimer]);

    React.useEffect(() => {
      startAutoPlayTimer();
      return clearAutoPlayTimer;
    }, [startAutoPlayTimer, clearAutoPlayTimer]);

    // Pause on hover
    React.useEffect(() => {
      if (!autoPlay || !api) return;
      const container = carouselRef.current;
      if (!container) return;

      const onMouseEnter = () => { isHoveringRef.current = true; };
      const onMouseLeave = () => { isHoveringRef.current = false; };

      container.addEventListener("mouseenter", onMouseEnter);
      container.addEventListener("mouseleave", onMouseLeave);

      return () => {
        container.removeEventListener("mouseenter", onMouseEnter);
        container.removeEventListener("mouseleave", onMouseLeave);
      };
    }, [autoPlay, api]);

    // Pause on interaction (drag/focus)
    React.useEffect(() => {
      if (!autoPlay || !api) return;

      const onPointerDown = () => { isHoveringRef.current = true; };
      const onPointerUp = () => { isHoveringRef.current = false; };

      const container = carouselRef.current;
      if (!container) return;

      container.addEventListener("pointerdown", onPointerDown);
      container.addEventListener("pointerup", onPointerUp);
      container.addEventListener("pointerleave", onPointerUp);

      return () => {
        container.removeEventListener("pointerdown", onPointerDown);
        container.removeEventListener("pointerup", onPointerUp);
        container.removeEventListener("pointerleave", onPointerUp);
      };
    }, [autoPlay, api]);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();

    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div
          ref={ref}
          className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)}
          {...props}
        />
      </div>
    );
  },
);
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className)}
        {...props}
      />
    );
  },
);
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-10 w-10 rounded-full border border-border/50 bg-background/60 hover:bg-background/80 md:h-8 md:w-8",
          orientation === "horizontal"
            ? "left-2 top-1/2 -translate-y-1/2 md:left-4"
            : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <ArrowLeft className="h-5 w-5 md:h-4 md:w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
    );
  },
);
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-10 w-10 rounded-full border border-border/50 bg-background/60 hover:bg-background/80 md:h-8 md:w-8",
          orientation === "horizontal"
            ? "right-2 top-1/2 -translate-y-1/2 md:right-4"
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <ArrowRight className="h-5 w-5 md:h-4 md:w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    );
  },
);
CarouselNext.displayName = "CarouselNext";

function CarouselPagination() {
  const { api } = useCarousel();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const update = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
    };

    update();
    api.on("reInit", update);
    api.on("select", update);

    return () => {
      api.off("reInit", update);
      api.off("select", update);
    };
  }, [api]);

  if (count <= 1) return null;

  return (
    <div
      role="tablist"
      aria-label="Carousel pagination"
      className="flex items-center justify-center gap-1.5 py-3"
    >
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to slide ${i + 1}`}
          aria-selected={i === current}
          tabIndex={i === current ? 0 : -1}
          onClick={() => api?.scrollTo(i)}
          className={cn(
            "h-1.5 w-1.5 shrink-0 cursor-pointer rounded-full border border-primary/30 bg-primary/30 transition-all duration-300",
            i === current ? "w-4 border-primary bg-primary" : "hover:w-3 hover:bg-primary/50",
          )}
        />
      ))}
    </div>
  );
}

export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselPagination };
