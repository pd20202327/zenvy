
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Calendar, Check, Download, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface Challenge {
  day: number;
  title: string;
  description: string;
  affirmation: string;
  completed: boolean;
}

const generateChallenges = (): Challenge[] => [
  {
    day: 1,
    title: "Self-Appreciation",
    description: "Write down three qualities you like about yourself.",
    affirmation: "I appreciate my unique qualities and strengths.",
    completed: false
  },
  {
    day: 2,
    title: "Digital Detox",
    description: "Take a 2-hour break from all screens and social media.",
    affirmation: "I prioritize my mental peace over digital distractions.",
    completed: false
  },
  {
    day: 3,
    title: "Body Gratitude",
    description: "Thank your body for five things it does for you every day.",
    affirmation: "I am grateful for my body and all it does for me.",
    completed: false
  },
  {
    day: 4,
    title: "Mindful Moment",
    description: "Take 10 minutes to meditate or simply focus on your breath.",
    affirmation: "I deserve moments of peace and stillness.",
    completed: false
  },
  {
    day: 5,
    title: "Positive Boundaries",
    description: "Practice saying 'no' to one thing that drains your energy.",
    affirmation: "Setting healthy boundaries is an act of self-respect.",
    completed: false
  },
  {
    day: 6,
    title: "Creative Expression",
    description: "Spend 15 minutes doing something creative just for enjoyment.",
    affirmation: "My creative expression is valuable and worth my time.",
    completed: false
  },
  {
    day: 7,
    title: "Compassionate Mirror",
    description: "Look in the mirror and say three kind things to yourself.",
    affirmation: "I speak to myself with kindness and compassion.",
    completed: false
  },
  {
    day: 8,
    title: "Nature Connection",
    description: "Spend time outdoors and notice the natural beauty around you.",
    affirmation: "I am connected to the healing power of nature.",
    completed: false
  },
  {
    day: 9,
    title: "Forgiveness Practice",
    description: "Write a forgiveness note to yourself for a past mistake.",
    affirmation: "I forgive myself and choose to move forward with compassion.",
    completed: false
  },
  {
    day: 10,
    title: "Comfort Zone Challenge",
    description: "Do one small thing outside your comfort zone today.",
    affirmation: "I grow stronger when I challenge myself with kindness.",
    completed: false
  },
  {
    day: 11,
    title: "Joy Inventory",
    description: "Make a list of 10 things that bring you joy, then do one today.",
    affirmation: "I deserve to experience joy in my life.",
    completed: false
  },
  {
    day: 12,
    title: "Media Mindfulness",
    description: "Unfollow accounts that make you feel inadequate or negative.",
    affirmation: "I consciously choose what influences my mind and spirit.",
    completed: false
  },
  {
    day: 13,
    title: "Self-Care Ritual",
    description: "Create and practice a 10-minute self-care ritual.",
    affirmation: "Taking care of myself is a priority, not a luxury.",
    completed: false
  },
  {
    day: 14,
    title: "Values Reflection",
    description: "Identify three core values and how you honor them in your life.",
    affirmation: "I live authentically in alignment with my true values.",
    completed: false
  },
  {
    day: 15,
    title: "Gratitude Practice",
    description: "Write down five things you're grateful for in your life right now.",
    affirmation: "My life is filled with blessings worthy of gratitude.",
    completed: false
  },
  {
    day: 16,
    title: "Body Movement",
    description: "Move your body in a way that feels good for 20 minutes.",
    affirmation: "I honor my body by moving it with joy and kindness.",
    completed: false
  },
  {
    day: 17,
    title: "Inner Child",
    description: "Do something playful that your younger self would have enjoyed.",
    affirmation: "My inner child deserves attention, love and joy.",
    completed: false
  },
  {
    day: 18,
    title: "Strength Recognition",
    description: "Reflect on a difficult time you overcame and acknowledge your strength.",
    affirmation: "I am resilient and stronger than I sometimes realize.",
    completed: false
  },
  {
    day: 19,
    title: "Digital Appreciation",
    description: "Send a message of appreciation to someone who supports you.",
    affirmation: "I nurture connections that bring positivity to my life.",
    completed: false
  },
  {
    day: 20,
    title: "Sensory Pleasure",
    description: "Indulge mindfully in something that pleases your senses.",
    affirmation: "I deserve to experience pleasure and enjoyment in my life.",
    completed: false
  },
  {
    day: 21,
    title: "Worry Release",
    description: "Write down your worries on paper, then tear it up or burn it safely.",
    affirmation: "I release what I cannot control and focus on the present.",
    completed: false
  },
  {
    day: 22,
    title: "Skill Appreciation",
    description: "Acknowledge a skill or talent you have that you're proud of.",
    affirmation: "I value my abilities and the unique gifts I bring to the world.",
    completed: false
  },
  {
    day: 23,
    title: "Limiting Belief Challenge",
    description: "Identify and challenge one negative belief you hold about yourself.",
    affirmation: "I am not defined by limiting beliefs about myself.",
    completed: false
  },
  {
    day: 24,
    title: "Nourishment Focus",
    description: "Prepare a meal for yourself with extra care and attention.",
    affirmation: "I nourish my body with attention and care.",
    completed: false
  },
  {
    day: 25,
    title: "Emotional Processing",
    description: "Allow yourself to feel and express a difficult emotion in a healthy way.",
    affirmation: "All my emotions are valid and deserve to be acknowledged.",
    completed: false
  },
  {
    day: 26,
    title: "Sleep Ritual",
    description: "Create a 30-minute wind-down routine before bed tonight.",
    affirmation: "I deserve restful, rejuvenating sleep.",
    completed: false
  },
  {
    day: 27,
    title: "Learning Journey",
    description: "Spend 20 minutes learning something new that interests you.",
    affirmation: "My mind deserves to be stimulated and expanded.",
    completed: false
  },
  {
    day: 28,
    title: "Acts of Kindness",
    description: "Perform three small acts of kindness for yourself today.",
    affirmation: "I deserve my own kindness and generosity.",
    completed: false
  },
  {
    day: 29,
    title: "Future Self",
    description: "Write a letter to your future self, expressing hopes and compassion.",
    affirmation: "I look forward to my journey with hope and self-compassion.",
    completed: false
  },
  {
    day: 30,
    title: "Celebration",
    description: "Celebrate your 30-day journey and reflect on your growth.",
    affirmation: "I celebrate my commitment to my own well-being and growth.",
    completed: false
  }
];

const SelfLove: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    const savedChallenges = localStorage.getItem('selfLoveChallenges');
    return savedChallenges ? JSON.parse(savedChallenges) : generateChallenges();
  });
  
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [completedCount, setCompletedCount] = useState<number>(0);
  
  // Load challenges from localStorage
  useEffect(() => {
    const savedChallenges = localStorage.getItem('selfLoveChallenges');
    if (savedChallenges) {
      setChallenges(JSON.parse(savedChallenges));
    }
  }, []);
  
  // Save challenges to localStorage and update count whenever they change
  useEffect(() => {
    localStorage.setItem('selfLoveChallenges', JSON.stringify(challenges));
    const completed = challenges.filter(challenge => challenge.completed).length;
    setCompletedCount(completed);
  }, [challenges]);
  
  const toggleComplete = (day: number) => {
    setChallenges(challenges.map(challenge => 
      challenge.day === day 
        ? { ...challenge, completed: !challenge.completed } 
        : challenge
    ));
    
    // Show a toast for completion
    const challenge = challenges.find(c => c.day === day);
    if (challenge && !challenge.completed) {
      toast({
        title: `Day ${day} completed!`,
        description: challenge.affirmation,
      });
    }
  };
  
  const resetChallenge = () => {
    if (window.confirm('Are you sure you want to reset the entire challenge?')) {
      setChallenges(generateChallenges());
      toast({
        title: "Challenge reset",
        description: "Your 30-day Self-Love Challenge has been reset.",
      });
    }
  };
  
  const downloadCalendar = () => {
    const header = "Self-Love Challenge Calendar\n\n";
    const content = challenges.map(c => 
      `DAY ${c.day}: ${c.title}\n${c.description}\nAffirmation: "${c.affirmation}"\n${c.completed ? '[COMPLETED]' : '[PENDING]'}\n\n`
    ).join('');
    
    const blob = new Blob([header + content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Self-Love-Challenge.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Calendar downloaded",
      description: "Your Self-Love Challenge calendar has been downloaded.",
    });
  };
  
  const selectedChallenge = challenges.find(c => c.day === selectedDay) || challenges[0];
  const completionPercentage = (completedCount / challenges.length) * 100;
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link to="/tools">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Tools
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">30-Day Self-Love Challenge</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2 text-primary" />
                Your Progress
              </CardTitle>
              <CardDescription>
                {completedCount} of 30 days completed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={completionPercentage} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>Day 1</span>
                  <span>Day 30</span>
                </div>
                
                <div className="flex justify-between mt-4">
                  <Button variant="outline" size="sm" onClick={resetChallenge}>
                    Reset Challenge
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadCalendar}>
                    <Download className="h-4 w-4 mr-1" /> Calendar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Challenge Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Start at day 1 and progress in order</li>
                <li>• You can pause and resume anytime</li>
                <li>• Write down your reflections after each activity</li>
                <li>• Repeat your daily affirmation multiple times</li>
                <li>• Be patient and kind with yourself</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Day {selectedChallenge.day}: {selectedChallenge.title}</CardTitle>
                <Badge variant={selectedChallenge.completed ? "default" : "outline"}>
                  {selectedChallenge.completed ? "Completed" : "Pending"}
                </Badge>
              </div>
              <CardDescription>
                Today's self-love activity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/30 p-4 rounded-md">
                <h3 className="font-medium mb-2">Activity:</h3>
                <p>{selectedChallenge.description}</p>
              </div>
              
              <div className="bg-primary/10 p-4 rounded-md border border-primary/20">
                <h3 className="font-medium mb-2">Today's Affirmation:</h3>
                <p className="italic">"{selectedChallenge.affirmation}"</p>
              </div>
              
              <div className="pt-2">
                <h3 className="font-medium mb-3">Your Notes (optional):</h3>
                <textarea 
                  className="w-full p-3 border border-border rounded-md bg-background min-h-[100px]"
                  placeholder="Reflect on today's activity here..."
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                variant={selectedChallenge.completed ? "outline" : "default"}
                onClick={() => toggleComplete(selectedChallenge.day)}
              >
                {selectedChallenge.completed ? (
                  <>Mark as Incomplete</>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Mark as Complete
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Challenge Calendar</CardTitle>
              <CardDescription>
                Click on a day to view details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-2">
                {challenges.map(challenge => (
                  <Button
                    key={challenge.day}
                    variant={challenge.completed ? "default" : selectedDay === challenge.day ? "secondary" : "outline"}
                    size="sm"
                    className={`h-12 w-12 p-0 ${challenge.completed ? 'bg-primary/80' : ''}`}
                    onClick={() => setSelectedDay(challenge.day)}
                  >
                    {challenge.day}
                    {challenge.completed && <Check className="h-3 w-3 absolute bottom-1 right-1" />}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SelfLove;
