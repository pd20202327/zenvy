
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SendHorizonal, Lightbulb } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  editMode?: boolean;
  editContent?: string;
  onCancelEdit?: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSend, 
  isLoading, 
  editMode = false, 
  editContent = '', 
  onCancelEdit 
}) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Update message when entering edit mode
  useEffect(() => {
    if (editMode && editContent) {
      setMessage(editContent);
    } else if (!editMode) {
      setMessage('');
    }
  }, [editMode, editContent]);
  
  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSend(message.trim());
      if (!editMode) {
        setMessage('');
      }
    }
  };
  
  // Focus input on component mount and when edit mode changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [editMode]);
  
  // Handle keyboard shortcut (Enter to send, Shift+Enter for new line)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Example conversation starters
  const conversationStarters = [
    "I've been feeling anxious lately",
    "I'm having trouble sleeping",
    "I'm struggling with motivation",
    "I feel overwhelmed by everything"
  ];
  
  const handleConversationStarter = (starter: string) => {
    setMessage(starter);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative mt-4">
      <div className="flex items-end gap-2">
        <div className="relative flex-grow">
          <Textarea
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={editMode ? "Edit your message..." : "Type your message..."}
            className={`min-h-[60px] pr-10 resize-none ${editMode ? 'bg-background/95 border-amber-300' : ''}`}
            disabled={isLoading}
          />
          {!editMode && (
            <div className="absolute right-2 top-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 hover:bg-muted"
                  >
                    <Lightbulb className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-64 p-2">
                  <div className="space-y-1">
                    {conversationStarters.map((starter, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start text-sm h-auto py-2 px-3"
                        onClick={() => handleConversationStarter(starter)}
                      >
                        {starter}
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
        
        {editMode ? (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={onCancelEdit}
              className="rounded-full"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSend}
              disabled={isLoading || !message.trim()} 
              className="rounded-full"
            >
              Save
            </Button>
          </div>
        ) : (
          <Button 
            onClick={handleSend}
            size="icon"
            disabled={isLoading || !message.trim()} 
            className="flex-shrink-0"
          >
            <SendHorizonal size={18} />
          </Button>
        )}
      </div>
      
      {!editMode && (
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Press Enter to send, Shift+Enter for new line
        </p>
      )}
    </div>
  );
};

export default ChatInput;
