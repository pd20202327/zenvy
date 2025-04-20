import { useState, useEffect, useRef } from 'react';
import { BreathingPattern } from './types';
import { playTimerSound, speakInstruction, playBreathSound } from '@/utils/audioUtils';

export const useBreathingLogic = (pattern: BreathingPattern) => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [countdown, setCountdown] = useState(pattern.inhaleTime);
  const [breathCount, setBreathCount] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  
  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
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
  
  useEffect(() => {
    if (!isBreathing) return;
    
    timerRef.current = window.setTimeout(() => {
      if (countdown > 1) {
        setCountdown(countdown - 1);
        if (!isMuted) {
          playTimerSound();
        }
      } else {
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
  }, [isBreathing, countdown, breathPhase, pattern, isMuted]);
  
  useEffect(() => {
    if (!isBreathing || isMuted) return;
    
    if (countdown === pattern.inhaleTime && breathPhase === 'inhale') {
      playBreathSound('inhale');
      speakInstruction('Inhale');
    } else if (countdown === pattern.holdTime && breathPhase === 'hold') {
      playTimerSound();
      speakInstruction('Hold');
    } else if (countdown === pattern.exhaleTime && breathPhase === 'exhale') {
      playBreathSound('exhale');
      speakInstruction('Exhale');
    } else if (countdown === pattern.pauseTime && breathPhase === 'pause') {
      playTimerSound();
      speakInstruction('Pause');
    }
  }, [breathPhase, countdown, isBreathing, isMuted, pattern]);
  
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
