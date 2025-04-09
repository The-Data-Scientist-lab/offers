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
  contactMethod: z.enum(['telegram', 'whatsapp']),
  contactValue: z.string().min(3, { message: 'Please enter a valid contact info' })
});

type ContactFormValues = z.infer<typeof contactSchema>;

const PaymentVerification = () => {
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [countDown, setCountDown] = useState(0);
  const [verificationFailed, setVerificationFailed] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      contactMethod: 'telegram',
      contactValue: ''
    }
  });

  useEffect(() => {
    if (countDown > 0) {
      const timer = setTimeout(() => {
        setCountDown(countDown - 1);
        
        // Auto-complete verification near the end
        if (countDown === 2) {
          setIsVerifying(false);
          
          // Randomly decide between success and "trouble" to demonstrate both paths
          const isSuccess = Math.random() > 0.5;
          
          if (isSuccess) {
            setPaymentVerified(true);
            toast({
              title: "Payment Verified Successfully!",
              description: "You will receive your video call shortly.",
            });
          } else {
            setVerificationFailed(true);
            toast({
              title: "Verification Issue",
              description: "We're having trouble confirming your payment.",
              variant: "destructive"
            });
          }
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [countDown, toast]);

  const onSubmit = (data: ContactFormValues) => {
    console.log('Contact Method:', data.contactMethod);
    console.log('Contact Value:', data.contactValue);
    
    toast({
      title: "Contact Information Saved",
      description: `We'll contact you via ${data.contactMethod} for your video call.`,
    });
  };

  const handlePaymentConfirmation = () => {
    setIsVerifying(true);
    setCountDown(25); // Set countdown to 25 seconds
    setVerificationFailed(false); // Reset failed state if they try again
    
    toast({
      title: "Verifying Payment",
      description: "Please wait while we verify your payment...",
    });
  };

  return (
    <section className="w-full py-16 flex flex-col items-center justify-center px-4">
      <div className="container max-w-3xl mx-auto">
        <div className="bg-white/50 backdrop-blur-md rounded-3xl p-8 shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            {paymentVerified ? "Payment Verified Successfully!" : verificationFailed ? "Payment Verification Issue" : "Payment Verification"}
          </h2>
          
          {!paymentVerified && !isVerifying && !verificationFailed ? (
            <div className="flex flex-col items-center space-y-6">
              <p className="text-gray-700 text-center">
                After scanning the QR code and making the payment, please click the button below to verify your payment.
              </p>
              
              <Button 
                className="bg-gradient-to-r from-offer-pink to-offer-purple text-white px-8 py-6 text-lg"
                onClick={handlePaymentConfirmation}
              >
                I Have Made the Payment
              </Button>
            </div>
          ) : isVerifying ? (
            <div className="flex flex-col items-center space-y-6">
              <Loader2 className="h-12 w-12 text-offer-purple animate-spin" />
              <p className="text-gray-700 text-center">
                Verifying your payment... Please wait.
              </p>
              <p className="text-xl font-bold text-offer-pink">{countDown} seconds</p>
            </div>
          ) : verificationFailed ? (
            <div className="flex flex-col items-center space-y-6">
              <Alert variant="destructive" className="bg-red-50 border-red-200 mb-6">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <AlertTitle className="text-red-700">Payment Verification Issue</AlertTitle>
                <AlertDescription className="text-red-600">
                  We're having trouble verifying your payment. If you have made the payment and haven't received your service,
                  please contact us directly.
                </AlertDescription>
              </Alert>

              <div className="p-6 border border-gray-200 rounded-xl bg-white/60 text-center">
                <h3 className="text-lg font-medium mb-2">Need assistance?</h3>
                <p className="mb-4">Contact us on Telegram for immediate help:</p>
                <a 
                  href="https://t.me/Shanaya_Service" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-700 font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.5 2l-19 19"></path>
                    <path d="M21.5 15.5v-13.5h-13.5"></path>
                  </svg>
                  Click here to contact on Telegram
                </a>
              </div>

              <Button 
                className="mt-4 bg-gray-800 hover:bg-gray-900 text-white"
                onClick={handlePaymentConfirmation}
              >
                Try Verifying Again
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-6">
              <CheckCircle className="h-16 w-16 text-green-500 animate-pulse-soft" />
              <p className="text-gray-700 text-center">
                Your payment has been verified! Please provide your contact details below to receive your video call.
              </p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-md">
                  <FormField
                    control={form.control}
                    name="contactMethod"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>How would you like to receive your video call?</FormLabel>
                        <FormControl>
                          <RadioGroup 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="telegram" id="telegram" />
                              <Label htmlFor="telegram">Telegram</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="whatsapp" id="whatsapp" />
                              <Label htmlFor="whatsapp">WhatsApp</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="contactValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {form.watch("contactMethod") === "telegram" ? "Your Telegram Username" : "Your WhatsApp Number"}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={form.watch("contactMethod") === "telegram" ? "@username" : "+91XXXXXXXXXX"} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full bg-gradient-to-r from-offer-pink to-offer-purple">
                    Submit Contact Details
                  </Button>
                </form>
              </Form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PaymentVerification;
