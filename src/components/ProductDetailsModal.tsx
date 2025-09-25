import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, ShoppingCart, Package, ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
    originalPrice?: number;
    packSize: string;
    description: string;
    isNew?: boolean;
    category: string;
  } | null;
}

const ProductDetailsModal = ({ isOpen, onClose, product }: ProductDetailsModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  if (!product) return null;

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
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
    
    setQuantity(1);
    onClose();
  };

  const handleBulkOrder = () => {
    navigate('/bulk-order-form', { state: { product } });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2 hover:bg-muted"
            >
              <ArrowLeft size={20} />
            </Button>
            <DialogTitle className="font-heading text-2xl text-deep-brown">
              Product Details
            </DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-square object-cover rounded-lg"
              />
              {product.isNew && (
                <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                  Fresh
                </Badge>
              )}
              {product.originalPrice && (
                <Badge variant="secondary" className="absolute top-3 right-3">
                  Save ₹{product.originalPrice - product.price}
                </Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                {product.name}
              </h2>
              <p className="text-lg text-muted-foreground font-label mb-2">
                {product.packSize}
              </p>
              <Badge variant="secondary" className="mb-4">
                {product.category}
              </Badge>
              
              <div className="flex items-center gap-3 mb-4">
                <span className="font-heading font-bold text-3xl text-primary">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-label font-semibold text-lg mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <Separator />

            {/* Regular Order */}
            <div className="space-y-4">
              <h3 className="font-label font-semibold text-lg">Regular Order</h3>
              
              {/* Quantity Selector */}
              <div className="flex items-center justify-between">
                <span className="font-label font-medium">Quantity:</span>
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="h-10 w-10 p-0"
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="font-label font-semibold min-w-[3rem] text-center text-lg">
                    {quantity}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuantityChange(1)}
                    className="h-10 w-10 p-0"
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between text-lg">
                <span className="font-semibold">Total:</span>
                <span className="font-heading font-bold text-xl text-primary">
                  ₹{product.price * quantity}
                </span>
              </div>

              <Button 
                onClick={handleAddToCart}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90"
              >
                <ShoppingCart size={20} className="mr-2" />
                Add {quantity} to Cart
              </Button>
            </div>

            <Separator />

            {/* Bulk Order Section */}
            <div className="space-y-4">
              <h3 className="font-label font-semibold text-lg">Need Bulk Quantities?</h3>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-sm text-blue-800 mb-2">
                  📦 Bulk Order Benefits
                </h4>
                <ul className="text-xs text-blue-700 space-y-1 mb-4">
                  <li>• Special wholesale pricing</li>
                  <li>• Daily fresh delivery</li>
                  <li>• Dedicated customer support</li>
                  <li>• Flexible payment terms</li>
                </ul>
                
                <Button 
                  onClick={handleBulkOrder}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Package size={16} className="mr-2" />
                  Request Bulk Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsModal;
