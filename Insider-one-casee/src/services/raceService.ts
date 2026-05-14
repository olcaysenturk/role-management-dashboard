import { HORSE_COLORS, HORSE_NAME_POOL, HORSES_PER_ROUND, ROUND_DISTANCES, TOTAL_HORSE_POOL } from '../data/race';
import { pickRandomItems, randomInt, shuffleArray } from '../lib/random';
import type { Horse, RoundProgram, RoundResult } from '../types/race';

export function generateHorsePool(): Horse[] {
  const shuffledNames = shuffleArray(HORSE_NAME_POOL);

  return Array.from({ length: TOTAL_HORSE_POOL }, (_, index) => ({
    id: index + 1,
    name: shuffledNames[index],
    color: HORSE_COLORS[index],
    conditionScore: randomInt(1, 100)
  }));
}

export function generateRoundProgram(horses: Horse[]): RoundProgram[] {
  return ROUND_DISTANCES.map((distance, roundIndex) => ({
    roundNumber: roundIndex + 1,
    distance,
    horses: pickRandomItems(horses, HORSES_PER_ROUND)
  }));
}

export function calculateRoundResult(program: RoundProgram): RoundResult {
  const weighted = program.horses.map((horse) => ({
    horse,
    score: horse.conditionScore * 0.7 + randomInt(1, 100) * 0.3
  }));

  const rankings = weighted
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.horse);

  return {
    roundNumber: program.roundNumber,
    distance: program.distance,
    rankings
  };
}
