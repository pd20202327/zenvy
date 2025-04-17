
import React from 'react';
import { TherapyStyle } from '@/contexts/ChatbotContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Heart, CheckIcon, ChevronDown } from 'lucide-react';

interface TherapyStyleSelectorProps {
  currentStyle: TherapyStyle;
  onChange: (style: TherapyStyle) => void;
}

const TherapyStyleSelector: React.FC<TherapyStyleSelectorProps> = ({ currentStyle, onChange }) => {
  const styles: { value: TherapyStyle; label: string; description: string }[] = [
    {
      value: 'empathetic',
      label: 'Empathetic',
      description: 'Focuses on understanding your emotions and showing compassion'
    },
    {
      value: 'validating',
      label: 'Validating',
      description: 'Affirms that your feelings are legitimate and understandable'
    },
    {
      value: 'solution-focused',
      label: 'Solution-Focused',
      description: 'Guides you toward potential solutions and coping strategies'
    },
    {
      value: 'reflective',
      label: 'Reflective',
      description: 'Mirrors back your thoughts to help you gain clarity'
    }
  ];
  
  // Get current style label
  const currentStyleLabel = styles.find(s => s.value === currentStyle)?.label || 'Empathetic';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex h-8 text-xs items-center gap-1 px-2">
          <Heart size={12} className="text-primary mr-1" />
          <span>Style: {currentStyleLabel}</span>
          <ChevronDown size={12} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52 sm:w-56 p-1">
        {styles.map((style) => (
          <DropdownMenuItem
            key={style.value}
            onClick={() => onChange(style.value)}
            className="flex flex-col items-start py-1 cursor-pointer"
          >
            <div className="flex w-full items-center justify-between">
              <span className="font-medium text-xs sm:text-sm">{style.label}</span>
              {currentStyle === style.value && (
                <CheckIcon size={14} className="text-primary" />
              )}
            </div>
            <span className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{style.description}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TherapyStyleSelector;
