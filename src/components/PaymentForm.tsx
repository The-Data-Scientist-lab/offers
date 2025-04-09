import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const contactSchema = z.object({
  method: z.enum(['telegram', 'whatsapp']),
  value: z.string().min(3, { message: 'Please enter a valid contact info' })
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface PaymentFormProps {
  step: 'contact' | 'qrcode' | 'verification';
  planId: string;
  onContactSubmit: (data: ContactFormValues) => void;
  onVerifyPayment: () => void;
  contactInfo: {
    method: 'telegram' | 'whatsapp';
    value: string;
  } | null;
}

const PaymentForm = ({ step, planId, onContactSubmit, onVerifyPayment, contactInfo }: PaymentFormProps) => {
  const [verificationCountdown, setVerificationCountdown] = useState(25);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [verificationFailed, setVerificationFailed] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      method: 'telegram',
      value: ''
    }
  });

  useEffect(() => {
    if (step === 'verification' && verificationCountdown > 0) {
      const timer = setTimeout(() => {
        setVerificationCountdown(verificationCountdown - 1);
        
        // When countdown ends, show verification failed
        if (verificationCountdown === 1) {
          setVerificationFailed(true);
          toast({
            title: "Verification Issue",
            description: "We're having trouble confirming your payment.",
            variant: "destructive"
          });
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [verificationCountdown, step, toast, contactInfo]);

  const handleSubmitContactInfo = (data: ContactFormValues) => {
    onContactSubmit(data);
  };

  const tryVerificationAgain = () => {
    setVerificationCountdown(25);
    setVerificationFailed(false);
  };

  if (step === 'contact') {
    return (
      <div className="flex flex-col items-center space-y-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Where would you like to receive your video call?</h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitContactInfo)} className="space-y-6 w-full max-w-md">
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Select contact method:</FormLabel>
                  <FormControl>
                    <RadioGroup 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-white/20 transition-colors">
                        <RadioGroupItem value="telegram" id="telegram" />
                        <Label htmlFor="telegram" className="cursor-pointer flex-1">Telegram</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-white/20 transition-colors">
                        <RadioGroupItem value="whatsapp" id="whatsapp" />
                        <Label htmlFor="whatsapp" className="cursor-pointer flex-1">WhatsApp</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {form.watch("method") === "telegram" ? "Your Telegram Username" : "Your WhatsApp Number"}
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={form.watch("method") === "telegram" ? "@username" : "+91XXXXXXXXXX"} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700">
              Continue to Payment
            </Button>
          </form>
        </Form>
      </div>
    );
  }

  if (step === 'qrcode') {
    return (
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Scan QR Code to Pay
          </h2>
          <p className="text-gray-700 mb-4">
            Use any UPI app to scan this QR code and make your payment of 
            {planId === 'basic' ? ' ₹450' : ' ₹540'}
          </p>
          <ul className="text-sm text-gray-600 space-y-2 mb-6">
            <li>1. Open any UPI app (Google Pay, PhonePe, Paytm, etc.)</li>
            <li>2. Scan the QR code shown here</li>
            <li>3. Verify the amount and recipient name</li>
            <li>4. Complete the payment</li>
            <li>5. Click "I Have Made the Payment" button below</li>
          </ul>
          
          <Button 
            className="w-full bg-violet-600 hover:bg-violet-700 text-white px-6 py-5 text-lg"
            onClick={onVerifyPayment}
          >
            I Have Made the Payment
          </Button>
        </div>
        
        <div className="p-3 bg-white rounded-xl shadow-md">
          <div className="bg-gradient-to-br from-violet-500 to-indigo-500 p-1 rounded-lg">
            <img 
              src="/lovable-uploads/cd4198d2-a7c6-4824-acef-b6c18a827ada.png" 
              alt="Payment QR Code" 
              className="w-64 h-64 object-contain rounded-lg bg-white"
            />
          </div>
        </div>
      </div>
    );
  }

  if (step === 'verification') {
    return (
      <div className="flex flex-col items-center space-y-6">
        <h2 className="text-2xl font-bold mb-4">
          {verificationComplete ? "Payment Verified Successfully!" : verificationFailed ? "Payment Verification Issue" : "Verifying Your Payment"}
        </h2>
        
        {!verificationComplete && !verificationFailed ? (
          <>
            <Loader2 className="h-12 w-12 text-violet-600 animate-spin" />
            <p className="text-gray-700 text-center">
              Please wait while we verify your payment...
            </p>
            <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-violet-600 h-2.5 rounded-full" 
                style={{ width: `${100 - (verificationCountdown / 25 * 100)}%` }}
              ></div>
            </div>
            <p className="text-xl font-bold text-violet-600">{verificationCountdown} seconds</p>
          </>
        ) : verificationFailed ? (
          <>
            <Alert variant="destructive" className="bg-red-50 border-red-200 mb-6">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <AlertTitle className="text-red-700">Payment Verification Issue</AlertTitle>
              <AlertDescription className="text-red-600">
                We couldn't process your order. If you have already paid, please contact us on Telegram with your payment screenshot.
              </AlertDescription>
            </Alert>
            
            <div className="p-6 border border-gray-200 rounded-xl bg-white/60 text-center">
              <h3 className="text-lg font-medium mb-2">Need assistance?</h3>
              <p className="mb-4">Contact us on Telegram for immediate help:</p>
              <a
                href="https://t.me/Shanaya_Service"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-800 font-medium mb-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2l-19 19"></path>
                  <path d="M21.5 15.5v-13.5h-13.5"></path>
                </svg>
                Contact on Telegram
              </a>
              
              <Button 
                className="w-full bg-gray-800 hover:bg-gray-900 text-white"
                onClick={tryVerificationAgain}
              >
                Try Verifying Again
              </Button>
            </div>
          </>
        ) : (
          <>
            <CheckCircle className="h-16 w-16 text-green-500 animate-pulse-soft" />
            <p className="text-gray-700 text-center">
              Your payment has been verified! You will receive your video call on {contactInfo?.method === 'telegram' ? 'Telegram' : 'WhatsApp'} shortly.
            </p>
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg text-center mt-4">
              <p className="font-medium text-purple-700">
                We have your {contactInfo?.method === 'telegram' ? 'Telegram username' : 'WhatsApp number'}:
              </p>
              <p className="text-lg font-bold text-purple-900 mt-1">
                {contactInfo?.value}
              </p>
              <p className="text-sm text-purple-600 mt-3">
                Our model will contact you soon for your {planId === 'basic' ? '30 minutes' : '1 hour'} video call
              </p>
            </div>
            <Button
              className="bg-violet-600 hover:bg-violet-700"
              onClick={() => window.location.href = '/'}
            >
              Return to Home
            </Button>
          </>
        )}
      </div>
    );
  }

  return null;
};

export default PaymentForm;
