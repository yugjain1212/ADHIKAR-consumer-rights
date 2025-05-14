
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex items-center justify-center bg-background min-h-[70vh]">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-6 text-foreground">404</h1>
          <p className="text-xl text-muted-foreground mb-8">Oops! Page not found</p>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
