
import React from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-border py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-[1.75rem] font-poppins font-semibold tracking-wide text-[#2C2C2C] dark:text-[#F0F0F0]">Zenvy</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-md">
              Own your Zen - A safe space for your mental health journey. Self-guided tools for everyone, with no login required.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-semibold tracking-wider uppercase mb-3">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-sm hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/assessment" className="text-sm hover:text-primary transition-colors">
                    Take Assessment
                  </Link>
                </li>
                <li>
                  <Link to="/library" className="text-sm hover:text-primary transition-colors">
                    Self-Help Library
                  </Link>
                </li>
                <li>
                  <Link to="/tools" className="text-sm hover:text-primary transition-colors">
                    Wellness Tools
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold tracking-wider uppercase mb-3">Tools</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/tools/journal" className="text-sm hover:text-primary transition-colors">
                    Guided Journal
                  </Link>
                </li>
                <li>
                  <Link to="/tools/breathing" className="text-sm hover:text-primary transition-colors">
                    Breathing Exercises
                  </Link>
                </li>
                <li>
                  <Link to="/tools/self-love" className="text-sm hover:text-primary transition-colors">
                    Self-Love Challenge
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1 mt-6 md:mt-0">
              <h4 className="text-sm font-semibold tracking-wider uppercase mb-3">Important Notice</h4>
              <p className="text-xs text-muted-foreground">
                This website is not a substitute for professional mental health treatment. 
                If you're in crisis, please contact emergency services or a mental health professional immediately.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border flex flex-col items-center">
          <p className="text-sm text-muted-foreground">
            <Brain size={14} className="inline text-primary" /> Own your Zen
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            © {new Date().getFullYear()} Zenvy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
