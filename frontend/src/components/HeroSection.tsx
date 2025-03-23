
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Clock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Add intersection observer for content animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    // Add animation for feature boxes
    featureRefs.current.forEach((ref, index) => {
      if (ref) {
        setTimeout(() => {
          ref.classList.add('animate-slide-up');
          ref.classList.remove('opacity-0');
        }, 300 + index * 150);
      }
    });

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background dark:bg-gradient-to-br dark:from-background dark:to-background/80">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 animate-pulse" style={{ animationDuration: '8s' }}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        
        {/* Gradient circle accents */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-70"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-70"></div>
      </div>
      
      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32 opacity-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column: Main content */}
          <div className="text-left space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary backdrop-blur-sm border border-primary/20">
              <Zap className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Lightning Fast Payments</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="block">Recharge & Pay</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                In Seconds
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-xl">
              Purchase airtime, mobile data, pay utility bills instantly with Naira, 
              Ghana Cedis, or crypto - all in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/signup">
                <Button size="lg" className="h-14 px-8 rounded-lg bg-primary hover:bg-primary/90 text-white text-lg font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300">
                  Start Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/features">
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-lg text-lg transition-all duration-300">
                  Learn More
                </Button>
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              <div 
                ref={(el) => (featureRefs.current[0] = el)} 
                className="flex flex-col items-center p-4 rounded-xl bg-background border border-border shadow-sm opacity-0"
              >
                <div className="rounded-full bg-secondary/10 p-2 mb-2">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <p className="text-center font-medium">Fast & Secure</p>
              </div>
              
              <div 
                ref={(el) => (featureRefs.current[1] = el)} 
                className="flex flex-col items-center p-4 rounded-xl bg-background border border-border shadow-sm opacity-0"
              >
                <div className="rounded-full bg-primary/10 p-2 mb-2">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <p className="text-center font-medium">24/7 Access</p>
              </div>
              
              <div 
                ref={(el) => (featureRefs.current[2] = el)} 
                className="flex flex-col items-center p-4 rounded-xl bg-background border border-border shadow-sm opacity-0"
              >
                <div className="rounded-full bg-secondary/10 p-2 mb-2">
                  <Shield className="h-6 w-6 text-secondary" />
                </div>
                <p className="text-center font-medium">100% Protected</p>
              </div>
            </div>
          </div>
          
          {/* Right column: Visual representation */}
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              {/* Phone mockup */}
              <div className="premium-card w-72 h-[560px] rounded-[32px] border-4 border-border overflow-hidden shadow-2xl">
                {/* Phone UI mockup */}
                <div className="h-full w-full flex flex-col bg-gradient-to-b from-background to-muted p-4">
                  {/* Status bar */}
                  <div className="flex justify-between items-center">
                    <div className="text-xs font-medium">9:41</div>
                    <div className="h-4 w-32 bg-muted rounded-full"></div>
                  </div>
                  
                  {/* App interface mockup */}
                  <div className="flex-1 flex flex-col gap-4 mt-8">
                    <div className="h-12 w-full bg-primary/10 rounded-lg shimmer-effect"></div>
                    <div className="h-8 w-3/4 bg-muted rounded-lg shimmer-effect"></div>
                    <div className="mt-4 h-36 w-full bg-muted/70 rounded-xl shimmer-effect"></div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="h-24 bg-primary/10 rounded-lg shimmer-effect"></div>
                      <div className="h-24 bg-secondary/10 rounded-lg shimmer-effect"></div>
                      <div className="h-24 bg-secondary/10 rounded-lg shimmer-effect"></div>
                      <div className="h-24 bg-primary/10 rounded-lg shimmer-effect"></div>
                    </div>
                    
                    <div className="mt-4 h-12 w-full bg-primary rounded-lg shimmer-effect"></div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements around the phone */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/30 rounded-full filter blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-secondary/30 rounded-full filter blur-xl"></div>
              
              {/* Floating icons */}
              <div className="absolute top-10 -right-10 bg-card p-3 rounded-lg shadow-lg border border-border animate-float">
                <div className="h-6 w-20 bg-primary/20 rounded-md mb-2"></div>
                <div className="h-4 w-16 bg-muted rounded-md"></div>
              </div>
              
              <div className="absolute -left-12 top-1/3 bg-card p-3 rounded-lg shadow-lg border border-border animate-float" style={{ animationDelay: '1s' }}>
                <div className="h-6 w-16 bg-secondary/20 rounded-md mb-2"></div>
                <div className="h-4 w-12 bg-muted rounded-md"></div>
              </div>
              
              <div className="absolute -bottom-4 left-10 bg-card p-3 rounded-lg shadow-lg border border-border animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="h-6 w-24 bg-primary/20 rounded-md mb-2"></div>
                <div className="h-4 w-20 bg-muted rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
