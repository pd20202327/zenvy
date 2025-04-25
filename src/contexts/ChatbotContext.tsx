
import React, { createContext, useContext } from 'react';
import { ChatbotContextType, ChatMessage } from '@/types/chat';
import { useChatbotLogic } from '@/hooks/useChatbotLogic';
import { createChatMessage, sendMessageToAPI } from '@/services/chatService';
import { therapyStylePrompts } from '@/constants/therapyConstants';

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const ChatbotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    sessionId,
    messages,
    setMessages,
    isLoading,
    setIsLoading,
    therapyStyle,
    setTherapyStyle,
    assessmentContext,
    setAssessmentContext,
  } = useChatbotLogic();

  const addMessage = (content: string, role: 'user' | 'assistant' | 'system') => {
    const newMessage = createChatMessage(content, role);
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  const sendMessage = async (userMessage: string, isEdit: boolean = false, assistantMessageId?: string) => {
    if (!userMessage.trim()) return;
    
    if (!isEdit) {
      addMessage(userMessage, 'user');
    }
    
    setIsLoading(true);
    
    try {
      let systemPrompt = therapyStylePrompts[therapyStyle];
      if (assessmentContext) {
        const contextPrompt = Object.entries(assessmentContext.sectionScores)
          .map(([section, data]) => 
            `${section}: ${data.severityLabel} (${Math.round(data.percentage)}%) - ${data.severityDescription}`
          )
          .join('\n');
        
        systemPrompt += `\n\nRecent assessment results:\n${contextPrompt}\n\nUse this information to provide more personalized and relevant support while maintaining a compassionate and understanding tone.`;
      }
      
      const responseText = await sendMessageToAPI(messages, userMessage, systemPrompt);
      
      if (assistantMessageId) {
        setMessages(prevMessages => 
          prevMessages.map(message => 
            message.id === assistantMessageId 
              ? { ...message, content: responseText, timestamp: Date.now() } 
              : message
          )
        );
      } else {
        addMessage(responseText, 'assistant');
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      const errorMessage = "I'm sorry, I encountered an error processing your message. Let's try again.";
      
      if (assistantMessageId) {
        setMessages(prevMessages => 
          prevMessages.map(message => 
            message.id === assistantMessageId 
              ? { ...message, content: errorMessage, timestamp: Date.now() } 
              : message
          )
        );
      } else {
        addMessage(errorMessage, 'assistant');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = (shouldClearStorage: boolean = true) => {
    setMessages([]);
  };
  
  const editMessage = (id: string, newContent: string) => {
    setMessages(prevMessages => 
      prevMessages.map(message => 
        message.id === id 
          ? { ...message, content: newContent, timestamp: Date.now() } 
          : message
      )
    );
  };

  const value = {
    messages,
    isLoading,
    therapyStyle,
    sessionId,
    addMessage,
    sendMessage,
    clearChat,
    setTherapyStyle,
    editMessage,
    setMessages,
    assessmentContext,
    setAssessmentContext,
  };

  return <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>;
};

export const useChatbot = (): ChatbotContextType => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};
