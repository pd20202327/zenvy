
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

interface FlashCardProps {
  title: string;
  content: string;
  isFlipped: boolean;
  onClick: () => void;
}

const FlashCard: React.FC<FlashCardProps> = ({ title, content, isFlipped, onClick }) => {
  return (
    <div 
      className={`cursor-pointer relative ${
        isFlipped ? 'h-auto' : 'h-[220px]'
      } perspective-1000`}
      onClick={onClick}
    >
      <Card className={`tool-card transition-all duration-500 h-full w-full 
        ${isFlipped ? 'bg-[#F2FCE2] dark:bg-[#222F22]' : 'bg-[#FAFAFA] dark:bg-[#1E1E1E]'}`}
      >
        <CardHeader className={`pb-0 ${isFlipped ? 'pt-4' : 'pt-6'}`}>
          <div className="flex justify-between items-center">
            <CardTitle className={`${isFlipped ? 'text-lg' : 'text-xl'} pr-6`}>
              {title}
            </CardTitle>
            <BookOpen className="h-5 w-5 text-primary flex-shrink-0" />
          </div>
        </CardHeader>
        <CardContent className={`overflow-hidden transition-all duration-300 ${
          isFlipped ? 'max-h-[800px] opacity-100 pt-2' : 'max-h-0 opacity-0 pt-0'
        }`}>
          <p className="text-sm">
            {content}
          </p>
        </CardContent>
        {!isFlipped && (
          <CardFooter className="pt-0 text-xs text-muted-foreground">
            Click to read more
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default FlashCard;
