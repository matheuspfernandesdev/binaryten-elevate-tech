import * as React from "react";
import { AnimatePresence, motion, type Transition } from "framer-motion";

type Phase = "write" | "hold" | "morph" | "tagline" | "exit";

type IntroChar = {
  id: string;
  glyph: string;
  writeIndex: number;
  exitDelay?: number;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// The whole intro (including the Binary Ten -> Bi.Ten morph) runs ~30% faster.
// Durations/delays are multiplied by TIME_SCALE and spring physics are scaled
// by the same factor so the motion keeps its original character.
const TIME_SCALE = 0.77;
const ms = (value: number) => value * TIME_SCALE;
const spring = (stiffness: number, damping: number) =>
  ({
    type: "spring",
    stiffness: stiffness / (TIME_SCALE * TIME_SCALE),
    damping: damping / TIME_SCALE,
  }) as const;

const CHAR_STAGGER = ms(0.12);
const EXIT_STAGGER = ms(0.12);
const CHAR_ENTER_DURATION = ms(1.44);
const EXIT_DURATION = ms(0.84);
const DOT_SPRING_DELAY = ms(0.72);
const LAYOUT_SPRING = spring(48, 12.5);

const SOURCE_CHARS: IntroChar[] = ["B", "i", "n", "a", "r", "y", "\u00A0", "T", "e", "n"].map(
  (glyph, index) => ({
    id: `char-${index}`,
    glyph,
    writeIndex: index,
    // Exiting middle ("nary ") peels seam-first: space, y, r, a, n
    exitDelay: index >= 2 && index <= 6 ? (6 - index) * EXIT_STAGGER : undefined,
  }),
);

const TARGET_CHARS: IntroChar[] = [
  SOURCE_CHARS[0],
  SOURCE_CHARS[1],
  { id: "dot", glyph: ".", writeIndex: -1 },
  SOURCE_CHARS[7],
  SOURCE_CHARS[8],
  SOURCE_CHARS[9],
];

function writeTransition(writeIndex: number): Transition {
  const delay = Math.max(writeIndex, 0) * CHAR_STAGGER;
  const enter = { delay, duration: CHAR_ENTER_DURATION, ease: EASE };
  return {
    opacity: enter,
    y: enter,
    scale: enter,
    filter: enter,
    layout: LAYOUT_SPRING,
  };
}

const DOT_TRANSITION: Transition = {
  ...spring(73, 8.75),
  delay: DOT_SPRING_DELAY,
  layout: LAYOUT_SPRING,
};

type BrandIntroProps = {
  onDismiss: () => void;
};

const BrandIntro = ({ onDismiss }: BrandIntroProps) => {
  const reduceMotion = React.useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  const [phase, setPhase] = React.useState<Phase>(reduceMotion ? "tagline" : "write");
  const [chars, setChars] = React.useState<IntroChar[]>(
    reduceMotion ? TARGET_CHARS : SOURCE_CHARS,
  );
  const [taglineVisible, setTaglineVisible] = React.useState(reduceMotion);
  const exitingRef = React.useRef(false);

  const requestExit = React.useCallback(() => {
    if (exitingRef.current) return;
    exitingRef.current = true;
    setPhase("exit");
  }, []);

  React.useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") requestExit();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [requestExit]);

  React.useEffect(() => {
    const guarded = (fn: () => void, delay: number) =>
      window.setTimeout(() => {
        if (!exitingRef.current) fn();
      }, delay);

    if (reduceMotion) {
      const timer = window.setTimeout(() => setPhase("exit"), ms(3840));
      return () => window.clearTimeout(timer);
    }

    const timers = [
      guarded(() => setPhase("hold"), ms(2760)),
      guarded(() => setPhase("morph"), ms(3480)),
      guarded(() => setPhase("tagline"), ms(5280)),
      guarded(() => setPhase("exit"), ms(7920)),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [reduceMotion]);

  React.useEffect(() => {
    if (phase === "morph") setChars(TARGET_CHARS);
    if (phase === "tagline") setTaglineVisible(true);
  }, [phase]);

  React.useEffect(() => {
    if (phase !== "exit") return;
    const timer = window.setTimeout(onDismiss, ms(1200));
    return () => window.clearTimeout(timer);
  }, [phase, onDismiss]);

  const skipRef = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    skipRef.current?.focus();
  }, []);

  const showTagline = taglineVisible && phase !== "write" && phase !== "hold";

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Apresentação da marca Bi.Ten"
      className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-background"
      initial={false}
      animate={{ opacity: phase === "exit" ? 0 : 1 }}
      transition={{ duration: ms(1.2), ease: EASE }}
      onPointerDown={requestExit}
    >
      {/* Animated grid, same as Hero */}
      <div
        className="absolute inset-0 opacity-15"
        aria-hidden="true"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          animation: "glow-pulse 6s ease-in-out infinite",
        }}
      />

      {/* Center glow */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 42%, hsl(var(--primary) / 0.14), transparent 72%)",
        }}
      />

      <div className="relative z-10 flex w-full flex-col items-center px-4">
        <h1 className="text-display text-center" aria-label="Binary Ten agora é Bi.Ten">
          <span className="inline-flex flex-wrap items-baseline justify-center" aria-hidden="true">
            <AnimatePresence mode="popLayout">
              {chars.map((char) => {
                const isDot = char.id === "dot";
                return (
                  <motion.span
                    key={char.id}
                    layout="position"
                    className={
                      isDot
                        ? "inline-block text-accent drop-shadow-[0_0_16px_hsl(var(--accent)_/_0.5)]"
                        : "inline-block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                    }
                    initial={
                      reduceMotion
                        ? false
                        : isDot
                          ? { opacity: 0, scale: 0.3, y: -12, filter: "blur(6px)" }
                          : { opacity: 0, y: -28, filter: "blur(8px)" }
                    }
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{
                      opacity: 0,
                      x: -16,
                      scale: 0.55,
                      filter: "blur(8px)",
                      transition: { duration: EXIT_DURATION, delay: char.exitDelay ?? 0, ease: EASE },
                    }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : isDot
                          ? DOT_TRANSITION
                          : writeTransition(char.writeIndex)
                    }
                  >
                    {char.glyph}
                  </motion.span>
                );
              })}
            </AnimatePresence>
          </span>
        </h1>

        <motion.p
          className="mt-6 max-w-2xl text-center text-body-lg text-muted-foreground md:mt-8"
          initial={false}
          animate={
            showTagline
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 14, filter: "blur(6px)" }
          }
          transition={{ duration: ms(1.2), ease: EASE }}
        >
          Conheça a transformação digital que sua empresa precisa
        </motion.p>
      </div>

      <button
        ref={skipRef}
        type="button"
        onClick={requestExit}
        className="absolute bottom-5 right-5 rounded-md px-3 py-2 text-caption uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:bottom-6 md:right-6"
      >
        Pular
      </button>
    </motion.div>
  );
};

export default BrandIntro;
