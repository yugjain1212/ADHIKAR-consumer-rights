import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, Book, MessageSquare, Users, FileText, BarChart2, User, ClipboardList } from 'lucide-react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';

interface DesktopNavigationProps {
  translate: (key: string) => string;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  translate
}) => {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/" className={navigationMenuTriggerStyle()}>
            {translate('home')}
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/rights" className={navigationMenuTriggerStyle()}>
            {translate('rights')}
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/community" className={navigationMenuTriggerStyle()}>
            {translate('community')}
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/resources" className={navigationMenuTriggerStyle()}>
            {translate('resources')}
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/documents" className={navigationMenuTriggerStyle()}>
            {translate('documents')}
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Button asChild variant="outline" className="ml-2">
            <Link to="/complaints">
              <ClipboardList className="mr-2 h-4 w-4" />
              {translate('complaints')}
            </Link>
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNavigation;