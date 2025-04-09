
import React from 'react';

const AnimatedGradientBg = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-offer-light-pink via-offer-light-purple to-offer-peach animate-gradient-flow"></div>
        
        {/* Decorative circles */}
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-offer-pink opacity-10 blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-offer-purple opacity-10 blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-offer-accent opacity-10 blur-3xl animate-pulse-soft" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      {children}
    </div>
  );
};

export default AnimatedGradientBg;
