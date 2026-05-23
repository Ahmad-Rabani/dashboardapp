"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DashboardSnapshot } from "@/types/dashboard";

const MAX_HISTORY = 40;
const DEBOUNCE_MS = 700;

function cloneSnapshot(snapshot: DashboardSnapshot): DashboardSnapshot {
  return JSON.parse(JSON.stringify(snapshot)) as DashboardSnapshot;
}

function snapshotsEqual(a: DashboardSnapshot, b: DashboardSnapshot): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function useDashboardHistory(
  getSnapshot: () => DashboardSnapshot,
  applySnapshot: (snapshot: DashboardSnapshot) => void,
  enabled: boolean
) {
  const [past, setPast] = useState<DashboardSnapshot[]>([]);
  const [future, setFuture] = useState<DashboardSnapshot[]>([]);

  const lastCommittedRef = useRef<DashboardSnapshot | null>(null);
  const isRestoringRef = useRef(false);
  const seededRef = useRef(false);

  const seedHistory = useCallback(() => {
    lastCommittedRef.current = cloneSnapshot(getSnapshot());
    setPast([]);
    setFuture([]);
    seededRef.current = true;
  }, [getSnapshot]);

  useEffect(() => {
    if (!enabled) {
      seededRef.current = false;
      return;
    }
    if (!seededRef.current) {
      seedHistory();
    }
  }, [enabled, seedHistory]);

  useEffect(() => {
    if (!enabled || !seededRef.current || isRestoringRef.current) return;

    const timeout = window.setTimeout(() => {
      const current = getSnapshot();
      const last = lastCommittedRef.current;
      if (!last || snapshotsEqual(last, current)) return;

      setPast((prev) => [...prev.slice(-(MAX_HISTORY - 1)), cloneSnapshot(last)]);
      setFuture([]);
      lastCommittedRef.current = cloneSnapshot(current);
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(timeout);
  }, [enabled, getSnapshot]);

  const restore = useCallback(
    (snapshot: DashboardSnapshot) => {
      isRestoringRef.current = true;
      applySnapshot(snapshot);
      lastCommittedRef.current = cloneSnapshot(snapshot);
      window.setTimeout(() => {
        isRestoringRef.current = false;
      }, 0);
    },
    [applySnapshot]
  );

  const undo = useCallback(() => {
    if (!enabled || past.length === 0) return false;

    const current = getSnapshot();
    const previous = past[past.length - 1];

    setPast((prev) => prev.slice(0, -1));
    setFuture((prev) => [cloneSnapshot(current), ...prev.slice(0, MAX_HISTORY - 1)]);
    restore(previous);
    return true;
  }, [enabled, past, getSnapshot, restore]);

  const redo = useCallback(() => {
    if (!enabled || future.length === 0) return false;

    const current = getSnapshot();
    const next = future[0];

    setFuture((prev) => prev.slice(1));
    setPast((prev) => [...prev.slice(-(MAX_HISTORY - 1)), cloneSnapshot(current)]);
    restore(next);
    return true;
  }, [enabled, future, getSnapshot, restore]);

  const clearHistory = useCallback(() => {
    seedHistory();
  }, [seedHistory]);

  const commitBeforeReplace = useCallback(() => {
    if (!enabled) return;
    const current = cloneSnapshot(getSnapshot());
    setPast((prev) => [...prev.slice(-(MAX_HISTORY - 1)), current]);
    setFuture([]);
  }, [enabled, getSnapshot]);

  const syncCurrent = useCallback(() => {
    isRestoringRef.current = true;
    lastCommittedRef.current = cloneSnapshot(getSnapshot());
    window.setTimeout(() => {
      isRestoringRef.current = false;
    }, 0);
  }, [getSnapshot]);

  return {
    canUndo: enabled && past.length > 0,
    canRedo: enabled && future.length > 0,
    undo,
    redo,
    clearHistory,
    commitBeforeReplace,
    syncCurrent,
  };
}
