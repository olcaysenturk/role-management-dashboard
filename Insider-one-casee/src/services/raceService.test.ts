import { describe, expect, it } from 'vitest';
import { HORSES_PER_ROUND, ROUND_DISTANCES, TOTAL_HORSE_POOL } from '../data/race';
import { generateHorsePool, generateRoundProgram } from './raceService';

describe('raceService', () => {
  it('generates a pool with 20 horses and valid condition scores', () => {
    const horsePool = generateHorsePool();

    expect(horsePool).toHaveLength(TOTAL_HORSE_POOL);

    const ids = new Set(horsePool.map((horse) => horse.id));
    const colors = new Set(horsePool.map((horse) => horse.color));

    expect(ids.size).toBe(TOTAL_HORSE_POOL);
    expect(colors.size).toBe(TOTAL_HORSE_POOL);

    for (const horse of horsePool) {
      expect(horse.conditionScore).toBeGreaterThanOrEqual(1);
      expect(horse.conditionScore).toBeLessThanOrEqual(100);
    }
  });

  it('generates 6 rounds with expected distances and 10 horses per round', () => {
    const horsePool = generateHorsePool();
    const roundProgram = generateRoundProgram(horsePool);

    expect(roundProgram).toHaveLength(ROUND_DISTANCES.length);

    roundProgram.forEach((round, index) => {
      expect(round.roundNumber).toBe(index + 1);
      expect(round.distance).toBe(ROUND_DISTANCES[index]);
      expect(round.horses).toHaveLength(HORSES_PER_ROUND);

      const roundHorseIds = new Set(round.horses.map((horse) => horse.id));
      expect(roundHorseIds.size).toBe(HORSES_PER_ROUND);
    });
  });
});
