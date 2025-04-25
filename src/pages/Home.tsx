
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clipboard, Lightbulb, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuote } from '@/contexts/QuoteContext';
import { useTheme } from '@/contexts/ThemeContext';

const Home: React.FC = () => {
  const { dailyQuote, refreshQuote } = useQuote();
  const { isDarkMode } = useTheme();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-[48px] md:text-[56px] lg:text-[64px] font-serif font-bold mb-6 leading-tight text-[#2E3B4E] dark:text-[#F5F5F5]">
            Begin Your Journey to 
            <span className="bg-gradient-to-r from-[#4A9D9F] to-[#F2BF47] bg-clip-text text-transparent"> Mental Wellness</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-[#5A5A5A] dark:text-[#CCCCCC] font-lora max-w-2xl mx-auto">
            A private, self-guided space to explore mental health tools, assessments and resources — no login required.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="font-medium">
              <Link to="/assessment">Start Your Self-Assessment</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-medium">
              <Link to="/tools">Explore Wellness Tools</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Daily Quote Section */}
      <section className="py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="quote-card">
            <blockquote className="text-lg font-quicksand italic mb-2 text-[#2C2C2C] dark:text-[#F0F0F0]">"{dailyQuote.text}"</blockquote>
            <p className="text-right font-medium font-lora text-[#4B4B4B] dark:text-[#B3B3B3]">— {dailyQuote.author}</p>
          </div>
          <div className="text-center mt-3">
            <Button variant="ghost" size="sm" onClick={refreshQuote}>
              New Quote
            </Button>
          </div>
        </div>
      </section>
      
      {/* Navigation Cards */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[28px] md:text-[32px] font-lora font-semibold mb-8 text-center text-[#333333] dark:text-[#EAEAEA]">Begin Your Wellness Journey</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Assessment Card */}
            <Card className="assessment-card">
              <CardHeader>
                <CardTitle className="flex items-center font-lora text-[20px] font-semibold text-[#2C2C2C] dark:text-[#F0F0F0]">
                  <Clipboard className="mr-2 h-5 w-5 text-[#4A9D9F] dark:text-[#A3DAF3]" />
                  Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#777777] dark:text-[#B0B0B0] mb-4 font-inter text-[16px] leading-[1.7]">
                  Take a comprehensive mental health assessment to guide your self-care journey.
                </p>
                <Button asChild variant="secondary" className="w-full">
                  <Link to="/assessment">
                    Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Tools Card */}
            <Card className="tool-card">
              <CardHeader>
                <CardTitle className="flex items-center font-lora text-[20px] font-semibold text-[#2C2C2C] dark:text-[#F0F0F0]">
                  <Lightbulb className="mr-2 h-5 w-5 text-[#4A9D9F] dark:text-[#A3DAF3]" />
                  Wellness Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#777777] dark:text-[#B0B0B0] mb-4 font-inter text-[16px] leading-[1.7]">
                  Interactive tools for breathing exercises, journaling, and relaxation.
                </p>
                <Button asChild variant="secondary" className="w-full">
                  <Link to="/tools">
                    Explore Tools <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Self-Love Challenge Card */}
            <Card className="resource-card">
              <CardHeader>
                <CardTitle className="flex items-center font-lora text-[20px] font-semibold text-[#2C2C2C] dark:text-[#F0F0F0]">
                  <Heart className="mr-2 h-5 w-5 text-[#4A9D9F] dark:text-[#A3DAF3]" />
                  Self-Love Challenge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#777777] dark:text-[#B0B0B0] mb-4 font-inter text-[16px] leading-[1.7]">
                  Join our 30-day challenge to build self-compassion and healthy habits.
                </p>
                <Button asChild variant="secondary" className="w-full">
                  <Link to="/tools/self-love">
                    Start Challenge <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-12 px-4 bg-[#9DC5A1]/10 dark:bg-[#D995A7]/10">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
          <h2 className="text-[28px] md:text-[32px] font-lora font-semibold mb-6 text-[#333333] dark:text-[#EAEAEA]">About Zenvy</h2>
          <div className="max-w-2xl space-y-4">
            <p className="font-inter text-[16px] leading-[1.7] text-[#4B4B4B] dark:text-[#CFCFCF]">
              Zenvy is a private, non-AI mental health resource hub designed to help you navigate your emotional wellbeing journey.
            </p>
            <p className="font-inter text-[16px] leading-[1.7] text-[#4B4B4B] dark:text-[#CFCFCF]">
              All tools and resources are freely available without requiring login or sharing personal data. Your privacy is our priority.
            </p>
            <p className="font-inter font-medium text-[#4A9D9F] dark:text-[#A3DAF3]">
              Remember: This site is not a replacement for professional mental health support.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
