
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Heart, Brain, MessageCircle, Clipboard, ArrowRightLeft, Sparkles, LineChart, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const About: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">About Zenvy</h1>
      <p className="text-muted-foreground mb-8">
        Your private space for mental wellness and self-care
      </p>

      {/* Journey Flowchart Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Your Wellness Journey</h2>
        
        <div className="relative">
          {/* Desktop Flowchart */}
          <div className="hidden md:block">
            <div className="grid grid-cols-3 gap-6">
              {flowchartSteps.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        {step.icon}
                      </div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{step.description}</p>
                    </CardContent>
                  </Card>
                  
                  {/* Connector Arrow */}
                  {index < flowchartSteps.length - 1 && (
                    <div className="absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <ArrowRight className="text-primary h-6 w-6" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile Flowchart */}
          <div className="md:hidden">
            <div className="space-y-4">
              {flowchartSteps.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="border-l-4 border-l-primary">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          {step.icon}
                        </div>
                        <CardTitle className="text-lg">{step.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{step.description}</p>
                    </CardContent>
                  </Card>
                  
                  {/* Connector Arrow */}
                  {index < flowchartSteps.length - 1 && (
                    <div className="flex justify-center my-2">
                      <ArrowRightLeft className="text-primary h-5 w-5 rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Our Features</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow duration-300 hover:border-primary/50">
              <CardHeader className="pb-2">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription className="text-xs mt-1">{feature.subtitle}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Privacy and Ethics Section */}
      <section className="mb-16 bg-muted/30 p-6 rounded-lg border border-border">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Your Privacy Matters</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <p className="text-sm">No account or login required</p>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <p className="text-sm">All data stays on your device</p>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <p className="text-sm">No tracking or analytics</p>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <p className="text-sm">Open source and transparent</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Our Ethics</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Zenvy is designed as a self-help tool and not as a replacement for professional mental health care. We believe in:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
              <li>Accessibility to mental wellness tools for everyone</li>
              <li>Privacy-first approach to sensitive personal information</li>
              <li>Evidence-based techniques and practices</li>
              <li>Encouraging users to seek professional help when needed</li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="text-center bg-primary/10 p-8 rounded-lg border border-primary/20">
        <h2 className="text-2xl font-semibold mb-4">Ready to Begin Your Wellness Journey?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Start with our assessment to discover personalized tools and techniques for your mental wellbeing, or explore our tools directly.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/assessment">Take the Assessment</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/tools">Explore Tools</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link to="/tools/chatbot">Talk to Zen Companion</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

// Define the flowchart steps
const flowchartSteps = [
  {
    title: "Take Assessment",
    description: "Complete a brief mental wellness assessment to understand your needs better.",
    icon: <Clipboard className="h-6 w-6 text-primary" />,
  },
  {
    title: "Get Recommendations",
    description: "Receive personalized tool and exercise recommendations based on your assessment.",
    icon: <Sparkles className="h-6 w-6 text-primary" />,
  },
  {
    title: "Practice & Track",
    description: "Use our tools regularly and track your progress over time.",
    icon: <LineChart className="h-6 w-6 text-primary" />,
  },
];

// Define the features
const features = [
  {
    title: "Self-Assessment",
    subtitle: "Understand your mental state",
    description: "Take our comprehensive assessment to identify areas where you might need additional support or tools.",
    icon: <Clipboard className="h-5 w-5 text-primary" />,
  },
  {
    title: "Zen Companion",
    subtitle: "AI-powered support",
    description: "Chat with our AI companion for emotional support, guidance, and personalized wellness suggestions.",
    icon: <MessageCircle className="h-5 w-5 text-primary" />,
  },
  {
    title: "Breathing Exercises",
    subtitle: "Calm your mind",
    description: "Follow guided breathing exercises to reduce stress, anxiety and promote relaxation.",
    icon: <Brain className="h-5 w-5 text-primary" />,
  },
  {
    title: "Self-Love Challenge",
    subtitle: "Cultivate self-compassion",
    description: "Engage in our 30-day self-love challenge designed to boost self-esteem and promote self-compassion.",
    icon: <Heart className="h-5 w-5 text-primary" />,
  },
  {
    title: "Guided Journal",
    subtitle: "Express & reflect",
    description: "Use our guided journaling prompts to process emotions, track moods, and gain insights about yourself.",
    icon: <BookOpen className="h-5 w-5 text-primary" />,
  },
  {
    title: "Habit Tracker",
    subtitle: "Build healthy routines",
    description: "Create and monitor positive mental health habits with our simple tracking tool.",
    icon: <LineChart className="h-5 w-5 text-primary" />,
  },
];

export default About;
