import * as React from "react";

const STORAGE_KEY = "biten:intro:v1";
const SESSION_KEY = "biten:intro:session";
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

let sessionSeen = false;

function readLastShown(): number | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const value = (JSON.parse(raw) as { lastShown?: unknown }).lastShown;
    return typeof value === "number" ? value : null;
  } catch {
    return null;
  }
}

function hasSeenThisSession(): boolean {
  if (sessionSeen) return true;
  try {
    if (window.sessionStorage.getItem(SESSION_KEY) === "1") {
      sessionSeen = true;
      return true;
    }
  } catch {
    /* sessionStorage unavailable; the module flag still guards this session */
  }
  return false;
}

function markShown(): void {
  sessionSeen = true;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ lastShown: Date.now() }));
    window.sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* storage unavailable; the module flag still prevents replays in this session */
  }
}

function computeShouldShow(): boolean {
  if (hasSeenThisSession()) return false;
  const lastShown = readLastShown();
  return lastShown === null || Date.now() - lastShown > THIRTY_DAYS_MS;
}

export function useIntroGate() {
  const [visible, setVisible] = React.useState(computeShouldShow);

  React.useEffect(() => {
    if (visible) markShown();
  }, [visible]);

  const dismiss = React.useCallback(() => setVisible(false), []);

  return { visible, dismiss };
}
