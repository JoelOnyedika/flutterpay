
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection: React.FC = () => {
  const ctaRef = useRef<HTMLDivElement>(null);
  
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
    
    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }
    
    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current);
      }
    };
  }, []);
  
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-60"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      </div>
      
      <div 
        ref={ctaRef}
        className="max-w-7xl mx-auto opacity-0"
      >
        <div className="bg-card border border-border rounded-3xl p-8 md:p-16 shadow-xl overflow-hidden relative">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Experience <span className="text-primary">Fast</span> & <span className="text-secondary">Seamless</span> Transactions?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Join thousands of satisfied users who trust our platform for their daily recharge and bill payment needs.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center gap-6 mb-16">
              <Link to="/signup">
                <Button size="lg" className="h-14 px-8 rounded-md bg-primary hover:bg-primary/90 text-white text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-primary/30 hover:scale-105">
                  Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-md border-muted-foreground/30 hover:bg-muted/20 text-lg">
                  Contact Sales
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="bg-muted/30 rounded-xl p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">10K+</div>
                <div className="text-muted-foreground">Active Users</div>
              </div>
              <div className="bg-muted/30 rounded-xl p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">99.9%</div>
                <div className="text-muted-foreground">Success Rate</div>
              </div>
              <div className="bg-muted/30 rounded-xl p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">50K+</div>
                <div className="text-muted-foreground">Transactions</div>
              </div>
              <div className="bg-muted/30 rounded-xl p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">2</div>
                <div className="text-muted-foreground">Countries</div>
              </div>
            </div>
            
            <div className="mt-16 pt-16 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex items-start">
                  <div className="mr-4 bg-primary/10 rounded-full p-1">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Ultra-Fast Transactions</h3>
                    <p className="text-muted-foreground">Complete all payments in just seconds</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 bg-primary/10 rounded-full p-1">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Bank-Grade Security</h3>
                    <p className="text-muted-foreground">Your data and money are always safe</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 bg-primary/10 rounded-full p-1">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">24/7 Customer Support</h3>
                    <p className="text-muted-foreground">We're always here to help you</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
