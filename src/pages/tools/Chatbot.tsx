import React, { useState, useRef } from 'react';
import { useChatbot } from '@/contexts/ChatbotContext';
import ChatHeader from '@/components/chatbot/ChatHeader';
import ChatInput from '@/components/chatbot/ChatInput';
import MessageBubble from '@/components/chatbot/MessageBubble';
import { Card, CardContent } from '@/components/ui/card';
import { TherapyStyle } from '@/contexts/ChatbotContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const Chatbot: React.FC = () => {
  const { 
    messages, 
    isLoading, 
    sendMessage, 
    clearChat,
    therapyStyle,
    setTherapyStyle,
    editMessage
  } = useChatbot();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [editingMessage, setEditingMessage] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>('');
  const { toast } = useToast();

  const handleSendMessage = (message: string) => {
    if (editingMessage) {
      handleEditComplete(editingMessage, message);
    } else {
      sendMessage(message);
    }
  };
  
  const handleClearChat = () => {
    clearChat();
    toast({
      description: "Chat history cleared",
    });
  };
  
  const handleTherapyStyleChange = (style: TherapyStyle) => {
    setTherapyStyle(style);
    toast({
      description: `Conversation style changed to ${style}`,
    });
  };
  
  const handleEditStart = (id: string, content: string) => {
    setEditingMessage(id);
    setEditContent(content);
  };
  
  const handleEditCancel = () => {
    setEditingMessage(null);
    setEditContent('');
  };
  
  const handleEditComplete = (id: string, newContent: string) => {
    if (newContent.trim()) {
      const messageIndex = messages.findIndex(msg => msg.id === id);
      if (messageIndex >= 0 && messageIndex + 1 < messages.length && messages[messageIndex + 1].role === 'assistant') {
        const assistantMessageId = messages[messageIndex + 1].id;
        editMessage(id, newContent);
        sendMessage(newContent, true, assistantMessageId);
      } else {
        editMessage(id, newContent);
        sendMessage(newContent, true);
      }
    }
    setEditingMessage(null);
    setEditContent('');
  };

  return (
    <div className="container max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
      <Card className="overflow-hidden border shadow-md">
        <ChatHeader 
          therapyStyle={therapyStyle}
          onTherapyStyleChange={handleTherapyStyleChange}
          onClearChat={handleClearChat}
        />
        
        <CardContent className="p-0">
          <div 
            className="h-[70vh] overflow-y-auto p-3 sm:p-4"
          >
            {messages.length > 0 ? (
              <div className="space-y-2">
                {messages.map((message) => (
                  message.role !== 'system' && (
                    <MessageBubble
                      key={message.id}
                      id={message.id}
                      content={message.content}
                      isUser={message.role === 'user'}
                      timestamp={message.timestamp}
                      onEdit={handleEditStart}
                    />
                  )
                ))}
                {isLoading && (
                  <div className="flex justify-center py-3">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                  <span className="text-xl text-primary">Z</span>
                </div>
                <h3 className="text-base font-medium">Welcome to Zen Companion</h3>
                <p className="text-sm text-muted-foreground max-w-xs mt-2">
                  Your AI companion for emotional support. Share what's on your mind, and I'm here to listen.
                </p>
              </div>
            )}
          </div>
          
          <div className="border-t p-3 sm:p-4">
            <ChatInput 
              onSend={handleSendMessage} 
              isLoading={isLoading}
              editMode={editingMessage !== null}
              editContent={editContent}
              onCancelEdit={handleEditCancel}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chatbot;
