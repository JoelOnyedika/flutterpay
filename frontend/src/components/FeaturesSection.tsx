
import React, { useEffect, useRef } from 'react';
import { 
  Smartphone, Zap, Wallet, Users, BadgePercent, 
  ShieldCheck, CreditCard, Timer, Globe, Headphones 
} from 'lucide-react';

const features = [
  {
    icon: <Smartphone className="h-10 w-10 text-primary" />,
    title: 'Instant Airtime & Data Purchase',
    description: 'Buy airtime and data instantly for all networks - MTN, Glo, Airtel, 9mobile.',
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: 'Pay Electricity & Utility Bills',
    description: 'Settle your bills quickly without stress or leaving your home.',
  },
  {
    icon: <Wallet className="h-10 w-10 text-primary" />,
    title: 'Multiple Payment Options',
    description: 'Fund wallet with cryptocurrency (USDT, BTC, BUSD) or local currency.',
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Referral Program',
    description: 'Earn rewards by inviting friends and family to use our platform.',
  },
  {
    icon: <BadgePercent className="h-10 w-10 text-primary" />,
    title: 'Discounted Rates',
    description: 'Enjoy special discounts on airtime, data and bill payments.',
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: 'Secure Transactions',
    description: 'Advanced security with two-factor authentication (2FA).',
  },
  {
    icon: <CreditCard className="h-10 w-10 text-primary" />,
    title: 'Virtual Card Integration',
    description: 'Access virtual cards for online payments around the world.',
  },
  {
    icon: <Timer className="h-10 w-10 text-primary" />,
    title: '24/7 Availability',
    description: 'Access our services anytime, day or night with zero downtime.',
  },
  {
    icon: <Globe className="h-10 w-10 text-primary" />,
    title: 'Multi-Country Support',
    description: 'Services available in Nigeria and Ghana with more countries coming.',
  },
  {
    icon: <Headphones className="h-10 w-10 text-primary" />,
    title: 'Dedicated Support',
    description: 'Get help when you need it from our friendly support team.',
  },
];

const FeaturesSection: React.FC = () => {
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    featureRefs.current.forEach((ref, index) => {
      if (ref) {
        const featureObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setTimeout(() => {
                  entry.target.classList.add('animate-scale-in');
                  entry.target.classList.remove('opacity-0', 'scale-95');
                }, index * 100);
              }
            });
          },
          { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );
        
        featureObserver.observe(ref);
        
        return () => {
          featureObserver.unobserve(ref);
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
    <section ref={sectionRef} className="py-24 px-6 bg-background relative overflow-hidden opacity-0">
      {/* Background accents */}
      <div className="absolute inset-0 dot-grid opacity-50 -z-10"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <span>Premium Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Everything You Need in One Place
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the convenience of managing all your recharge and bill payment needs with premium features designed for speed and reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              ref={(el) => (featureRefs.current[index] = el)}
              className="premium-card opacity-0 scale-95 px-6 py-8 transition-all duration-500 hover:-translate-y-2 group"
            >
              <div className="p-3 rounded-lg bg-primary/10 mb-6 w-max group-hover:bg-primary/20 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
