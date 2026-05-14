import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useRaceStore } from './raceStore';

beforeEach(() => {
  setActivePinia(createPinia());
});

describe('raceStore', () => {
  it('creates a valid race program with 6 rounds', () => {
    const store = useRaceStore();

    store.generateProgram();

    expect(store.status).toBe('program-generated');
    expect(store.roundProgram).toHaveLength(6);
    expect(store.roundResults).toHaveLength(0);
    expect(store.currentRoundIndex).toBe(-1);
    expect(store.visibleHorseList.length).toBeGreaterThanOrEqual(1);
    expect(store.visibleHorseList.length).toBeLessThanOrEqual(20);
  });

  it('runs races sequentially and produces 6 results', async () => {
    vi.useFakeTimers();

    const store = useRaceStore();
    store.generateProgram();

    const racePromise = store.startRace();
    await vi.runAllTimersAsync();
    await racePromise;

    expect(store.status).toBe('finished');
    expect(store.roundResults).toHaveLength(6);
    expect(store.countdownValue).toBeNull();

    for (const roundResult of store.roundResults) {
      expect(roundResult.rankings).toHaveLength(10);
    }

    vi.useRealTimers();
  });

  it('does not regenerate program while race is running', async () => {
    vi.useFakeTimers();

    const store = useRaceStore();
    store.generateProgram();

    const initialProgramReference = store.roundProgram;
    const racePromise = store.startRace();

    expect(store.status).toBe('running');

    store.generateProgram();
    expect(store.roundProgram).toBe(initialProgramReference);

    await vi.runAllTimersAsync();
    await racePromise;

    vi.useRealTimers();
  });
});
