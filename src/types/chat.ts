
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export type TherapyStyle = 'empathetic' | 'validating' | 'solution-focused' | 'reflective';

export interface AssessmentContext {
  sectionScores: {
    [key: string]: {
      score: number;
      maxScore: number;
      percentage: number;
      severityLabel: string;
      severityDescription: string;
    };
  };
}

export interface ChatbotContextType {
  messages: ChatMessage[];
  isLoading: boolean;
  therapyStyle: TherapyStyle;
  sessionId: string;
  addMessage: (content: string, role: 'user' | 'assistant' | 'system') => void;
  sendMessage: (message: string, isEdit?: boolean, assistantMessageId?: string) => Promise<void>;
  clearChat: (shouldClearStorage?: boolean) => void;
  setTherapyStyle: (style: TherapyStyle) => void;
  editMessage: (id: string, newContent: string) => void;
  setMessages: (messages: ChatMessage[]) => void;
  assessmentContext?: AssessmentContext;
  setAssessmentContext: (context: AssessmentContext | undefined) => void;
}
