
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage, TherapyStyle, AssessmentContext } from '@/types/chat';
import { therapyStylePrompts } from '@/constants/therapyConstants';

export const useChatbotLogic = () => {
  const [sessionId, setSessionId] = useState<string>(() => {
    const savedSessionId = localStorage.getItem('chatSessionId');
    return savedSessionId || uuidv4();
  });
  
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [therapyStyle, setTherapyStyle] = useState<TherapyStyle>(() => {
    const savedStyle = localStorage.getItem('therapyStyle');
    return (savedStyle as TherapyStyle) || 'empathetic';
  });
  
  const [assessmentContext, setAssessmentContext] = useState<AssessmentContext>();

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('chatSessionId', sessionId);
  }, [sessionId]);

  useEffect(() => {
    localStorage.setItem('therapyStyle', therapyStyle);
  }, [therapyStyle]);

  return {
    sessionId,
    setSessionId,
    messages,
    setMessages,
    isLoading,
    setIsLoading,
    therapyStyle,
    setTherapyStyle,
    assessmentContext,
    setAssessmentContext,
  };
};
