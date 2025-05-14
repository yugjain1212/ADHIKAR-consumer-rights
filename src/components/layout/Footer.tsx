import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, Twitter, Instagram, Youtube, Mail, 
  Shield, ArrowRight, MapPin, Phone, ExternalLink,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card text-card-foreground border-t border-border/30">
      <div className="container-custom pt-16 pb-8">
        {/* Newsletter Section */}
        <div className="bg-gradient-glass backdrop-blur-sm rounded-xl p-6 md:p-8 mb-12 border border-border/40 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-muted-foreground mb-0">
                Get the latest consumer rights news and updates delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow bg-background/80"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <div className="mr-2 bg-primary text-primary-foreground p-1.5 rounded-md">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">ADHIKAR</h3>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              Empowering Indian consumers with knowledge, tools, and support to protect their rights and make informed decisions.
            </p>
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="bg-muted/50 hover:bg-primary/10 text-foreground hover:text-primary p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-muted/50 hover:bg-primary/10 text-foreground hover:text-primary p-2 rounded-full transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-muted/50 hover:bg-primary/10 text-foreground hover:text-primary p-2 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-muted/50 hover:bg-primary/10 text-foreground hover:text-primary p-2 rounded-full transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary flex items-center transition-colors">
                  <ArrowRight className="h-4 w-4 mr-2 text-primary/70" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/rights" className="text-muted-foreground hover:text-primary flex items-center transition-colors">
                  <ArrowRight className="h-4 w-4 mr-2 text-primary/70" />
                  Consumer Rights
                </Link>
              </li>
              <li>
                <Link to="/chatbot" className="text-muted-foreground hover:text-primary flex items-center transition-colors">
                  <ArrowRight className="h-4 w-4 mr-2 text-primary/70" />
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-muted-foreground hover:text-primary flex items-center transition-colors">
                  <ArrowRight className="h-4 w-4 mr-2 text-primary/70" />
                  Community
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-primary flex items-center transition-colors">
                  <ArrowRight className="h-4 w-4 mr-2 text-primary/70" />
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/complaints" className="text-muted-foreground hover:text-primary flex items-center transition-colors">
                  <ArrowRight className="h-4 w-4 mr-2 text-primary/70" />
                  File a Complaint
                </Link>
              </li>
              <li>
                <Link to="/resources/legal-aid" className="text-muted-foreground hover:text-primary flex items-center transition-colors">
                  <ArrowRight className="h-4 w-4 mr-2 text-primary/70" />
                  Legal Aid
                </Link>
              </li>
              <li>
                <Link to="/community/forums" className="text-muted-foreground hover:text-primary flex items-center transition-colors">
                  <ArrowRight className="h-4 w-4 mr-2 text-primary/70" />
                  Consumer Forums
                </Link>
              </li>
              <li>
                <Link to="/resources/faq" className="text-muted-foreground hover:text-primary flex items-center transition-colors">
                  <ArrowRight className="h-4 w-4 mr-2 text-primary/70" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/resources/blog" className="text-muted-foreground hover:text-primary flex items-center transition-colors">
                  <ArrowRight className="h-4 w-4 mr-2 text-primary/70" />
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start text-muted-foreground">
                <MapPin className="h-5 w-5 mr-3 text-primary/70 mt-0.5 shrink-0" />
                <span>123 Consumer Street, New Delhi, 110001, India</span>
              </li>
              <li className="flex items-center text-muted-foreground">
                <Phone className="h-5 w-5 mr-3 text-primary/70 shrink-0" />
                <span>+91 9358210803</span>
              </li>
              <li className="flex items-center text-muted-foreground">
                <Mail className="h-5 w-5 mr-3 text-primary/70 shrink-0" />
                <a href="mailto:yug@adhikar.in" className="hover:text-primary transition-colors">
                  yug@adhikar.in
                </a>
              </li>
            </ul>
            <p className="text-muted-foreground text-sm mt-4">
              *This platform is for informational purposes only and does not constitute legal advice.
            </p>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-border pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                © 2024 Adhikar. All rights reserved.
              </p>
              <span className="mx-2 text-muted-foreground">•</span>
              <p className="text-sm text-muted-foreground flex items-center">
                Made with <Heart className="h-3 w-3 mx-1 text-destructive" /> in India
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/accessibility" className="text-muted-foreground hover:text-primary transition-colors">
                Accessibility
              </Link>
              <a 
                href="https://consumerhelpline.gov.in/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors flex items-center"
              >
                National Consumer Helpline
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
