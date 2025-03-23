
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, Home, Wallet, Phone, Zap, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/components/ui/use-toast';

interface AppNavbarProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const AppNavbar: React.FC<AppNavbarProps> = ({ toggleTheme, isDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  
  // Check if we're on authentication pages
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  // If we're on login or signup pages, don't show the navbar
  if (isAuthPage) return null;

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

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account"
    });
    // In a real app, you would handle actual logout logic here
  };

  const navLinks = [
    { title: 'Home', path: '/dashboard', icon: <Home className="h-5 w-5" /> },
    { title: 'Wallet', path: '/wallet', icon: <Wallet className="h-5 w-5" /> },
    { title: 'Airtime', path: '/airtime', icon: <Phone className="h-5 w-5" /> },
    { title: 'Data', path: '/data', icon: <Zap className="h-5 w-5" /> },
    { title: 'Utilities', path: '/utilities', icon: <Zap className="h-5 w-5" /> },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Don't show on landing page
  if (location.pathname === '/') return null;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-6 py-3 ${
        isScrolled ? 'bg-background/90 backdrop-blur-lg border-b border-border shadow-sm' : 'bg-background'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <span className="text-white font-bold text-sm">FL</span>
          </div>
          <span className="font-bold text-lg tracking-tight">FlashLink</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.path}>
                  <Link to={link.path}>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle() + (isActive(link.path) ? " bg-accent text-accent-foreground" : "")}
                    >
                      {link.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="ml-1">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col h-full py-6">
                <div className="flex flex-col space-y-2 mb-8">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.path} 
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center px-4 py-3 rounded-md ${
                        isActive(link.path) 
                          ? "bg-accent text-accent-foreground" 
                          : "hover:bg-muted"
                      }`}
                    >
                      {link.icon}
                      <span className="ml-3">{link.title}</span>
                    </Link>
                  ))}
                </div>
                
                <div className="mt-auto flex flex-col space-y-3">
                  <Button variant="outline" className="justify-start" onClick={handleLogout}>
                    <LogOut className="h-5 w-5 mr-2" />
                    Log out
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
