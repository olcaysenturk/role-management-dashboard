import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { RACE_SIMULATION_CONFIG } from '../data/raceConfig';
import { randomInt } from '../lib/random';
import { calculateRoundResult, generateHorsePool, generateRoundProgram } from '../services/raceService';
import type { HorseProgress, RaceStatus, RoundProgram, RoundResult } from '../types/race';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const useRaceStore = defineStore('race', () => {
  const horsePool = ref(generateHorsePool());
  const visibleHorseCount = ref(randomInt(1, 20));
  const roundProgram = ref<RoundProgram[]>([]);
  const roundResults = ref<RoundResult[]>([]);
  const currentRoundIndex = ref<number>(-1);
  const horseProgress = ref<HorseProgress[]>([]);
  const status = ref<RaceStatus>('idle');
  const countdownValue = ref<number | null>(null);

  const visibleHorseList = computed(() => horsePool.value.slice(0, visibleHorseCount.value));
  const activeRound = computed(() => roundProgram.value[currentRoundIndex.value] ?? null);

  function resetRaceState(nextStatus: RaceStatus): void {
    roundResults.value = [];
    currentRoundIndex.value = -1;
    horseProgress.value = [];
    countdownValue.value = null;
    status.value = nextStatus;
  }

  function createEmptyProgress(round: RoundProgram): HorseProgress[] {
    return round.horses.map((horse) => ({ horseId: horse.id, progress: 0 }));
  }

  function createAnimatedProgress(round: RoundProgram, ratio: number): HorseProgress[] {
    const currentProgressByHorseId = new Map(horseProgress.value.map((item) => [item.horseId, item.progress]));

    return round.horses.map((horse) => {
      const previousProgress = currentProgressByHorseId.get(horse.id) ?? 0;
      const nextProgressCandidate = Math.min(
        100,
        ratio * (
          horse.conditionScore * RACE_SIMULATION_CONFIG.progressConditionWeight +
          randomInt(RACE_SIMULATION_CONFIG.progressRandomMin, RACE_SIMULATION_CONFIG.progressRandomMax)
        )
      );

      return {
        horseId: horse.id,
        progress: Math.max(previousProgress, nextProgressCandidate)
      };
    });
  }

  function createFinalRankProgress(result: RoundResult): HorseProgress[] {
    return result.rankings.map((horse, rankingIndex) => ({
      horseId: horse.id,
      progress: Math.max(
        RACE_SIMULATION_CONFIG.minPodiumProgress,
        RACE_SIMULATION_CONFIG.podiumProgressStart - rankingIndex * RACE_SIMULATION_CONFIG.podiumProgressStep
      )
    }));
  }

  async function runRoundCountdown(): Promise<void> {
    countdownValue.value = RACE_SIMULATION_CONFIG.roundCountdownSeconds;

    while (countdownValue.value > 0) {
      await sleep(RACE_SIMULATION_CONFIG.countdownTickMs);
      countdownValue.value -= 1;
    }

    countdownValue.value = null;
  }

  async function animateRound(round: RoundProgram): Promise<void> {
    const totalTicks = Math.floor(RACE_SIMULATION_CONFIG.roundDurationMs / RACE_SIMULATION_CONFIG.tickMs);

    for (let tick = 1; tick <= totalTicks; tick += 1) {
      const ratio = tick / totalTicks;
      horseProgress.value = createAnimatedProgress(round, ratio);
      await sleep(RACE_SIMULATION_CONFIG.tickMs);
    }
  }

  async function finalizeRound(round: RoundProgram): Promise<void> {
    const result = calculateRoundResult(round);
    roundResults.value.push(result);
    horseProgress.value = createFinalRankProgress(result);
    await sleep(RACE_SIMULATION_CONFIG.roundResultPreviewMs);
  }

  async function runSingleRound(round: RoundProgram, index: number): Promise<void> {
    currentRoundIndex.value = index;
    horseProgress.value = createEmptyProgress(round);
    await runRoundCountdown();
    await animateRound(round);
    await finalizeRound(round);
  }

  function generateProgram(): void {
    if (status.value === 'running') {
      return;
    }

    horsePool.value = generateHorsePool();
    visibleHorseCount.value = randomInt(
      RACE_SIMULATION_CONFIG.minVisibleHorses,
      RACE_SIMULATION_CONFIG.maxVisibleHorses
    );
    roundProgram.value = generateRoundProgram(horsePool.value);
    resetRaceState('program-generated');
  }

  async function startRace(): Promise<void> {
    if (roundProgram.value.length === 0 || status.value === 'running') {
      return;
    }

    status.value = 'running';
    roundResults.value = [];

    for (let index = 0; index < roundProgram.value.length; index += 1) {
      await runSingleRound(roundProgram.value[index], index);
    }

    status.value = 'finished';
    countdownValue.value = null;
  }

  return {
    horsePool,
    visibleHorseList,
    roundProgram,
    roundResults,
    currentRoundIndex,
    horseProgress,
    status,
    activeRound,
    countdownValue,
    generateProgram,
    startRace
  };
});
