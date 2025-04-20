const createAudioContext = () => {
  return new (window.AudioContext || (window as any).webkitAudioContext)();
};

export const playTimerSound = () => {
  const audioContext = createAudioContext();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.1);
};

export const speakInstruction = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.volume = 0.8;
  utterance.lang = 'en-US';
  speechSynthesis.speak(utterance);
};

export const playBreathSound = (type: 'inhale' | 'exhale') => {
  const audioContext = createAudioContext();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  if (type === 'inhale') {
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 note
    oscillator.frequency.linearRampToValueAtTime(660, audioContext.currentTime + 0.5); // E5 note
  } else {
    oscillator.frequency.setValueAtTime(660, audioContext.currentTime); // E5 note
    oscillator.frequency.linearRampToValueAtTime(440, audioContext.currentTime + 0.5); // A4 note
  }

  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.5);
};
