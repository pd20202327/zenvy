
import React from 'react';
import { cn } from '@/lib/utils';
import { Bot, User, Pencil, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface MessageBubbleProps {
  content: string;
  isUser: boolean;
  timestamp: number;
  id?: string;
  onEdit?: (id: string, content: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ content, isUser, timestamp, id, onEdit }) => {
  const { toast } = useToast();
  
  // Format timestamp
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast({
      description: "Message copied to clipboard",
      duration: 3000,
    });
  };

  const handleEdit = () => {
    if (id && onEdit) {
      onEdit(id, content);
    }
  };

  return (
    <div
      className={cn(
        "flex items-start gap-2 mb-4 group",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <Bot size={18} className="text-primary" />
        </div>
      )}
      
      <div className="max-w-[75%] flex flex-col relative">
        <div
          className={cn(
            "rounded-2xl px-4 py-3 relative",
            isUser 
              ? "bg-primary text-primary-foreground rounded-tr-none" 
              : "bg-muted rounded-tl-none"
          )}
        >
          <p className="whitespace-pre-line">{content}</p>
        </div>
        
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-muted-foreground">
            {formatTime(timestamp)}
          </span>
          
          {isUser && (
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleEdit}
              >
                <Pencil size={12} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleCopy}
              >
                <Copy size={12} />
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/80 flex items-center justify-center">
          <User size={16} className="text-primary-foreground" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
