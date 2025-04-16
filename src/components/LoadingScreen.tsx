
import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-primary/30 animate-spin border-t-primary"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
              <span className="text-primary font-bold">Z</span>
            </div>
          </div>
        </div>
        <p className="mt-4 text-lg font-medium text-foreground">Loading Zenvy...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
