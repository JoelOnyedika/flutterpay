
import React, { useEffect, useRef } from 'react';
import { UserPlus, Wallet, CreditCard, CheckCircle } from 'lucide-react';

const steps = [
  {
    id: 1,
    icon: <UserPlus className="h-8 w-8 text-white" />,
    title: 'Create an Account',
    description: 'Sign up in less than 2 minutes with your email or phone number and set a secure password.'
  },
  {
    id: 2,
    icon: <Wallet className="h-8 w-8 text-white" />,
    title: 'Fund Your Wallet',
    description: 'Add funds using bank transfer, card payment, or cryptocurrency (BTC, USDT, BUSD).'
  },
  {
    id: 3,
    icon: <CreditCard className="h-8 w-8 text-white" />,
    title: 'Select Service',
    description: 'Choose the service you need - airtime, data bundle, electricity, TV subscription, etc.'
  },
  {
    id: 4,
    icon: <CheckCircle className="h-8 w-8 text-white" />,
    title: 'Complete Transaction',
    description: 'Enter the required details, confirm payment, and receive instant value in seconds.'
  }
];

const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    stepRefs.current.forEach((ref, index) => {
      if (ref) {
        const stepObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setTimeout(() => {
                  entry.target.classList.add('animate-slide-up');
                  entry.target.classList.remove('opacity-0', 'translate-y-10');
                }, 300 + index * 200);
              }
            });
          },
          { threshold: 0.1 }
        );
        
        stepObserver.observe(ref);
        
        return () => {
          stepObserver.unobserve(ref);
        };
      }
    });
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="py-24 px-6 relative overflow-hidden opacity-0">
      {/* Background elements */}
      <div className="absolute inset-0 dot-grid opacity-30 -z-10"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium inline-block mb-4">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get started in minutes with our simple process - fund, select, and complete your transaction.
          </p>
        </div>

        <div className="relative">
          {/* Timeline connector */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50 transform -translate-y-1/2 z-0"></div>
          
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                ref={(el) => (stepRefs.current[index] = el)}
                className="flex flex-col items-center text-center opacity-0 translate-y-10"
              >
                {/* Number indicator with pulse effect */}
                <div className="relative mb-12">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-6 relative">
                    {step.icon}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary animate-ping opacity-30"></div>
                  </div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-3xl font-bold text-primary/80">
                    {step.id}
                  </div>
                </div>
                
                {/* Step content */}
                <div className="premium-card p-6 w-full h-full transition-all duration-300 hover:-translate-y-2">
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
