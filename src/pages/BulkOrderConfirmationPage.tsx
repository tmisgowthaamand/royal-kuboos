import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, Phone, Mail, Home, ShoppingBag, Building, MapPin, Package, ArrowLeft } from "lucide-react";

const BulkOrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { inquiryId, formData, product } = location.state || {};

  if (!inquiryId || !formData) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <h2 className="font-heading text-2xl font-bold text-deep-brown mb-4">
              Inquiry not found
            </h2>
            <Button onClick={() => navigate('/shop')}>
              Back to Shop
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={20} />
            Back
          </Button>
        </div>

        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-deep-brown mb-2">
            Bulk Order Request Submitted!
          </h1>
          <p className="text-muted-foreground text-lg">
            Thank you for your interest. We'll contact you within 24 hours with a customized quote.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Request Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Inquiry Information */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-deep-brown">
                  Inquiry Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Inquiry ID</p>
                    <p className="font-heading font-bold text-lg text-primary">{inquiryId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Submission Date</p>
                    <p className="font-semibold">{new Date().toLocaleDateString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Expected Response</p>
                    <p className="font-semibold">Within 24 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Information */}
            {product && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="font-heading text-xl text-deep-brown flex items-center gap-2">
                    <Package size={20} />
                    Product Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 p-4 bg-warm-beige rounded-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 aspect-square object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">{product.packSize}</p>
                      <p className="text-sm font-semibold text-primary">₹{product.price} per pack</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Requested Quantity</p>
                      <p className="font-semibold">{formData.quantity}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Business Information */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-deep-brown flex items-center gap-2">
                  <Building size={20} />
                  Business Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Business Name</p>
                    <p className="font-semibold">{formData.businessName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Contact Person</p>
                    <p className="font-semibold">{formData.contactPerson}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-semibold">{formData.phone}</p>
                  </div>
                  {formData.email && (
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-semibold">{formData.email}</p>
                    </div>
                  )}
                  {formData.businessType && (
                    <div>
                      <p className="text-sm text-muted-foreground">Business Type</p>
                      <p className="font-semibold capitalize">{formData.businessType}</p>
                    </div>
                  )}
                  {formData.gstin && (
                    <div>
                      <p className="text-sm text-muted-foreground">GSTIN</p>
                      <p className="font-semibold">{formData.gstin}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-deep-brown flex items-center gap-2">
                  <MapPin size={20} />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold">{formData.businessName}</p>
                  <p className="text-muted-foreground">{formData.address}</p>
                  <p className="text-muted-foreground">
                    {formData.city}, {formData.state} - {formData.pincode}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Order Requirements */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-deep-brown">
                  Order Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Quantity Required</p>
                    <p className="font-semibold">{formData.quantity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Supply Frequency</p>
                    <p className="font-semibold capitalize">{formData.frequency}</p>
                  </div>
                  {formData.deliveryTime && (
                    <div>
                      <p className="text-sm text-muted-foreground">Preferred Delivery Time</p>
                      <p className="font-semibold">{formData.deliveryTime.replace('-', ' ')}</p>
                    </div>
                  )}
                  {formData.expectedStartDate && (
                    <div>
                      <p className="text-sm text-muted-foreground">Expected Start Date</p>
                      <p className="font-semibold">{new Date(formData.expectedStartDate).toLocaleDateString('en-IN')}</p>
                    </div>
                  )}
                  {formData.budget && (
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Budget</p>
                      <p className="font-semibold">{formData.budget.replace('-', ' - ')}</p>
                    </div>
                  )}
                  {formData.currentSupplier && (
                    <div>
                      <p className="text-sm text-muted-foreground">Current Supplier</p>
                      <p className="font-semibold">{formData.currentSupplier}</p>
                    </div>
                  )}
                </div>
                
                {formData.specialRequirements && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Special Requirements</p>
                    <p className="text-sm bg-gray-50 p-3 rounded">{formData.specialRequirements}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Status & Actions */}
          <div className="lg:col-span-1">
            <Card className="shadow-card sticky top-8">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-deep-brown">
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-green-700">Request Submitted</p>
                      <p className="text-xs text-muted-foreground">Just now</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                    <div>
                      <p className="font-semibold text-yellow-700">Under Review</p>
                      <p className="text-xs text-muted-foreground">Our team is analyzing your requirements</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-gray-500">Quote Preparation</p>
                      <p className="text-xs text-muted-foreground">Custom pricing & terms</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-gray-500">Contact & Finalize</p>
                      <p className="text-xs text-muted-foreground">Within 24 hours</p>
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

                {/* Contact Info */}
                <div className="bg-warm-beige p-4 rounded-lg">
                  <h4 className="font-label font-semibold text-sm mb-3">
                    📞 Need Immediate Assistance?
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-primary" />
                      <a href="tel:+918012345678" className="text-sm hover:text-primary">
                        +91 80123 45678
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-primary" />
                      <a href="mailto:bulk@royalkuboos.com" className="text-sm hover:text-primary">
                        bulk@royalkuboos.com
                      </a>
                    </div>
                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground">
                        <strong>Inquiry ID:</strong> {inquiryId}
                      </p>
                    </div>
                  </div>
                </div>

                {/* What Happens Next */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-label font-semibold text-sm mb-2 text-blue-800">
                    ⏰ What Happens Next?
                  </h4>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Our team reviews your requirements</li>
                    <li>• We prepare a customized quote</li>
                    <li>• You'll receive a call within 24 hours</li>
                    <li>• We discuss terms and finalize the deal</li>
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

export default BulkOrderConfirmationPage;
