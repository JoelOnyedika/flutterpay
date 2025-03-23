
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRightLeft, TrendingUp, TrendingDown } from 'lucide-react';

interface Rate {
  name: string;
  code: string;
  value: number;
  change: number;
}

const ExchangeRates: React.FC = () => {
  const [rates, setRates] = useState<Rate[]>([
    { name: 'Bitcoin', code: 'BTC/NGN', value: 24586000, change: 1.2 },
    { name: 'Tether', code: 'USDT/NGN', value: 1520, change: 0.5 },
    { name: 'BinanceUSD', code: 'BUSD/NGN', value: 1518, change: -0.3 },
    { name: 'Ethereum', code: 'ETH/NGN', value: 1450000, change: 2.1 },
    { name: 'Bitcoin', code: 'BTC/GHS', value: 1250000, change: 1.5 },
    { name: 'Tether', code: 'USDT/GHS', value: 77.5, change: 0.2 },
  ]);

  const sectionRef = useRef<HTMLDivElement>(null);
  const rateRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRates(prevRates => 
        prevRates.map(rate => ({
          ...rate,
          value: rate.value * (1 + (Math.random() * 0.006 - 0.003)),
          change: rate.change + (Math.random() * 0.4 - 0.2)
        }))
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Animation observer
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
    
    rateRefs.current.forEach((ref, index) => {
      if (ref) {
        setTimeout(() => {
          ref.classList.add('animate-slide-up');
          ref.classList.remove('opacity-0', 'translate-y-8');
        }, 300 + index * 100);
      }
    });
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-muted/30 opacity-0">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full px-4 py-2 mb-4 bg-primary/10 text-primary">
            <ArrowRightLeft className="mr-2 h-4 w-4" />
            <p className="text-sm font-medium">Live Exchange Rates</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Real-Time Crypto Exchange Rates
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get the latest exchange rates for your transactions with real-time updates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rates.map((rate, index) => (
            <div 
              key={index} 
              ref={(el) => (rateRefs.current[index] = el)}
              className="premium-card p-6 opacity-0 translate-y-8 group cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{rate.name}</h3>
                  <p className="text-muted-foreground text-sm">{rate.code}</p>
                </div>
                {rate.change > 0 ? (
                  <div className="flex items-center text-green-500">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>+{rate.change.toFixed(2)}%</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-500">
                    <TrendingDown className="h-4 w-4 mr-1" />
                    <span>{rate.change.toFixed(2)}%</span>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <h4 className="text-2xl font-bold">
                  {rate.code.includes('NGN')
                    ? '₦' + rate.value.toLocaleString(undefined, { maximumFractionDigits: 2 })
                    : '₵' + rate.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </h4>
              </div>
              <div className="mt-3 w-full h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" 
                  style={{ width: `${Math.abs(rate.change) * 10}%` }}
                ></div>
              </div>
              
              {/* Hover effect addition */}
              <div className="mt-4 h-0 overflow-hidden group-hover:h-auto group-hover:mt-4 transition-all duration-300">
                <div className="pt-3 border-t border-border">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>24h Volume</span>
                    <span>$1,234,567</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>24h High</span>
                    <span className="text-green-500">+2.45%</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>24h Low</span>
                    <span className="text-red-500">-1.23%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExchangeRates;
