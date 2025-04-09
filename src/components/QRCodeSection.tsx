
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const QRCodeSection = () => {
  const navigate = useNavigate();
  
  const goToPayment = () => {
    navigate('/payment');
  };
  
  return (
    <section className="w-full py-16 flex flex-col items-center justify-center px-4">
      <div className="container max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 bg-white/50 backdrop-blur-md rounded-3xl p-8 shadow-xl">
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold offer-text-gradient">
              Quick Payment Option
            </h2>
            <p className="text-gray-700">
              Scan this QR code with your smartphone camera to instantly access your exclusive video call booking page.
            </p>
            <div className="bg-gradient-to-br from-offer-pink to-offer-purple p-0.5 rounded-xl inline-block animate-float">
              <Card className="p-2 bg-white">
                <img 
                  src="/lovable-uploads/cd4198d2-a7c6-4824-acef-b6c18a827ada.png" 
                  alt="QR Code" 
                  className="w-48 h-48 object-contain rounded-lg"
                />
              </Card>
            </div>
          </div>
          
          <div className="flex-1 space-y-6">
            <h3 className="text-xl font-semibold">How It Works:</h3>
            <ol className="space-y-4 list-decimal list-inside text-gray-700">
              <li>Scan the QR code with your smartphone camera</li>
              <li>Choose your preferred package</li>
              <li>Make secure payment via UPI</li>
              <li>Click "I Have Made the Payment" button</li>
              <li>Enter your Telegram username or WhatsApp number</li>
              <li>Receive your video call at scheduled time</li>
            </ol>
            <Button 
              className="w-full bg-gradient-to-r from-offer-pink to-offer-purple hover:opacity-90"
              onClick={goToPayment}
            >
              View Payment Options
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QRCodeSection;
