
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted/30 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="relative w-10 h-10 rounded-full animated-gradient flex items-center justify-center">
                <span className="text-white font-bold text-xl">QC</span>
              </div>
              <span className="font-bold text-xl tracking-tight">QuickCharge</span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Fast, secure and convenient recharge and bill payment platform for Nigeria and Ghana.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link to="/press" className="text-muted-foreground hover:text-foreground transition-colors">Press Kit</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              <li><Link to="/airtime" className="text-muted-foreground hover:text-foreground transition-colors">Airtime Recharge</Link></li>
              <li><Link to="/data" className="text-muted-foreground hover:text-foreground transition-colors">Data Bundles</Link></li>
              <li><Link to="/electricity" className="text-muted-foreground hover:text-foreground transition-colors">Electricity Bills</Link></li>
              <li><Link to="/tv" className="text-muted-foreground hover:text-foreground transition-colors">TV Subscriptions</Link></li>
              <li><Link to="/education" className="text-muted-foreground hover:text-foreground transition-colors">Education</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/security" className="text-muted-foreground hover:text-foreground transition-colors">Security</Link></li>
              <li><Link to="/compliance" className="text-muted-foreground hover:text-foreground transition-colors">Compliance</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} QuickCharge. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Support
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Status
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              License
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Changelog
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
