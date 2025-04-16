
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Bot, 
  Trash2
} from 'lucide-react';
import TherapyStyleSelector from './TherapyStyleSelector';
import { TherapyStyle } from '@/contexts/ChatbotContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ChatHeaderProps {
  therapyStyle: TherapyStyle;
  onTherapyStyleChange: (style: TherapyStyle) => void;
  onClearChat: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  therapyStyle, 
  onTherapyStyleChange,
  onClearChat
}) => {
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    navigate('/tools');
  };
  
  return (
    <div className="border-b border-border py-3 px-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={handleBackClick} className="md:hidden">
          <ArrowLeft size={20} />
        </Button>
        
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
            <Bot size={18} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-medium">Zen Companion</h2>
            <p className="text-xs text-muted-foreground">AI-powered supportive chat</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <TherapyStyleSelector 
          currentStyle={therapyStyle}
          onChange={onTherapyStyleChange}
        />
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon" title="Clear conversation">
              <Trash2 size={18} className="text-muted-foreground" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear conversation history?</AlertDialogTitle>
              <AlertDialogDescription>
                This will delete all messages in this chat session and cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={onClearChat}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Clear
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ChatHeader;
