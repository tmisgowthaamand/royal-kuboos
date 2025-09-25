import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { state, updateQuantity, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (id: string, currentQuantity: number, change: number) => {
    const newQuantity = Math.max(0, currentQuantity + change);
    updateQuantity(id, newQuantity);
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <ShoppingBag size={64} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="font-heading text-2xl font-bold text-deep-brown mb-2">
              Your Cart is Empty
            </h2>
            <p className="text-muted-foreground mb-6">
              Add some delicious items from our shop to get started!
            </p>
            <Button onClick={() => navigate('/shop')} className="bg-primary hover:bg-primary/90">
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/shop')}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Button>
          <div>
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-deep-brown">
              Shopping Cart
            </h1>
            <p className="text-muted-foreground">
              {state.itemCount} {state.itemCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <Card key={item.id} className="card-product">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Product Image */}
                    <div className="md:w-32 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-heading font-semibold text-lg text-foreground">
                            {item.name}
                          </h3>
                          <p className="text-sm text-muted-foreground font-label">
                            {item.packSize}
                          </p>
                          <Badge variant="secondary" className="mt-1 text-xs">
                            {item.category}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>

                      {/* Price and Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-bold text-xl text-primary">
                            ₹{item.price}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{item.originalPrice}
                            </span>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-label font-medium">Qty:</span>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                              className="h-8 w-8 p-0"
                            >
                              <Minus size={14} />
                            </Button>
                            <span className="font-label font-semibold min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="mt-3 text-right">
                        <span className="text-sm text-muted-foreground">Subtotal: </span>
                        <span className="font-heading font-bold text-lg text-primary">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Clear Cart Button */}
            <div className="pt-4">
              <Button
                variant="outline"
                onClick={clearCart}
                className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
              >
                <Trash2 size={16} className="mr-2" />
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="shadow-card sticky top-8">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-deep-brown">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({state.itemCount} items)</span>
                    <span>₹{state.total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>GST (5%)</span>
                    <span>₹{Math.round(state.total * 0.05)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-heading font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">₹{Math.round(state.total * 1.05)}</span>
                </div>

                <div className="pt-4 space-y-3">
                  <Button
                    onClick={handleProceedToCheckout}
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">
                      Free delivery on all orders • Fresh daily preparation
                    </p>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="bg-warm-beige p-4 rounded-lg">
                  <h4 className="font-label font-semibold text-sm mb-2">
                    🚚 Delivery Information
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Fresh items prepared daily</li>
                    <li>• Delivery within 30-60 minutes</li>
                    <li>• Free delivery across Chennai</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
