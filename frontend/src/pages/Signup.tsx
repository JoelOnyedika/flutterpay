
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, EyeOff, ArrowLeft, Lock, Mail, User, Twitter, Phone, Check, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  // Form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

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
    
    if (formRef.current) {
      observer.observe(formRef.current);
    }
    
    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validateStep1 = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      setError('Please fill in all fields');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    if (!formData.agreeToTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy');
      return false;
    }
    
    return true;
  };

  const handleNextStep = () => {
    setError('');
    if (validateStep1()) {
      setStep(2);
      // Smooth scroll to top when changing steps
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setStep(1);
    setError('');
    // Smooth scroll to top when changing steps
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateStep2()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created successfully",
        description: "Welcome to FlashLink!",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col p-8 md:p-16 justify-center relative z-10">
        <Link to="/" className="flex items-center mb-8 w-max text-muted-foreground hover:text-foreground transition-colors duration-200">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Back to Home</span>
        </Link>

        <div className="max-w-md w-full mx-auto">
          <div className="space-y-3 mb-8">
            <h1 className="text-4xl font-bold">Create an account</h1>
            <p className="text-muted-foreground">Sign up and start using FlashLink today</p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                style={{ width: step === 1 ? '50%' : '100%' }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className={step === 1 ? 'text-primary font-medium' : 'text-muted-foreground'}>Account Details</span>
              <span className={step === 2 ? 'text-primary font-medium' : 'text-muted-foreground'}>Security</span>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-lg flex items-center gap-2 animate-slide-up">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <form 
            ref={formRef}
            onSubmit={handleSubmit} 
            className="space-y-6 opacity-0"
          >
            {step === 1 ? (
              <>
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block text-sm font-medium">
                    Full Name
                  </label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      className="pl-10 h-12 bg-muted/50 border-border focus-visible:ring-primary group-hover:border-primary transition-colors duration-200"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 h-12 bg-muted/50 border-border focus-visible:ring-primary group-hover:border-primary transition-colors duration-200"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium">
                    Phone Number
                  </label>
                  <div className="relative group">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="pl-10 h-12 bg-muted/50 border-border focus-visible:ring-primary group-hover:border-primary transition-colors duration-200"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <Button 
                  type="button" 
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white transition-all duration-300"
                  onClick={handleNextStep}
                >
                  Continue
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="pl-10 h-12 bg-muted/50 border-border focus-visible:ring-primary group-hover:border-primary transition-colors duration-200"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? 
                        <EyeOff className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors duration-200" /> : 
                        <Eye className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors duration-200" />
                      }
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium">
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="pl-10 h-12 bg-muted/50 border-border focus-visible:ring-primary group-hover:border-primary transition-colors duration-200"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      name="agreeToTerms"
                      className="h-4 w-4 rounded border border-border focus:ring-primary text-primary"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                    />
                  </div>
                  <label htmlFor="agreeToTerms" className="text-sm text-muted-foreground">
                    I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                  </label>
                </div>

                <div className="flex space-x-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    className="flex-1 h-12"
                    onClick={handlePrevStep}
                  >
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 h-12 bg-primary hover:bg-primary/90 text-white transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating account...
                      </div>
                    ) : 'Create Account'}
                  </Button>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div className="relative flex items-center justify-center">
                  <div className="border-t border-border flex-grow"></div>
                  <span className="px-3 text-sm text-muted-foreground">or continue with</span>
                  <div className="border-t border-border flex-grow"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button" 
                    className="flex items-center justify-center gap-2 p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span>Google</span>
                  </button>
                  <button 
                    type="button" 
                    className="flex items-center justify-center gap-2 p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors"
                  >
                    <Twitter className="h-4 w-4" />
                    <span>Twitter</span>
                  </button>
                </div>
              </>
            )}
          </form>

          <p className="mt-8 text-center text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Benefits */}
      <div className="hidden md:block md:w-1/2 relative bg-gradient-to-br from-primary/20 via-background to-secondary/20">
        <div className="absolute inset-0 dot-grid opacity-20"></div>
        
        <div className="absolute inset-0 flex flex-col justify-center items-center p-12">
          <div className="premium-card p-8 max-w-md w-full">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Fast & Convenient</h3>
                  <p className="text-sm text-muted-foreground">Complete transactions in seconds, not minutes</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Multiple Payment Options</h3>
                  <p className="text-sm text-muted-foreground">Pay with Naira, Ghana Cedis, or cryptocurrency</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Exclusive Discounts</h3>
                  <p className="text-sm text-muted-foreground">Enjoy special rates on airtime and data packages</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">24/7 Customer Support</h3>
                  <p className="text-sm text-muted-foreground">Get help whenever you need it</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <div className="inline-block w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-4 shimmer-effect">
              <span className="text-white font-bold text-xl">FL</span>
            </div>
            <h2 className="text-2xl font-bold">Join thousands of satisfied users</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
