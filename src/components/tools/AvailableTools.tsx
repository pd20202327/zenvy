
import React from 'react';
import ToolCard from './ToolCard';
import { PenSquare, Wind, Heart, CheckSquare } from 'lucide-react';

const AvailableTools: React.FC = () => {
  const tools = [
    {
      title: "Guided Journaling",
      description: "Express your thoughts and feelings through structured prompts",
      icon: PenSquare,
      features: [
        "Daily reflection prompts",
        "Gratitude journaling",
        "Anxiety and thought tracking",
        "Save entries locally"
      ],
      linkText: "Open Journal",
      linkPath: "/tools/journal"
    },
    {
      title: "Breathing Exercises",
      description: "Guided breathing techniques for stress reduction",
      icon: Wind,
      features: [
        "4-7-8 relaxation breathing",
        "Box breathing",
        "Deep diaphragmatic breathing",
        "Visual breathing guidance"
      ],
      linkText: "Start Breathing",
      linkPath: "/tools/breathing"
    },
    {
      title: "Self-Love Challenge",
      description: "30-day journey to build self-esteem and compassion",
      icon: Heart,
      features: [
        "Daily affirmations and activities",
        "Progress tracking",
        "Reflective prompts",
        "Printable challenge calendar"
      ],
      linkText: "Begin Challenge",
      linkPath: "/tools/self-love"
    },
    {
      title: "Habit Tracker",
      description: "Build positive mental health routines",
      icon: CheckSquare,
      features: [
        "Movement and exercise",
        "Sleep and rest",
        "Water intake",
        "Mindfulness practice"
      ],
      linkText: "Track Habits",
      linkPath: "/tools/habits"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool, index) => (
        <ToolCard
          key={index}
          title={tool.title}
          description={tool.description}
          icon={tool.icon}
          features={tool.features}
          linkText={tool.linkText}
          linkPath={tool.linkPath}
        />
      ))}
    </div>
  );
};

export default AvailableTools;
