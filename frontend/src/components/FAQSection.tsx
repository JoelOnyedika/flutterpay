
import React, { useEffect, useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: "How do I create an account?",
    answer: "Creating an account is simple. Click the 'Sign Up' button, enter your email address or phone number, create a password, and complete the verification process. The entire process takes less than 2 minutes."
  },
  {
    question: "What payment methods are supported?",
    answer: "We support multiple payment methods including bank transfers, card payments, and cryptocurrencies (BTC, USDT, BUSD). You can choose the most convenient option for you."
  },
  {
    question: "How quickly will my transaction be processed?",
    answer: "Most transactions are processed instantly. Once you confirm your payment, the recipient receives the value within seconds. For utility bills, the processing time may vary depending on the service provider."
  },
  {
    question: "Are there any transaction fees?",
    answer: "We charge minimal processing fees depending on the transaction type. All applicable fees are clearly displayed before you confirm your transaction, so there are no hidden charges."
  },
  {
    question: "Is my information secure?",
    answer: "Absolutely. We employ bank-grade security protocols and encryption to protect your personal and financial information. We also offer two-factor authentication (2FA) for an additional layer of security."
  },
  {
    question: "How does the referral program work?",
    answer: "When you invite friends to use our platform, you earn rewards when they sign up using your referral link and complete their first transaction. Rewards can be used for future transactions or withdrawn to your bank account."
  },
  {
    question: "What should I do if my transaction fails?",
    answer: "If your transaction fails, the amount is typically refunded to your wallet automatically. If you don't see the refund, please contact our support team through the help center with your transaction reference for immediate assistance."
  },
  {
    question: "Can I use your services outside Nigeria and Ghana?",
    answer: "Currently, our services are available in Nigeria and Ghana only. We have plans to expand to other African countries soon. Stay tuned for updates!"
  }
];

const FAQSection: React.FC = () => {
  const faqRef = useRef<HTMLDivElement>(null);
  
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
    
    if (faqRef.current) {
      observer.observe(faqRef.current);
    }
    
    return () => {
      if (faqRef.current) {
        observer.unobserve(faqRef.current);
      }
    };
  }, []);
  
  return (
    <section className="py-24 px-6 bg-muted/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium inline-block mb-4">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions about our platform and services.
          </p>
        </div>

        <div 
          ref={faqRef}
          className="opacity-0 premium-card p-6 md:p-8"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b border-border last:border-0 px-0 data-[state=open]:animate-slide-up overflow-hidden"
              >
                <AccordionTrigger className="text-xl font-medium py-4 hover:no-underline">
                  <div className="flex items-start">
                    <HelpCircle className="w-6 h-6 text-primary mr-4 mt-1 shrink-0" />
                    <span className="text-left">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pl-10 text-lg data-[state=open]:animate-slide-up">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-6">
            Still have questions? We're here to help.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center text-primary font-medium hover:underline group"
          >
            Contact Support <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
