
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Clock, Sparkles, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PricingPlans = () => {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const selectPlan = (planId: string) => {
    setSelectedPlan(planId);
    toast({
      title: "Package Selected",
      description: `You selected the ${planId === 'basic' ? '₹450 Basic' : '₹540 Premium'} package`,
    });
    
    // Navigate to payment page with selected plan
    navigate(`/payment?plan=${planId}`);
  };

  return (
    <section id="pricing" className="w-full py-16 flex flex-col items-center justify-center px-4">
      <div className="container max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center offer-text-gradient">
          Choose Your Package
        </h2>
        <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
          Select the perfect video call package that suits your preferences
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Basic Plan */}
          <Card className={`glass-effect p-6 hover:shadow-xl transition-all duration-300 ${selectedPlan === 'basic' ? 'ring-2 ring-indigo-500' : ''}`}>
            <div className="flex flex-col h-full">
              <div className="mb-4 text-center">
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                  BASIC
                </span>
              </div>
              
              <h3 className="text-2xl font-bold mb-2 text-center">₹450</h3>
              <p className="text-gray-600 mb-6 text-center">30 Minutes Video Call</p>
              
              <div className="flex-grow space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">30 Minutes private video call</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Model will wear a Black Saree</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">HD video quality</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Choose your preferred time</p>
                </div>
              </div>
              
              <Button 
                className="bg-indigo-600 hover:bg-indigo-700 w-full"
                onClick={() => selectPlan('basic')}
              >
                <CreditCard className="mr-2 h-4 w-4" /> Select This Package
              </Button>
            </div>
          </Card>
          
          {/* Premium Plan */}
          <Card className={`glass-effect p-6 hover:shadow-xl transition-all duration-300 ${selectedPlan === 'premium' ? 'ring-2 ring-purple-500' : ''}`}>
            <div className="flex flex-col h-full">
              <div className="mb-4 text-center">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                  PREMIUM
                </span>
              </div>
              
              <h3 className="text-2xl font-bold mb-2 text-center">₹540</h3>
              <p className="text-gray-600 mb-6 text-center">1 Hour Video Call</p>
              
              <div className="flex-grow space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Full 1 hour private video call</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Model will wear your choice of dress</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">HD video quality with priority support</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Priority scheduling</p>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Exclusive conversation topics</p>
                </div>
              </div>
              
              <Button 
                className="bg-purple-600 hover:bg-purple-700 w-full"
                onClick={() => selectPlan('premium')}
              >
                <CreditCard className="mr-2 h-4 w-4" /> Select This Package
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
