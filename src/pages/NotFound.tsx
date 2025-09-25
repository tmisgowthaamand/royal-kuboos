import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-8">
              <h1 className="font-heading text-8xl lg:text-9xl font-bold text-deep-brown mb-4">404</h1>
              <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-deep-brown mb-4">
                Page Not Found
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Sorry, the page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="hero" size="lg" className="min-w-[160px]">
                  <Home size={18} className="mr-2" />
                  Go to Home
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => window.history.back()}
                className="min-w-[160px]"
              >
                <ArrowLeft size={18} className="mr-2" />
                Go Back
              </Button>
            </div>
            
            <div className="mt-12 p-6 bg-cream rounded-lg">
              <h3 className="font-heading text-xl font-semibold text-deep-brown mb-2">
                Looking for fresh bread?
              </h3>
              <p className="text-muted-foreground mb-4">
                Explore our fresh kuboos, chapati, and parotta collection.
              </p>
              <Link to="/shop">
                <Button variant="fresh" size="sm">
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
