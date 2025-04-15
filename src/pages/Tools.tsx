
import React from 'react';
import AvailableTools from '@/components/tools/AvailableTools';
import SelfHelpLibrary from '@/components/tools/SelfHelpLibrary';

const Tools: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">Wellness Tools</h1>
      <p className="text-muted-foreground mb-8">
        Interactive tools to support your mental health and self-care practice.
      </p>
      
      <AvailableTools />
      
      <SelfHelpLibrary />
      
      <div className="mt-12 bg-muted/50 rounded-lg p-6 border border-border">
        <h2 className="text-xl font-semibold mb-3">About These Tools</h2>
        <p className="text-muted-foreground mb-4">
          All tools on Self-Care Compass are designed to support your mental wellness journey, but they are not substitutes for professional care.
        </p>
        <p className="text-muted-foreground">
          These tools store information locally in your browser only - your data stays private and is never transmitted to any server.
        </p>
      </div>
    </div>
  );
};

export default Tools;
