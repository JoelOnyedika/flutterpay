
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, EyeOff, ArrowLeft, Lock, Mail, Twitter, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
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

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login successful",
        description: "Welcome back to our platform!",
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
            <h1 className="text-4xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">Log in to your account to continue</p>
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
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 h-12 bg-muted/50 border-border focus-visible:ring-primary group-hover:border-primary transition-colors duration-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 h-12 bg-muted/50 border-border focus-visible:ring-primary group-hover:border-primary transition-colors duration-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <Button 
              type="submit" 
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </div>
              ) : 'Log In'}
            </Button>

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
          </form>

          <p className="mt-8 text-center text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Background */}
      <div className="hidden md:block md:w-1/2 relative bg-gradient-to-br from-primary/20 via-background to-secondary/20">
        <div className="absolute inset-0 dot-grid opacity-20"></div>
        
        <div className="absolute inset-0 flex flex-col justify-center items-center p-12">
          <div className="premium-card p-8 max-w-md w-full">
            <div className="inline-block w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-6 shimmer-effect">
              <span className="text-white font-bold text-2xl">FL</span>
            </div>
            <h2 className="text-2xl font-bold mb-4">FlashLink: Instant Payments</h2>
            <p className="text-muted-foreground mb-6">
              Seamlessly recharge airtime, buy data bundles, and pay utility bills with Naira, Ghana Cedis, or cryptocurrency.
            </p>
            <ul className="space-y-4 mb-6">
              <li className="flex items-center gap-3">
                <div className="p-1 rounded-full bg-primary/20">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span>Instant transactions in seconds</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-1 rounded-full bg-primary/20">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span>Multiple payment options</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-1 rounded-full bg-primary/20">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span>Bank-grade security for your data</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-1 rounded-full bg-primary/20">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span>Discounted rates on all services</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
