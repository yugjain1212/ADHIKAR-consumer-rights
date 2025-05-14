import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, MessageSquare, Shield, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { languages, useLanguage } from '@/context/LanguageProvider';
import DesktopNavigation from './DesktopNavigation';
import ToolbarButtons from './ToolbarButtons';
import MobileNavigation from './MobileNavigation';
import ThemeToggle from '../theme/ThemeToggle';
import { Search } from '@/components/ui/search';
import { NotificationCenter } from '@/components/ui/notification-center';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentLanguage, setLanguage, translate } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLanguageChange = (code: string) => {
    setLanguage(code);
    // Store the language preference in localStorage
    localStorage.setItem('preferredLanguage', code);
  };

  const handleComplaintClick = () => {
    navigate('/complaints');
  };

  const handleAIAssistantClick = () => {
    navigate('/chatbot');
  };

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 font-sans transition-all duration-300",
        scrolled 
          ? "bg-gradient-glass backdrop-blur-md border-b border-border/30 shadow-md" 
          : "bg-background/95"
      )}
    >
      <div className="container-custom py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center group">
              <div className="mr-2 bg-primary text-primary-foreground p-1.5 rounded-md shadow-sm group-hover:shadow-md transition-all duration-300">
                <Shield className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-primary font-heading font-bold text-xl tracking-tight group-hover:text-primary/90 transition-colors">
                  ADHIKAR
                </span>
                <span className="text-xs text-muted-foreground hidden sm:block">Consumer Empowerment Platform</span>
              </div>
            </Link>
          </div>

          <DesktopNavigation translate={translate} />

          <div className="flex items-center space-x-3">
            <div className="hidden md:block">
              <Search />
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleAIAssistantClick}
              className="text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-300"
              aria-label="AI Assistant"
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
            
            <div className="hidden sm:block">
              <NotificationCenter />
            </div>
            
            <ThemeToggle />
            
            <div className="hidden md:block">
              <ToolbarButtons
                currentLanguage={currentLanguage}
                languages={languages}
                handleLanguageChange={handleLanguageChange}
                translate={translate}
                onComplaintClick={handleComplaintClick}
              />
            </div>

            <Button 
              variant="ghost"
              size="sm"
              className="md:hidden text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors duration-300" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <MobileNavigation
          isOpen={isMenuOpen}
          languages={languages}
          currentLanguage={currentLanguage}
          handleLanguageChange={handleLanguageChange}
          translate={translate}
          onClose={() => setIsMenuOpen(false)}
        />
      </div>
    </header>
  );
};

export default Header;
