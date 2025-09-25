import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, MapPin, Phone, Mail, Home, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [deliveryTime, setDeliveryTime] = useState("");

  const orderData = location.state;

  useEffect(() => {
    // Clear cart after successful order
    clearCart();

    // Set delivery time to show both options
    setDeliveryTime("30 minutes - 1 hour");
  }, [clearCart]);

  if (!orderData) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <h2 className="font-heading text-2xl font-bold text-deep-brown mb-4">
              Order not found
            </h2>
            <Button onClick={() => navigate('/shop')}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const { orderId, shippingInfo, paymentMethod, orderTotal, items } = orderData;

  const getPaymentMethodDisplay = (method: string) => {
    switch (method) {
      case 'credit-card': return 'Credit Card';
      case 'debit-card': return 'Debit Card';
      case 'net-banking': return 'Net Banking';
      case 'upi': return 'UPI Payment';
      case 'cod': return 'Cash on Delivery';
      default: return method;
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Button>
        </div>

        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-deep-brown mb-2">
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground text-lg">
            Thank you for your order. We're preparing your fresh items now.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Info */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-deep-brown">
                  Order Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Order ID</p>
                    <p className="font-heading font-bold text-lg text-primary">{orderId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Order Date</p>
                    <p className="font-semibold">{new Date().toLocaleDateString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Method</p>
                    <p className="font-semibold">{getPaymentMethodDisplay(paymentMethod)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="font-heading font-bold text-lg text-primary">₹{orderTotal}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-deep-brown flex items-center gap-2">
                  <Clock size={20} />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={16} className="text-green-600" />
                    <p className="font-semibold text-green-800">Estimated Delivery Time</p>
                  </div>
                  <p className="text-green-700 font-bold text-lg">{deliveryTime}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Delivery Address</p>
                      <p className="text-sm text-muted-foreground">
                        {shippingInfo.fullName}<br />
                        {shippingInfo.address}<br />
                        {shippingInfo.city}, {shippingInfo.state} - {shippingInfo.pincode}
                        {shippingInfo.landmark && <><br />Near: {shippingInfo.landmark}</>}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-primary" />
                    <div>
                      <p className="font-semibold">Contact Number</p>
                      <p className="text-sm text-muted-foreground">{shippingInfo.phone}</p>
                    </div>
                  </div>

                  {shippingInfo.email && (
                    <div className="flex items-center gap-3">
                      <Mail size={16} className="text-primary" />
                      <div>
                        <p className="font-semibold">Email</p>
                        <p className="text-sm text-muted-foreground">{shippingInfo.email}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-deep-brown">
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item: any) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 aspect-square object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.packSize}</p>
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {item.category}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{item.price} × {item.quantity}</p>
                        <p className="text-sm text-muted-foreground">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Status & Actions */}
          <div className="lg:col-span-1">
            <Card className="shadow-card sticky top-8">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-deep-brown">
                  Order Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-green-700">Order Confirmed</p>
                      <p className="text-xs text-muted-foreground">Just now</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                    <div>
                      <p className="font-semibold text-yellow-700">Preparing</p>
                      <p className="text-xs text-muted-foreground">Fresh items being prepared</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-gray-500">Out for Delivery</p>
                      <p className="text-xs text-muted-foreground">Will update soon</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-gray-500">Delivered</p>
                      <p className="text-xs text-muted-foreground">Expected in {deliveryTime}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button
                    onClick={() => navigate('/shop')}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    <ShoppingBag size={16} className="mr-2" />
                    Continue Shopping
                  </Button>
                  
                  <Button
                    onClick={() => navigate('/')}
                    variant="outline"
                    className="w-full"
                  >
                    <Home size={16} className="mr-2" />
                    Back to Home
                  </Button>
                </div>

                {/* Support Info */}
                <div className="bg-warm-beige p-4 rounded-lg">
                  <h4 className="font-label font-semibold text-sm mb-2">
                    📞 Need Help?
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    Contact us for any order-related queries
                  </p>
                  <div className="space-y-1">
                    <p className="text-xs">
                      <strong>Phone:</strong> +91 80123 45678
                    </p>
                    <p className="text-xs">
                      <strong>Order ID:</strong> {orderId}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
