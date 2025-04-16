
import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Define types for our chat messages
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

// Define the therapy style types
export type TherapyStyle = 'empathetic' | 'validating' | 'solution-focused' | 'reflective';

// Define the context type
interface ChatbotContextType {
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
}

// Create context with default values
const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

// System prompts for different therapy styles
const therapyStylePrompts: Record<TherapyStyle, string> = {
  "empathetic": "You are an empathetic AI therapy assistant. Focus on understanding the user's emotions and reflecting them back. Show genuine concern and validate their feelings. Never judge or minimize their experiences. Respond with warmth and compassion.",
  
  "validating": "You are a validating AI therapy assistant. Your primary goal is to validate the user's experiences and emotions. Let them know their feelings are legitimate and understandable. Affirm that their reactions make sense given their circumstances.",
  
  "solution-focused": "You are a solution-focused AI therapy assistant. While being empathetic, guide the user toward potential solutions or coping strategies. Help them identify their strengths and resources. Focus on small, achievable steps toward improvement.",
  
  "reflective": "You are a reflective AI therapy assistant. Mirror back what you hear from the user, helping them gain clarity about their thoughts and feelings. Ask open-ended questions that encourage deeper exploration. Help them see patterns in their thinking or behavior."
};

// Fallback responses for inappropriate or off-topic questions
const fallbackResponses = [
  "I'm here to support your emotional well-being. Let's focus on what's going on for you right now.",
  "I understand you're curious, but I'm designed to help with mental health topics. How are you feeling today?",
  "I'd like to keep our conversation centered on your well-being. Would you like to talk about what's on your mind?",
  "I'm here to provide emotional support. How about we focus on how you're doing?",
  "I'm most helpful when we talk about your feelings and experiences. What's been on your mind lately?"
];

export const ChatbotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Generate a session ID if none exists
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

  // Save messages to localStorage when they change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  // Save session ID to localStorage
  useEffect(() => {
    localStorage.setItem('chatSessionId', sessionId);
  }, [sessionId]);

  // Save therapy style to localStorage
  useEffect(() => {
    localStorage.setItem('therapyStyle', therapyStyle);
  }, [therapyStyle]);

  // Add a new message to the chat
  const addMessage = (content: string, role: 'user' | 'assistant' | 'system') => {
    const newMessage: ChatMessage = {
      id: uuidv4(),
      role,
      content,
      timestamp: Date.now(),
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  // Check if a message is appropriate for a mental health context
  const isAppropriateMessage = (message: string): boolean => {
    // This is a simple implementation - in a production app, you might use
    // more sophisticated content filtering or a moderation API
    const inappropriateTerms = [
      'hack', 'bomb', 'kill', 'weapon', 'terrorist', 'suicide', 'illegal',
      'drugs', 'porn', 'sex', 'gambling', 'bitcoin', 'investment', 'scam'
    ];
    
    const lowerMessage = message.toLowerCase();
    return !inappropriateTerms.some(term => lowerMessage.includes(term));
  };

  // Clear the chat history
  const clearChat = (shouldClearStorage: boolean = true) => {
    setMessages([]);
    if (shouldClearStorage) {
      setSessionId(uuidv4());
    }
  };
  
  // Edit a message
  const editMessage = (id: string, newContent: string) => {
    setMessages(prevMessages => 
      prevMessages.map(message => 
        message.id === id 
          ? { ...message, content: newContent, timestamp: Date.now() } 
          : message
      )
    );
  };

  // Send a message to the Gemini API
  const sendMessage = async (userMessage: string, isEdit: boolean = false, assistantMessageId?: string) => {
    if (!userMessage.trim()) return;
    
    // Add user message to chat if it's not an edit
    if (!isEdit) {
      addMessage(userMessage, 'user');
    }
    
    setIsLoading(true);
    
    // Check if message is appropriate
    if (!isAppropriateMessage(userMessage)) {
      // If inappropriate, send a fallback response
      const fallbackResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      setTimeout(() => {
        if (assistantMessageId) {
          // If it's an edit, update the existing assistant message
          setMessages(prevMessages => 
            prevMessages.map(message => 
              message.id === assistantMessageId 
                ? { ...message, content: fallbackResponse, timestamp: Date.now() } 
                : message
            )
          );
        } else {
          addMessage(fallbackResponse, 'assistant');
        }
        setIsLoading(false);
      }, 800);
      return;
    }
    
    try {
      // Get recent message history for context (last 10 messages)
      const recentMessages = messages.slice(-10).map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      }));
      
      // Add system instruction based on therapy style
      const systemPrompt = therapyStylePrompts[therapyStyle];
      
      // Prepare the request payload
      const payload = {
        contents: [
          { role: "user", parts: [{ text: systemPrompt }] },
          ...recentMessages,
          { role: "user", parts: [{ text: userMessage }] }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      };
      
      // Make API request
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAXX0FVA6KDs2y-6rZk6bMvKDvWl3nFgnQ`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      
      // Extract the response text
      let responseText = '';
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        responseText = data.candidates[0].content.parts[0].text;
      } else {
        responseText = "I'm having trouble processing that right now. How else can I support you today?";
      }
      
      // Add or update the assistant's response
      if (assistantMessageId) {
        // Update the existing assistant message for edited messages
        setMessages(prevMessages => 
          prevMessages.map(message => 
            message.id === assistantMessageId 
              ? { ...message, content: responseText, timestamp: Date.now() } 
              : message
          )
        );
      } else {
        // Add a new assistant message for new user messages
        addMessage(responseText, 'assistant');
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      
      const errorMessage = "I'm sorry, I encountered an error processing your message. Let's try again.";
      
      if (assistantMessageId) {
        // Update the existing assistant message with the error
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
