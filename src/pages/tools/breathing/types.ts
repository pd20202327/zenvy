
export interface BreathingPattern {
  id: string;
  name: string;
  inhale: number;
  hold1: number;
  exhale: number;
  hold2: number;
  description: string;
  benefits: string[];
}

export enum BreathPhase {
  INHALE = 'Inhale',
  HOLD1 = 'Hold',
  EXHALE = 'Exhale',
  HOLD2 = 'Hold',
}
