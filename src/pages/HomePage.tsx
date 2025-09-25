import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Shield, 
  Truck, 
  Heart, 
  Users, 
  Star,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import ProductDetailsModal from "@/components/ProductDetailsModal";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-bread-flatlay.jpg";

const HomePage = () => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const featuredProducts = [
    {
      id: "kuboos-5pc",
      name: "Fresh Kuboos",
      image: "/images/kuboos 5.jpg",
      price: 25,
      originalPrice: 30,
      packSize: "Pack of 5",
      description: "Soft, fluffy kuboos made fresh daily with premium ingredients",
      isNew: true,
      category: "kuboos"
    },
    {
      id: "chapati-10pc", 
      name: "Whole Wheat Chapati",
      image: "/images/chapathi 5.png",
      price: 40,
      packSize: "Pack of 10",
      description: "Healthy whole wheat chapatis perfect for daily meals",
      category: "chapati"
    },
    {
      id: "parotta-5pc",
      name: "Layered Parotta",
      image: "/images/parotta 5.png",
      price: 35,
      packSize: "Pack of 5", 
      description: "Crispy, flaky parottas with perfect layers",
      category: "parotta"
    },
    {
      id: "mixed-pack",
      name: "Mixed Bread Pack",
      image: "/images/1.png",
      price: 80,
      originalPrice: 90,
      packSize: "2 Kuboos + 3 Chapati + 2 Parotta",
      description: "Try all our specialties in one convenient pack. Perfect for first-time customers.",
      isNew: true,
      category: "mixed"
    }
  ];

  const whyChooseFeatures = [
    {
      icon: Clock,
      title: "Fresh Daily",
      description: "Baked fresh every morning with premium ingredients"
    },
    {
      icon: Shield,
      title: "Hygienic Process",
      description: "Maintained under strict hygiene standards"
    },
    {
      icon: Heart,
      title: "Soft & Tasty",
      description: "Perfect texture and authentic taste every time"
    },
    {
      icon: Truck,
      title: "On-Time Delivery",
      description: "Delivered fresh to your doorstep daily"
    }
  ];

  const handleAddToCart = (productId: string, quantity: number) => {
    const product = featuredProducts.find(p => p.id === productId);
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        originalPrice: product.originalPrice,
        packSize: product.packSize,
        category: product.category
      }, quantity);
      
      toast({
        title: "Added to Cart",
        description: `${quantity}x ${product.name} added to your cart`,
      });
    }
  };

  const handleViewDetails = (productId: string) => {
    const product = featuredProducts.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left animate-fade-in">
              <Badge className="mb-4 bg-accent text-accent-foreground">
                Chennai's Trusted Bakery
              </Badge>
              <h1 className="font-heading text-4xl lg:text-6xl font-bold text-deep-brown mb-6 leading-tight">
                Freshly Baked.
                <span className="text-primary block">Delivered Daily.</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Experience the authentic taste of Chennai with our fresh kuboos, chapati, and parotta. 
                Made with love, delivered with care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/shop">
                  <Button variant="hero" size="lg" className="min-w-[160px]">
                    Shop Now
                    <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link to="/bulk-orders">
                  <Button variant="warm" size="lg" className="min-w-[160px]">
                    Bulk Orders
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <img
                src={heroImage}
                alt="Fresh kuboos, chapati and parotta flat lay"
                className="w-full h-auto rounded-2xl shadow-lifted"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-card animate-slide-up">
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-500 fill-yellow-500" size={16} />
                  <span className="font-label font-semibold text-sm">4.9/5</span>
                  <span className="text-xs text-muted-foreground">(1000+ reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-deep-brown mb-4">
              Why Choose Royal Kuboos?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to delivering the finest quality bread products with unmatched freshness and taste.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseFeatures.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-card transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="text-primary" size={24} />
                  </div>
                  <h3 className="font-label font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-deep-brown mb-4">
              Our Fresh Products
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our signature collection of freshly baked kuboos, chapati, and parotta.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center mb-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="w-full max-w-sm">
                <ProductCard
                  {...product}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleViewDetails}
                />
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/shop">
              <Button variant="fresh" size="lg">
                View All Products
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Bulk Orders CTA */}
      <section className="py-16 bg-gradient-fresh text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Users size={48} className="mx-auto mb-6 text-white/80" />
            <h2 className="font-heading text-3xl lg:text-4xl font-bold mb-4">
              Supplying Hotels & Restaurants Across Chennai
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Partner with us for your bulk bread requirements. We supply fresh kuboos, chapati, 
              and parotta to hotels, restaurants, caterers, and events across Chennai.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/bulk-orders">
                <Button variant="warm" size="lg" className="min-w-[180px]">
                  Get Bulk Quote
                </Button>
              </Link>
              <a
                href="https://wa.me/918012345678"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="min-w-[180px] bg-white text-green-700 hover:bg-gray-100 border-2 border-white">
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-deep-brown mb-6">
                From Our Bakery to Your Table
              </h2>
              <p className="text-muted-foreground mb-6">
                Royal Kuboos has been Chennai's trusted choice for authentic, fresh-baked bread products. 
                Our commitment to quality, hygiene, and taste has made us a household name across the city.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-primary flex-shrink-0" size={20} />
                  <span>Premium quality ingredients sourced locally</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-primary flex-shrink-0" size={20} />
                  <span>Traditional recipes with modern hygiene standards</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-primary flex-shrink-0" size={20} />
                  <span>Fresh daily production and same-day delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-primary flex-shrink-0" size={20} />
                  <span>Trusted by 1000+ families and 50+ restaurants</span>
                </div>
              </div>
              <Link to="/contact">
                <Button variant="fresh" size="lg">
                  Our Story
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-warm p-8 rounded-2xl">
                <blockquote className="text-lg italic text-deep-brown mb-4">
                  "The best kuboos in Chennai! Fresh, soft, and always delivered on time. 
                  Royal Kuboos has become an essential part of our daily meals."
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">S</span>
                  </div>
                  <div>
                    <p className="font-label font-semibold">Sriram Kumar</p>
                    <p className="text-sm text-muted-foreground">T. Nagar, Chennai</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-warm-beige">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-deep-brown mb-4">
            Order Fresh Bread Today
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the Royal Kuboos difference. Fresh, hygienic, and delivered daily to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <Button variant="hero" size="lg" className="min-w-[160px]">
                Order Now
              </Button>
            </Link>
            <Link to="/bulk-orders">
              <Button variant="fresh" size="lg" className="min-w-[160px]">
                Get Bulk Quote
              </Button>
            </Link>
            <a
              href="https://wa.me/918012345678"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="fresh" size="lg" className="min-w-[160px]">
                Quick Order
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Product Details Modal */}
      <ProductDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </div>
  );
};

export default HomePage;