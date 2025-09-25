import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, CreditCard, Building2, MapPin, User, Phone, Mail } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { state } = useCart();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "Tamil Nadu",
    pincode: "",
    landmark: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("");

  const subtotal = state.total;
  const gstAmount = Math.round(subtotal * 0.05);
  const deliveryFee = 0; // Free delivery
  const totalAmount = subtotal + gstAmount + deliveryFee;

  const handleInputChange = (field: string, value: string) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    // Validate required fields
    const requiredFields = ['fullName', 'phone', 'address', 'city', 'pincode'];
    const missingFields = requiredFields.filter(field => !shippingInfo[field]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in: ${missingFields.join(', ')}`);
      return;
    }

    // Generate order ID and navigate to confirmation
    const orderId = `RK${Date.now().toString().slice(-6)}`;
    navigate('/order-confirmation', { 
      state: { 
        orderId, 
        shippingInfo, 
        paymentMethod, 
        orderTotal: totalAmount,
        items: state.items
      } 
    });
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <h2 className="font-heading text-2xl font-bold text-deep-brown mb-4">
              Your cart is empty
            </h2>
            <Button onClick={() => navigate('/shop')}>
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
            onClick={() => navigate('/cart')}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Cart
          </Button>
          <div>
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-deep-brown">
              Checkout
            </h1>
            <p className="text-muted-foreground">
              Complete your order details
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-deep-brown flex items-center gap-2">
                  <MapPin size={20} />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={shippingInfo.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={shippingInfo.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="address">Complete Address *</Label>
                  <Textarea
                    id="address"
                    value={shippingInfo.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="House/Flat No., Street, Area"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={shippingInfo.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="Chennai"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Select value={shippingInfo.state} onValueChange={(value) => handleInputChange("state", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                        <SelectItem value="Karnataka">Karnataka</SelectItem>
                        <SelectItem value="Kerala">Kerala</SelectItem>
                        <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="pincode">PIN Code *</Label>
                    <Input
                      id="pincode"
                      value={shippingInfo.pincode}
                      onChange={(e) => handleInputChange("pincode", e.target.value)}
                      placeholder="600001"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="landmark">Landmark (Optional)</Label>
                  <Input
                    id="landmark"
                    value={shippingInfo.landmark}
                    onChange={(e) => handleInputChange("landmark", e.target.value)}
                    placeholder="Near Metro Station, Mall, etc."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-deep-brown flex items-center gap-2">
                  <CreditCard size={20} />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label htmlFor="credit-card" className="flex items-center gap-3 cursor-pointer flex-1">
                        <CreditCard size={20} className="text-primary" />
                        <div>
                          <p className="font-semibold">Credit Card</p>
                          <p className="text-sm text-muted-foreground">Secure payment via credit card</p>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                      <RadioGroupItem value="debit-card" id="debit-card" />
                      <Label htmlFor="debit-card" className="flex items-center gap-3 cursor-pointer flex-1">
                        <CreditCard size={20} className="text-primary" />
                        <div>
                          <p className="font-semibold">Debit Card</p>
                          <p className="text-sm text-muted-foreground">Pay with your debit card</p>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                      <RadioGroupItem value="net-banking" id="net-banking" />
                      <Label htmlFor="net-banking" className="flex items-center gap-3 cursor-pointer flex-1">
                        <Building2 size={20} className="text-primary" />
                        <div>
                          <p className="font-semibold">Net Banking</p>
                          <p className="text-sm text-muted-foreground">Pay through internet banking</p>
                        </div>
                      </Label>
                    </div>

                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
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
                {/* Items */}
                <div className="space-y-3">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 aspect-square object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.packSize} × {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({state.itemCount} items)</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>GST (5%)</span>
                    <span>₹{gstAmount}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-heading font-bold text-lg">
                  <span>Total Amount</span>
                  <span className="text-primary">₹{totalAmount}</span>
                </div>

                <Button
                  onClick={handlePlaceOrder}
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={!paymentMethod}
                >
                  Place Order
                </Button>

                {/* Delivery Info */}
                <div className="bg-warm-beige p-4 rounded-lg">
                  <h4 className="font-label font-semibold text-sm mb-2">
                    🚚 Delivery Details
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Fresh preparation after order</li>
                    <li>• Delivery in 30-60 minutes</li>
                    <li>• Free delivery in Chennai</li>
                    <li>• GST included in final price</li>
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

export default CheckoutPage;
