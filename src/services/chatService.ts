
import { ChatMessage } from '@/types/chat';
import { therapyStylePrompts } from '@/constants/therapyConstants';
import { v4 as uuidv4 } from 'uuid';

export const sendMessageToAPI = async (
  messages: ChatMessage[],
  userMessage: string,
  systemPrompt: string
) => {
  const payload = {
    contents: [
      { role: "user", parts: [{ text: systemPrompt }] },
      ...messages.slice(-10).map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      })),
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
  
  if (data.candidates && data.candidates[0] && data.candidates[0].content) {
    return data.candidates[0].content.parts[0].text;
  }
  
  return "I'm having trouble processing that right now. How else can I support you today?";
};

export const createChatMessage = (content: string, role: 'user' | 'assistant' | 'system'): ChatMessage => ({
  id: uuidv4(),
  role,
  content,
  timestamp: Date.now(),
});
