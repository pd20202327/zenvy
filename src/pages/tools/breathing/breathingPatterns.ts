
import { BreathingPattern } from './types';

export const breathingPatterns: BreathingPattern[] = [
  {
    id: '4-7-8',
    name: '4-7-8 Breathing',
    inhale: 4,
    hold1: 7,
    exhale: 8,
    hold2: 0,
    description: 'A relaxing breath pattern that helps reduce anxiety and aid sleep.',
    benefits: [
      'Reduces anxiety and stress',
      'Helps with falling asleep',
      'Manages cravings',
      'Helps control emotional responses'
    ]
  },
  {
    id: 'box',
    name: 'Box Breathing',
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
    description: 'Equal parts breath and hold, creating a "box" pattern that promotes focus and calm.',
    benefits: [
      'Heightens performance and concentration',
      'Manages stress',
      'Improves emotional regulation',
      'Used by Navy SEALs for calm under pressure'
    ]
  },
  {
    id: 'deep',
    name: 'Deep Breathing',
    inhale: 5,
    hold1: 2,
    exhale: 6,
    hold2: 0,
    description: 'Simple deep breathing with long exhales to activate the parasympathetic nervous system.',
    benefits: [
      'Activates relaxation response',
      'Lowers heart rate and blood pressure',
      'Improves oxygen exchange',
      'Accessible anytime, anywhere'
    ]
  }
];
