
import { useState, useEffect, useRef } from 'react';
import { BreathingPattern, BreathPhase } from './types';
import { playTimerSound, speakInstruction } from '@/utils/audioUtils';

export const useBreathingLogic = (selectedPattern: BreathingPattern) => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<BreathPhase>(BreathPhase.INHALE);
  const [countdown, setCountdown] = useState(selectedPattern.inhale);
  const [progress, setProgress] = useState(0);
  const [breathCount, setBreathCount] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/breathing-sound.mp3');
    audioRef.current.loop = false;
    audioContextRef.current = new AudioContext();
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
      
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playSound = (phase: BreathPhase) => {
    if (isMuted) return;
    
    if (audioRef.current) {
      switch (phase) {
        case BreathPhase.INHALE:
          audioRef.current.volume = 0.3;
          audioRef.current.play();
          break;
        case BreathPhase.EXHALE:
          audioRef.current.volume = 0.2;
          audioRef.current.play();
          break;
        default:
          break;
      }
    }
    
    if (!isMuted) {
      speakInstruction(phase);
    }
  };

  useEffect(() => {
    if (!isBreathing) return;

    let phaseTime: number;
    
    switch (breathPhase) {
      case BreathPhase.INHALE:
        phaseTime = selectedPattern.inhale;
        break;
      case BreathPhase.HOLD1:
        phaseTime = selectedPattern.hold1;
        break;
      case BreathPhase.EXHALE:
        phaseTime = selectedPattern.exhale;
        break;
      case BreathPhase.HOLD2:
        phaseTime = selectedPattern.hold2;
        break;
      default:
        phaseTime = selectedPattern.inhale;
    }
    
    const progressIncrement = 1 / phaseTime;
    setCountdown(phaseTime);
    
    playSound(breathPhase);
    
    const intervalId = window.setInterval(() => {
      setCountdown(prev => {
        // Play timer sound for ALL seconds except the last one
        if (!isMuted && audioContextRef.current && prev > 1) {
          playTimerSound(audioContextRef.current);
        }
        
        if (prev <= 1) {
          let nextPhase: BreathPhase;
          switch (breathPhase) {
            case BreathPhase.INHALE:
              nextPhase = selectedPattern.hold1 > 0 ? BreathPhase.HOLD1 : BreathPhase.EXHALE;
              break;
            case BreathPhase.HOLD1:
              nextPhase = BreathPhase.EXHALE;
              break;
            case BreathPhase.EXHALE:
              nextPhase = selectedPattern.hold2 > 0 ? BreathPhase.HOLD2 : BreathPhase.INHALE;
              if (nextPhase === BreathPhase.INHALE) {
                setBreathCount(prev => prev + 1);
              }
              break;
            case BreathPhase.HOLD2:
              nextPhase = BreathPhase.INHALE;
              setBreathCount(prev => prev + 1);
              break;
            default:
              nextPhase = BreathPhase.INHALE;
          }
          
          setBreathPhase(nextPhase);
          playSound(nextPhase);
          
          setProgress(0);
          
          switch (nextPhase) {
            case BreathPhase.INHALE:
              return selectedPattern.inhale;
            case BreathPhase.HOLD1:
              return selectedPattern.hold1;
            case BreathPhase.EXHALE:
              return selectedPattern.exhale;
            case BreathPhase.HOLD2:
              return selectedPattern.hold2;
            default:
              return selectedPattern.inhale;
          }
        }
        
        setProgress(prev => prev + progressIncrement);
        return prev - 1;
      });
    }, 1000);
    
    intervalRef.current = intervalId;
    
    return () => {
      window.clearInterval(intervalId);
    };
  }, [isBreathing, breathPhase, selectedPattern, isMuted]);

  const toggleBreathing = () => {
    if (isBreathing) {
      setIsBreathing(false);
      setBreathPhase(BreathPhase.INHALE);
      setCountdown(selectedPattern.inhale);
      setProgress(0);
      setBreathCount(0);
      
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else {
      setIsBreathing(true);
      setBreathPhase(BreathPhase.INHALE);
      setCountdown(selectedPattern.inhale);
      setProgress(0);
      setBreathCount(0);
    }
  };

  return {
    isBreathing,
    breathPhase,
    countdown,
    progress,
    breathCount,
    isMuted,
    setIsMuted,
    toggleBreathing
  };
};

