import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link, useLocation } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  showBreadcrumbs?: boolean;
  fullWidth?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  className,
  showBreadcrumbs = true,
  fullWidth = false
}) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className={cn("flex-grow", className)}>
        {showBreadcrumbs && pathSegments.length > 0 && (
          <div className="bg-muted/30 border-b border-border/40">
            <div className="container-custom py-3">
              <nav className="flex items-center text-sm text-muted-foreground">
                <Link to="/" className="flex items-center hover:text-foreground transition-colors">
                  <Home className="h-4 w-4 mr-1" />
                  <span>Home</span>
                </Link>
                
                {pathSegments.map((segment, index) => {
                  const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
                  const isLast = index === pathSegments.length - 1;
                  
                  return (
                    <React.Fragment key={path}>
                      <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/60" />
                      {isLast ? (
                        <span className="font-medium text-foreground capitalize">
                          {segment.replace(/-/g, ' ')}
                        </span>
                      ) : (
                        <Link 
                          to={path}
                          className="hover:text-foreground transition-colors capitalize"
                        >
                          {segment.replace(/-/g, ' ')}
                        </Link>
                      )}
                    </React.Fragment>
                  );
                })}
              </nav>
            </div>
          </div>
        )}
        
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;