
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AnimatedGradientBg from '@/components/AnimatedGradientBg';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import PaymentForm from '@/components/PaymentForm';
import { Card } from '@/components/ui/card';

const Payment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const planId = searchParams.get('plan');
  const [step, setStep] = useState<'contact' | 'qrcode' | 'verification'>('contact');
  const [contactInfo, setContactInfo] = useState<{
    method: 'telegram' | 'whatsapp';
    value: string;
  } | null>(null);
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Show toast based on selected plan
    if (planId) {
      toast({
        title: "Payment Page",
        description: `Please complete payment for ${planId === 'basic' ? '₹450 Basic' : '₹540 Premium'} package`,
      });
    } else {
      // If no plan is selected, go back to home page
      navigate('/');
    }
  }, [planId, toast, navigate]);

  const handleContactSubmit = (data: {method: 'telegram' | 'whatsapp'; value: string}) => {
    setContactInfo(data);
    setStep('qrcode');
    toast({
      title: "Contact Information Saved",
      description: `You'll receive your video call on ${data.method === 'telegram' ? 'Telegram' : 'WhatsApp'}.`,
    });
  };

  const handleVerifyPayment = () => {
    setStep('verification');
  };

  return (
    <AnimatedGradientBg>
      <main className="flex min-h-screen flex-col items-center">
        <div className="w-full py-4 px-6">
          <Button 
            variant="ghost" 
            className="flex items-center gap-2"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Packages
          </Button>
        </div>
      
        <section className="w-full py-8 flex flex-col items-center justify-center px-4">
          <div className="container max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 offer-text-gradient">
                Complete Your Payment
              </h1>
              <p className="text-gray-700 text-xl">
                {planId === 'basic' 
                  ? 'Basic Package: ₹450 for 30 Minutes Video Call' 
                  : 'Premium Package: ₹540 for 1 Hour Video Call'}
              </p>
            </div>
            
            <Card className="glass-effect p-8 shadow-xl mb-12">
              <PaymentForm 
                step={step}
                planId={planId || 'basic'}
                onContactSubmit={handleContactSubmit}
                onVerifyPayment={handleVerifyPayment}
                contactInfo={contactInfo}
              />
            </Card>
          </div>
        </section>
        
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

export default Payment;
