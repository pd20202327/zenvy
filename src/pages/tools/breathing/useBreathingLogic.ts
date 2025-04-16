
import { useState, useEffect, useRef } from 'react';
import { BreathingPattern } from './types';

export const useBreathingLogic = (pattern: BreathingPattern) => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [countdown, setCountdown] = useState(pattern.inhaleTime);
  const [breathCount, setBreathCount] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  
  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Set up audio 
  useEffect(() => {
    audioRef.current = new Audio('/breath-sound.mp3');
    audioRef.current.volume = 0.3;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  // Main breathing timer logic
  useEffect(() => {
    if (!isBreathing) return;
    
    timerRef.current = window.setTimeout(() => {
      if (countdown > 1) {
        setCountdown(countdown - 1);
      } else {
        // Move to next phase
        switch (breathPhase) {
          case 'inhale':
            setBreathPhase('hold');
            setCountdown(pattern.holdTime);
            break;
          case 'hold':
            setBreathPhase('exhale');
            setCountdown(pattern.exhaleTime);
            break;
          case 'exhale':
            if (pattern.pauseTime > 0) {
              setBreathPhase('pause');
              setCountdown(pattern.pauseTime);
            } else {
              setBreathPhase('inhale');
              setCountdown(pattern.inhaleTime);
              setBreathCount(count => count + 1);
            }
            break;
          case 'pause':
            setBreathPhase('inhale');
            setCountdown(pattern.inhaleTime);
            setBreathCount(count => count + 1);
            break;
        }
      }
    }, 1000);
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isBreathing, countdown, breathPhase, pattern]);
  
  // Play sounds based on breath phase
  useEffect(() => {
    if (!isBreathing || isMuted || !audioRef.current) return;
    
    if (breathPhase === 'inhale' && countdown === pattern.inhaleTime) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => console.error('Error playing audio:', error));
    }
  }, [breathPhase, countdown, isBreathing, isMuted, pattern.inhaleTime]);
  
  // Start/stop breathing exercise
  const toggleBreathing = () => {
    if (isBreathing) {
      setIsBreathing(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    } else {
      setIsBreathing(true);
      setBreathPhase('inhale');
      setCountdown(pattern.inhaleTime);
    }
  };
  
  return {
    isBreathing,
    breathPhase,
    countdown,
    breathCount,
    isMuted,
    setIsMuted,
    toggleBreathing
  };
};
