
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface NavbarProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, isDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${
        isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <span className="text-white font-bold text-xl">FL</span>
          </div>
          <span className="font-bold text-xl tracking-tight">FlashLink</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-medium hover:text-primary transition-colors">Home</Link>
          <Link to="/dashboard" className="font-medium hover:text-primary transition-colors">Dashboard</Link>
          <Link to="/wallet" className="font-medium hover:text-primary transition-colors">Wallet</Link>
          <Link to="/airtime" className="font-medium hover:text-primary transition-colors">Airtime</Link>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="border border-border">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Link to="/login">
              <Button variant="outline" className="border-border hover:bg-muted">Log In</Button>
            </Link>
            
            <Link to="/signup">
              <Button className="bg-primary hover:bg-primary/90 transition-all duration-300">Sign Up</Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="border border-border">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Button variant="ghost" onClick={toggleMobileMenu} className="p-2">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border border-border mt-4 rounded-xl p-4 animate-slide-up shadow-lg">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="font-medium py-2 hover:text-primary transition-colors">Home</Link>
            <Link to="/dashboard" className="font-medium py-2 hover:text-primary transition-colors">Dashboard</Link>
            <Link to="/wallet" className="font-medium py-2 hover:text-primary transition-colors">Wallet</Link>
            <Link to="/airtime" className="font-medium py-2 hover:text-primary transition-colors">Airtime</Link>
            
            <div className="flex flex-col space-y-3 pt-4 border-t border-border">
              <Link to="/login">
                <Button variant="outline" className="w-full border-border hover:bg-muted">Log In</Button>
              </Link>
              
              <Link to="/signup">
                <Button className="w-full bg-primary hover:bg-primary/90 transition-all duration-300">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
