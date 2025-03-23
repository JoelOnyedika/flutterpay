
import React, { useState, useEffect, useRef } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Adebayo Johnson',
    location: 'Lagos, Nigeria',
    text: 'This app has completely changed how I handle my monthly bills. The crypto payment option is a game-changer for me as I can easily use my USDT whenever Naira is scarce.',
    rating: 5,
    avatar: 'AJ',
  },
  {
    id: 2,
    name: 'Kwame Mensah',
    location: 'Accra, Ghana',
    text: 'I\'ve tried many recharge apps but none come close to the speed and reliability of this one. Their discounted data bundles save me money every month!',
    rating: 5,
    avatar: 'KM',
  },
  {
    id: 3,
    name: 'Chioma Okafor',
    location: 'Abuja, Nigeria',
    text: 'The referral program is amazing! I\'ve earned enough credits to pay for my electricity bills just by inviting my colleagues to use the app.',
    rating: 4,
    avatar: 'CO',
  },
  {
    id: 4,
    name: 'David Asante',
    location: 'Kumasi, Ghana',
    text: 'This app helped me manage payments for my entire family\'s mobile services. The interface is intuitive and transactions are lightning-fast.',
    rating: 5,
    avatar: 'DA',
  },
  {
    id: 5,
    name: 'Fatima Bello',
    location: 'Kano, Nigeria',
    text: 'As a business owner, managing multiple lines used to be a hassle. Now I just load my wallet once and handle all recharges effortlessly.',
    rating: 5,
    avatar: 'FB',
  },
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const goToSlide = (index: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const nextSlide = () => {
    const newIndex = (activeIndex + 1) % testimonials.length;
    goToSlide(newIndex);
  };
  
  const prevSlide = () => {
    const newIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
    goToSlide(newIndex);
  };
  
  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeIndex]);
  
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptLTJ6TTE3IDE4aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium inline-block mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            What Our Users Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of satisfied users who trust our platform for their daily transactions.
          </p>
        </div>
        
        <div className="relative">
          {/* Main slider */}
          <div 
            ref={sliderRef}
            className="relative overflow-hidden min-h-[400px] max-w-4xl mx-auto"
          >
            <div className="absolute inset-0 flex">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  ref={(el) => (slidesRef.current[index] = el)}
                  className={`w-full min-w-full transition-all duration-500 ease-out flex flex-col md:flex-row items-center ${
                    index === activeIndex 
                      ? 'opacity-100 translate-x-0' 
                      : index < activeIndex 
                        ? 'opacity-0 -translate-x-full' 
                        : 'opacity-0 translate-x-full'
                  }`}
                >
                  {/* Quote symbol */}
                  <div className="bg-gradient-to-br from-primary to-secondary p-6 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 md:mb-0 md:mr-8 shrink-0">
                    <Quote className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`} 
                        />
                      ))}
                    </div>
                    
                    <blockquote className="text-xl font-medium mb-6">"{testimonial.text}"</blockquote>
                    
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-semibold mr-4">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation controls */}
          <div className="flex justify-center mt-10 items-center">
            <Button 
              variant="outline" 
              size="icon" 
              className="mr-4 rounded-full" 
              onClick={prevSlide}
              disabled={isAnimating}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'bg-primary w-10' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="ml-4 rounded-full" 
              onClick={nextSlide}
              disabled={isAnimating}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
