
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Moon, Sun, Phone, MessageSquare, Copy } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavbarProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ 
  toggleDarkMode, 
  isDarkMode 
}) => {
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const isMobile = useIsMobile();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const copyToClipboard = (number: string) => {
    navigator.clipboard.writeText(number);
    toast({
      description: `Phone number ${number} copied to clipboard`,
      duration: 2000,
    });
  };

  const showCrisisSupport = () => {
    toast({
      title: "Tele MANAS Mental Health Support",
      description: (
        <div className="space-y-3 mt-2">
          <p>Tele MANAS is a comprehensive mental health care service</p>
          <p>Dial the Toll-Free numbers below to get in touch with our Counsellor</p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-2">
              <Phone size={18} />
              <span>14416</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 hover:bg-muted"
              onClick={() => copyToClipboard('14416')}
            >
              <Copy size={16} />
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Phone size={18} />
              <span>1-800 891 4416</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 hover:bg-muted"
              onClick={() => copyToClipboard('1-800 891 4416')}
            >
              <Copy size={16} />
            </Button>
          </div>
        </div>
      ),
      duration: 10000,
    });
  };

  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-[1.75rem] font-poppins font-semibold tracking-wide text-[#2C2C2C] dark:text-[#F0F0F0]">Zenvy</span>
            </Link>
          </div>
          
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/10">Home</Link>
            <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/10">About</Link>
            <Link to="/assessment" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/10">Assessment</Link>
            <Link to="/tools" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/10">Wellness Tools</Link>
            <Link to="/tools/chatbot" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/10 flex items-center">
              <MessageSquare size={16} className="mr-1" />
              <span>AI Chat</span>
            </Link>
            <Button 
              variant="outline"
              size="icon" 
              onClick={toggleDarkMode} 
              className="ml-2"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            <Button 
              onClick={showCrisisSupport}
              variant="destructive"
              className="ml-2"
            >
              Need Immediate Help?
            </Button>
          </div>
          
          <div className="flex items-center md:hidden">
            <Button 
              variant="outline"
              size="icon" 
              onClick={toggleDarkMode} 
              className="mr-2"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleMobileMenu}
            >
              <Menu size={18} />
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t border-border">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10">Home</Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10">About</Link>
            <Link to="/assessment" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10">Assessment</Link>
            <Link to="/tools" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10">Wellness Tools</Link>
            <Link to="/tools/chatbot" className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10">
              <MessageSquare size={16} className="mr-2" />
              <span>AI Therapy Chat</span>
            </Link>
            <Button 
              onClick={showCrisisSupport}
              variant="destructive"
              className="w-full mt-2"
            >
              Need Immediate Help?
            </Button>
          </div>
        </div>
      )}

      {isMobile && window.location.pathname === '/tools/chatbot' && (
        <div className="fixed bottom-4 left-4 z-50">
          <Button 
            onClick={showCrisisSupport}
            className="crisis-button"
          >
            Crisis Support
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
