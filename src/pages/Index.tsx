
import { useEffect } from 'react';
import AnimatedGradientBg from '@/components/AnimatedGradientBg';
import HeroSection from '@/components/HeroSection';
import PricingPlans from '@/components/PricingPlans';

const Index = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <AnimatedGradientBg>
      <main className="flex min-h-screen flex-col items-center">
        <HeroSection />
        <PricingPlans />
        
        <footer className="w-full py-10 text-center text-gray-500">
          <div className="container mx-auto px-4">
            <p className="mb-4">© 2025 Special Video Call Services. All rights reserved.</p>
            <div className="flex justify-center gap-6">
              <a href="#" className="hover:text-gray-700 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Contact Us</a>
            </div>
          </div>
        </footer>
      </main>
    </AnimatedGradientBg>
  );
};

export default Index;
