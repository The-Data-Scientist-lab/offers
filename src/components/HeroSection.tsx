import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

const HeroSection = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.classList.add('opacity-100', 'translate-y-0');
    }
  }, []);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center px-4">
      <div className="container max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Left side - Text */}
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter offer-text-gradient">
              Exclusive Video Call Offer
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 max-w-prose">
              Book your exclusive video call now! Special offers ending in 10 hours - don't miss out on this unique opportunity!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#pricing" className="px-8 py-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 glow-effect text-center">
                View Packages
              </a>
            </div>
          </div>
          
          {/* Right side - Image */}
          <div className="flex-1 mt-10 md:mt-0">
            <Card className="overflow-hidden rounded-2xl shadow-2xl border-0 glass-effect p-2 transform rotate-1 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-transparent to-indigo-500/20 rounded-2xl"></div>
              <img 
                ref={imageRef}
                src="/lovable-uploads/53fa6ff4-f9a2-4cac-ba01-15b2de4858b7.png" 
                alt="Professional Model" 
                className="w-full h-full object-cover rounded-xl transform opacity-0 -translate-y-4 transition-all duration-700 ease-out"
              />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
