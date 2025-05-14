
import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Globe, MessageSquare, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface Lang {
  code: string;
  name: string;
}
interface ToolbarButtonsProps {
  currentLanguage: string;
  languages: Lang[];
  handleLanguageChange: (code: string) => void;
  translate: (key: string) => string;
  onComplaintClick: () => void;
}

const ToolbarButtons: React.FC<ToolbarButtonsProps> = ({
  currentLanguage, 
  languages, 
  handleLanguageChange, 
  translate,
  onComplaintClick,
}) => (
  <div className="hidden md:flex items-center space-x-4">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 font-sans hover:bg-secondary transition-colors duration-300"
        >
          <Globe className="h-4 w-4" />
          <span>{languages.find(l => l.code === currentLanguage)?.name || 'English'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover border-border shadow-lg">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={cn(
              currentLanguage === lang.code ? "bg-secondary" : "",
              "hover:bg-secondary transition-colors duration-300"
            )}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>

    <Button
      onClick={onComplaintClick}
      className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans transition-colors duration-300"
    >
      <MessageSquare className="mr-2 h-4 w-4" /> {translate('file_complaint')}
    </Button>
    
    <Button asChild variant="outline" className="bg-secondary hover:bg-secondary/80 text-foreground">
      <Link to="/auth">
        <User className="mr-2 h-4 w-4" /> {translate('sign_in')}
      </Link>
    </Button>
  </div>
);

export default ToolbarButtons;
