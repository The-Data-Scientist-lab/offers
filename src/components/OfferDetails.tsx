
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Clock, Video, Heart, Star, MessageCircle } from 'lucide-react';

const OfferDetails = () => {
  const navigate = useNavigate();
  
  const handleSelectPackage = (planId: string) => {
    navigate(`/payment?plan=${planId}`);
  };

  return (
    <section className="w-full py-16 flex flex-col items-center justify-center px-4">
      <div className="container max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center offer-text-gradient">
          What You'll Get
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerFeatures.map((feature, index) => (
            <Card key={index} className="glass-effect p-6 flex flex-col items-center text-center space-y-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="p-3 rounded-full bg-gradient-to-r from-offer-pink to-offer-purple text-white">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </Card>
          ))}
        </div>
        
        <div className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center offer-text-gradient">
            Choose Your Package
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Basic Plan */}
            <Card className="glass-effect p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex flex-col h-full">
                <div className="mb-4 text-center">
                  <span className="bg-offer-light-pink text-offer-pink px-3 py-1 rounded-full text-sm font-medium">
                    BASIC
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold mb-2 text-center">₹450</h3>
                <p className="text-gray-600 mb-6 text-center">30 Minutes Video Call</p>
                
                <div className="flex-grow space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-offer-pink" />
                    <p className="text-gray-700">30 Minutes private video call</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Video className="w-5 h-5 text-offer-pink" />
                    <p className="text-gray-700">Model will wear a Black Saree</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-offer-pink" />
                    <p className="text-gray-700">HD video quality</p>
                  </div>
                </div>
                
                <button 
                  className="bg-gradient-to-r from-offer-pink to-offer-accent text-white py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300"
                  onClick={() => handleSelectPackage('basic')}
                >
                  Get Started for ₹450
                </button>
              </div>
            </Card>
            
            {/* Premium Plan */}
            <Card className="glass-effect p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-offer-accent text-white px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              <div className="flex flex-col h-full">
                <div className="mb-4 text-center">
                  <span className="bg-offer-light-purple text-offer-purple px-3 py-1 rounded-full text-sm font-medium">
                    PREMIUM
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold mb-2 text-center">₹540</h3>
                <p className="text-gray-600 mb-6 text-center">1 Hour Video Call</p>
                
                <div className="flex-grow space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-offer-purple" />
                    <p className="text-gray-700">Full 1 hour private video call</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Video className="w-5 h-5 text-offer-purple" />
                    <p className="text-gray-700">Model will wear your choice of dress</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-offer-purple" />
                    <p className="text-gray-700">HD video with priority scheduling</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-offer-purple" />
                    <p className="text-gray-700">Exclusive conversation topics</p>
                  </div>
                </div>
                
                <button 
                  className="bg-gradient-to-r from-offer-accent to-offer-purple text-white py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300"
                  onClick={() => handleSelectPackage('premium')}
                >
                  Get Started for ₹540
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

const offerFeatures = [
  {
    title: "Private Video Call",
    description: "Enjoy a personalized video call session with our professional model.",
    icon: <Clock className="w-6 h-6" />
  },
  {
    title: "HD Video Quality",
    description: "Experience crystal clear HD video and audio quality for the best possible interaction.",
    icon: <Video className="w-6 h-6" />
  },
  {
    title: "Personal Attention",
    description: "Get undivided attention and engage in meaningful conversation during your call.",
    icon: <Heart className="w-6 h-6" />
  },
  {
    title: "Flexible Scheduling",
    description: "Choose a time that works best for your schedule within our available time slots.",
    icon: <Clock className="w-6 h-6" />
  },
  {
    title: "Premium Experience",
    description: "Enjoy a premium video call experience with our highly-rated professional model.",
    icon: <Star className="w-6 h-6" />
  },
  {
    title: "Private Messaging",
    description: "Access to private messaging before and after your scheduled video call.",
    icon: <MessageCircle className="w-6 h-6" />
  }
];

export default OfferDetails;
