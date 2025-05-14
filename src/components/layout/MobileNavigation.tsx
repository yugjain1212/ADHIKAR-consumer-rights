import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, Book, MessageSquare, Users, FileText, 
  BarChart2, Globe, User, ClipboardList, Shield,
  LogIn, ChevronRight, Settings, HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface Lang {
  code: string;
  name: string;
}

interface MobileNavigationProps {
  isOpen: boolean;
  languages: Lang[];
  currentLanguage: string;
  handleLanguageChange: (code: string) => void;
  translate: (key: string) => string;
  onClose?: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  languages,
  currentLanguage,
  handleLanguageChange,
  translate,
  onClose
}) => {
  const location = useLocation();
  
  if (!isOpen) return null;
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: '/', label: translate('home'), icon: <HomeIcon className="h-5 w-5" /> },
    { path: '/rights', label: translate('consumer_rights'), icon: <Book className="h-5 w-5" /> },
    { path: '/chatbot', label: translate('ai_assistant'), icon: <MessageSquare className="h-5 w-5" /> },
    { path: '/community', label: translate('community'), icon: <Users className="h-5 w-5" /> },
    { path: '/resources', label: translate('resources'), icon: <FileText className="h-5 w-5" /> },
    { path: '/complaints', label: translate('complaints'), icon: <ClipboardList className="h-5 w-5" /> },
    { path: '/dashboard', label: translate('dashboard'), icon: <BarChart2 className="h-5 w-5" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden animate-fade-in">
      <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-background border-r border-border shadow-lg p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center" onClick={onClose}>
            <div className="mr-2 bg-primary text-primary-foreground p-1.5 rounded-md">
              <Shield className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-primary font-heading font-bold text-xl tracking-tight">
                ADHIKAR
              </span>
              <span className="text-xs text-muted-foreground">Consumer Empowerment Platform</span>
            </div>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={cn(
                "flex items-center py-3 px-4 rounded-md transition-colors",
                isActive(item.path)
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground/80 hover:text-foreground hover:bg-muted/60"
              )}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <Separator className="my-6" />
        
        <div className="space-y-4">
          <div className="px-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              {translate('language')}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  variant={currentLanguage === lang.code ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "justify-start",
                    currentLanguage === lang.code 
                      ? "bg-primary text-primary-foreground" 
                      : "text-foreground/80"
                  )}
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  {lang.name}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="px-4 pt-2">
            <Link 
              to="/auth" 
              className="flex items-center py-2 px-4 rounded-md text-foreground/80 hover:text-foreground hover:bg-muted/60 transition-colors"
              onClick={onClose}
            >
              <LogIn className="h-5 w-5 mr-3" />
              <span>{translate('login')}</span>
            </Link>
            
            <Link 
              to="/help" 
              className="flex items-center py-2 px-4 rounded-md text-foreground/80 hover:text-foreground hover:bg-muted/60 transition-colors"
              onClick={onClose}
            >
              <HelpCircle className="h-5 w-5 mr-3" />
              <span>{translate('help')}</span>
            </Link>
            
            <Link 
              to="/settings" 
              className="flex items-center py-2 px-4 rounded-md text-foreground/80 hover:text-foreground hover:bg-muted/60 transition-colors"
              onClick={onClose}
            >
              <Settings className="h-5 w-5 mr-3" />
              <span>{translate('settings')}</span>
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-4 left-0 right-0 px-6">
          <p className="text-xs text-muted-foreground text-center">
            © 2023 Adhikar. {translate('all_rights_reserved')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
