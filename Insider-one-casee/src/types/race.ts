export interface Horse {
  id: number;
  name: string;
  color: string;
  conditionScore: number;
}

export interface RoundProgram {
  roundNumber: number;
  distance: number;
  horses: Horse[];
}

export interface RoundResult {
  roundNumber: number;
  distance: number;
  rankings: Horse[];
}

export interface HorseProgress {
  horseId: number;
  progress: number;
}

export type RaceStatus = 'idle' | 'program-generated' | 'running' | 'finished';
