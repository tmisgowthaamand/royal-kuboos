import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-deep-brown text-deep-brown-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="md:col-span-2">
            <h3 className="font-heading text-2xl font-bold mb-4">ROYAL KUBOOS CHENNAI</h3>
            <p className="text-deep-brown-foreground/80 mb-6 max-w-md">
              Chennai's trusted bakery for fresh kuboos, chapati, and parotta. 
              Delivering authentic taste from our kitchen to your table since day one.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/918012345678"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <MessageCircle size={16} className="mr-2" />
                  WhatsApp Order
                </Button>
              </a>
              <Link to="/bulk-orders">
                <Button size="sm" className="bg-white text-deep-brown hover:bg-gray-100 border-2 border-white">
                  Bulk Orders
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-label font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-deep-brown-foreground/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-deep-brown-foreground/80 hover:text-white transition-colors">
                  Shop Products
                </Link>
              </li>
              <li>
                <Link to="/bulk-orders" className="text-deep-brown-foreground/80 hover:text-white transition-colors">
                  Bulk Orders
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-deep-brown-foreground/80 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-label font-semibold text-lg mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 text-accent" />
                <div>
                  <p className="text-deep-brown-foreground/80 text-sm">
                    No.19, MGR STREET PERIYAR NAGAR<br />
                    MADAMBAKKAM, CHENNAI - 600126
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-accent" />
                <a 
                  href="tel:+919884806610" 
                  className="text-deep-brown-foreground/80 hover:text-white transition-colors text-sm"
                >
                  +91 98848 06610
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-accent" />
                <a 
                  href="mailto:pramamoorthy82@gmail.com" 
                  className="text-deep-brown-foreground/80 hover:text-white transition-colors text-sm"
                >
                  pramamoorthy82@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-accent" />
                <a 
                  href="mailto:contact@royalkuboos.shop" 
                  className="text-deep-brown-foreground/80 hover:text-white transition-colors text-sm"
                >
                  contact@royalkuboos.shop
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={16} className="mt-1 text-accent" />
                <div className="text-deep-brown-foreground/80 text-sm">
                  <p>Mon - Sat: 6:00 AM - 10:00 PM</p>
                  <p>Sunday: 7:00 AM - 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-6 flex flex-col sm:flex-row justify-start items-center">
          <p className="text-deep-brown-foreground/60 text-sm">
            © 2025 ROYAL KUBOOS CHENNAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;