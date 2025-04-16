
import { BreathingPattern } from './types';

export const breathingPatterns: BreathingPattern[] = [
  {
    id: 'box',
    name: 'Box Breathing',
    description: 'Inhale, hold, exhale, and pause for equal counts (4-4-4-4)',
    inhaleTime: 4,
    holdTime: 4,
    exhaleTime: 4,
    pauseTime: 4
  },
  {
    id: '478',
    name: '4-7-8 Breathing',
    description: 'Inhale for 4, hold for 7, exhale for 8 (calming)',
    inhaleTime: 4,
    holdTime: 7,
    exhaleTime: 8,
    pauseTime: 0
  },
  {
    id: 'deep',
    name: 'Deep Diaphragmatic',
    description: 'Slow deep inhales and long exhales (5-2-7-0)',
    inhaleTime: 5,
    holdTime: 2,
    exhaleTime: 7,
    pauseTime: 0
  },
  {
    id: 'relaxing',
    name: 'Relaxing Breath',
    description: 'Gentle inhale, brief hold, long exhale (4-2-6-1)',
    inhaleTime: 4,
    holdTime: 2,
    exhaleTime: 6,
    pauseTime: 1
  }
];
