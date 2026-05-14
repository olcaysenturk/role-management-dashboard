export const RACE_SIMULATION_CONFIG = {
  minVisibleHorses: 1,
  maxVisibleHorses: 20,
  roundDurationMs: 6200,
  tickMs: 120,
  roundResultPreviewMs: 900,
  countdownTickMs: 1000,
  roundCountdownSeconds: 3,
  progressConditionWeight: 0.6,
  progressRandomMin: 55,
  progressRandomMax: 95,
  podiumProgressStart: 100,
  podiumProgressStep: 6,
  minPodiumProgress: 20
} as const;
