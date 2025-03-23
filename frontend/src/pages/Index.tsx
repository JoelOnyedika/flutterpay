
import React from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import ExchangeRates from '@/components/ExchangeRates';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar toggleTheme={() => {}} isDarkMode={document.documentElement.classList.contains('dark')} />
      <HeroSection />
      <FeaturesSection />
      <ExchangeRates />
      <HowItWorks />
      <Testimonials />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
