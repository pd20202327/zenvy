
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { QuoteProvider } from "@/contexts/QuoteContext";
import { ChatbotProvider } from "@/contexts/ChatbotContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import Home from "@/pages/Home";
import Assessment from "@/pages/Assessment";
import Tools from "@/pages/Tools";
import Journal from "@/pages/tools/Journal";
import Breathing from "@/pages/tools/Breathing";
import SelfLove from "@/pages/tools/SelfLove";
import Habits from "@/pages/tools/Habits";
import Chatbot from "@/pages/tools/Chatbot";
import NotFound from "@/pages/NotFound";
import { useTheme } from "@/contexts/ThemeContext";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  
  React.useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <QuoteProvider>
          <ChatbotProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              {isLoading ? (
                <LoadingScreen />
              ) : (
                <BrowserRouter>
                  <AppContent />
                </BrowserRouter>
              )}
            </TooltipProvider>
          </ChatbotProvider>
        </QuoteProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const AppContent = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/journal" element={<Journal />} />
          <Route path="/tools/breathing" element={<Breathing />} />
          <Route path="/tools/self-love" element={<SelfLove />} />
          <Route path="/tools/habits" element={<Habits />} />
          <Route path="/tools/chatbot" element={<Chatbot />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
