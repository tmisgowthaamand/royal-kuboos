import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, ShoppingCart, Eye } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  packSize: string;
  description?: string;
  isNew?: boolean;
  onAddToCart?: (productId: string, quantity: number) => void;
  onViewDetails?: (productId: string) => void;
}

const ProductCard = ({
  id,
  name,
  image,
  price,
  originalPrice,
  packSize,
  description,
  isNew = false,
  onAddToCart,
  onViewDetails
}: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    onAddToCart?.(id, quantity);
    setQuantity(1); // Reset quantity after adding
  };

  return (
    <Card className="card-product group overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isNew && (
          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
            Fresh
          </Badge>
        )}
        {originalPrice && (
          <Badge variant="secondary" className="absolute top-3 right-3">
            Save ₹{originalPrice - price}
          </Badge>
        )}
      </div>

      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="mb-2">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground font-label">
            {packSize}
          </p>
        </div>

        {description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {description}
          </p>
        )}

        <div className="flex items-center gap-2 mb-3">
          <span className="font-heading font-bold text-xl text-primary">
            ₹{price}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{originalPrice}
            </span>
          )}
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between mb-3 mt-auto">
          <span className="text-sm font-label font-medium text-foreground">
            Quantity:
          </span>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="h-8 w-8 p-0"
            >
              <Minus size={14} />
            </Button>
            <span className="font-label font-semibold min-w-[2rem] text-center">
              {quantity}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleQuantityChange(1)}
              className="h-8 w-8 p-0"
            >
              <Plus size={14} />
            </Button>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 mt-auto">
        <div className="flex flex-col gap-2 w-full">
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            size="sm"
          >
            <ShoppingCart size={16} className="mr-2" />
            Add to Cart
          </Button>
          <Button 
            onClick={() => onViewDetails?.(id)}
            variant="outline"
            className="w-full"
            size="sm"
          >
            <Eye size={16} className="mr-2" />
            View Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;