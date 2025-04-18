
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
        "flex items-start gap-2 mb-3 group",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/20 flex items-center justify-center">
          <Bot size={14} className="text-primary" />
        </div>
      )}
      
      <div className="max-w-[80%] flex flex-col relative">
        <div
          className={cn(
            "rounded-2xl px-3 py-2 relative text-xs sm:text-sm",
            isUser 
              ? "bg-primary text-primary-foreground rounded-tr-none" 
              : "bg-muted rounded-tl-none"
          )}
        >
          <p className="whitespace-pre-line leading-relaxed">{content}</p>
        </div>
        
        <div className="flex justify-between items-center mt-0.5">
          <span className="text-[10px] text-muted-foreground">
            {formatTime(timestamp)}
          </span>
          
          {isUser && (
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleEdit}
              >
                <Pencil size={10} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleCopy}
              >
                <Copy size={10} />
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/80 flex items-center justify-center">
          <User size={14} className="text-primary-foreground" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
