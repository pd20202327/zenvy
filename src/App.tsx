
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { QuoteProvider } from "@/contexts/QuoteContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Assessment from "@/pages/Assessment";
import Tools from "@/pages/Tools";
import Journal from "@/pages/tools/Journal";
import Breathing from "@/pages/tools/Breathing";
import SelfLove from "@/pages/tools/SelfLove";
import Habits from "@/pages/tools/Habits";
import NotFound from "@/pages/NotFound";
import { useTheme } from "@/contexts/ThemeContext";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <QuoteProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </TooltipProvider>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
