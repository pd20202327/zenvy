import React, { createContext, useContext, useState, useEffect } from 'react';

// Sample quotes list
const quotes = [
  { text: "You don't have to control your thoughts. You just have to stop letting them control you.", author: "Dan Millman" },
  { text: "Self-care is not self-indulgence, it is self-preservation.", author: "Audre Lorde" },
  { text: "You are not your illness. You have an individual story to tell. You have a name, a history, a personality.", author: "Julian Seifter" },
  { text: "Mental health problems don't define who you are. They are something you experience.", author: "Unknown" },
  { text: "I am not afraid of storms, for I am learning how to sail my ship.", author: "Louisa May Alcott" },
  { text: "Recovery is not one and done. It is a lifelong journey that takes place one day, one step at a time.", author: "Unknown" },
  { text: "It's okay to not be okay as long as you are not giving up.", author: "Karen Salmansohn" },
  { text: "Sometimes the people around you won't understand your journey. They don't need to, it's not for them.", author: "Joubert Botha" },
  { text: "Just because no one else can heal or do your inner work for you doesn't mean you can, should, or need to do it alone.", author: "Lisa Olivera" },
  { text: "What mental health needs is more sunlight, more candor, and more unashamed conversation.", author: "Glenn Close" },
  { text: "The most beautiful people we have known are those who have known defeat, suffering, struggle, loss, and have found their way out of the depths.", author: "Elisabeth Kübler-Ross" },
  { text: "Your mental health is everything – prioritize it. Make the time like your life depends on it, because it does.", author: "Mel Robbins" }
];

type QuoteType = {
  text: string;
  author: string;
};

type QuoteContextType = {
  dailyQuote: QuoteType;
  refreshQuote: () => void;
};

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Function to get a random quote
  const getRandomQuote = (): QuoteType => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  const [dailyQuote, setDailyQuote] = useState<QuoteType>(() => {
    // Check if we have a stored quote and it's from today
    const storedQuote = localStorage.getItem('dailyQuote');
    const storedDate = localStorage.getItem('quoteDate');
    const today = new Date().toDateString();
    
    if (storedQuote && storedDate === today) {
      return JSON.parse(storedQuote);
    }
    
    // Otherwise get a new quote
    const newQuote = getRandomQuote();
    localStorage.setItem('dailyQuote', JSON.stringify(newQuote));
    localStorage.setItem('quoteDate', today);
    return newQuote;
  });

  // Function to manually refresh the quote
  const refreshQuote = () => {
    const newQuote = getRandomQuote();
    setDailyQuote(newQuote);
    localStorage.setItem('dailyQuote', JSON.stringify(newQuote));
    localStorage.setItem('quoteDate', new Date().toDateString());
  };

  return (
    <QuoteContext.Provider value={{ dailyQuote, refreshQuote }}>
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = (): QuoteContextType => {
  const context = useContext(QuoteContext);
  if (context === undefined) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
};
