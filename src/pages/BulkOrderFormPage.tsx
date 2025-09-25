import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Building, 
  Phone, 
  Mail, 
  MapPin,
  Package,
  Clock,
  Truck,
  Shield,
  Star,
  CheckCircle
} from "lucide-react";

const BulkOrderFormPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const productData = location.state?.product;

  const [formData, setFormData] = useState({
    // Business Information
    businessName: "",
    contactPerson: "",
    phone: "",
    email: "",
    businessType: "",
    gstin: "",
    address: "",
    city: "",
    state: "Tamil Nadu",
    pincode: "",
    
    // Product & Order Details
    productId: productData?.id || "",
    productName: productData?.name || "",
    quantity: "",
    frequency: "",
    deliveryTime: "",
    specialRequirements: "",
    
    // Additional Info
    expectedStartDate: "",
    budget: "",
    currentSupplier: ""
  });

  useEffect(() => {
    if (productData) {
      setFormData(prev => ({
        ...prev,
        productId: productData.id,
        productName: productData.name
      }));
    }
  }, [productData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = [
      'businessName', 'contactPerson', 'phone', 'address', 
      'city', 'pincode', 'quantity', 'frequency'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in: ${missingFields.join(', ')}`);
      return;
    }

    // Generate inquiry ID
    const inquiryId = `BLK${Date.now().toString().slice(-6)}`;
    
    // Navigate to confirmation page
    navigate('/bulk-order-confirmation', { 
      state: { 
        inquiryId, 
        formData,
        product: productData
      } 
    });
  };

  const benefits = [
    {
      icon: Clock,
      title: "Daily Fresh Supply",
      description: "Fresh products delivered every morning"
    },
    {
      icon: Truck,
      title: "Reliable Delivery",
      description: "On-time delivery to your location"
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Consistent quality and hygiene standards"
    },
    {
      icon: Star,
      title: "Competitive Pricing",
      description: "Best wholesale rates for bulk orders"
    }
  ];

  if (!productData) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <h2 className="font-heading text-2xl font-bold text-deep-brown mb-4">
              Product information not found
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
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/shop')}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Shop
          </Button>
          <div>
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-deep-brown">
              Bulk Order Request
            </h1>
            <p className="text-muted-foreground">
              Get wholesale pricing for your business needs
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-heading text-2xl text-deep-brown flex items-center gap-2">
                  <Package size={24} />
                  Bulk Order Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Product Information */}
                  <div className="space-y-4">
                    <h3 className="font-label font-semibold text-lg flex items-center gap-2">
                      <Package size={20} />
                      Product Information
                    </h3>
                    
                    <div className="bg-warm-beige p-4 rounded-lg">
                      <div className="flex items-center gap-4">
                        <img
                          src={productData.image}
                          alt={productData.name}
                          className="w-16 aspect-square object-cover rounded"
                        />
                        <div>
                          <h4 className="font-semibold text-lg">{productData.name}</h4>
                          <p className="text-sm text-muted-foreground">{productData.packSize}</p>
                          <p className="text-sm font-semibold text-primary">₹{productData.price} per pack</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Business Information */}
                  <div className="space-y-4">
                    <h3 className="font-label font-semibold text-lg flex items-center gap-2">
                      <Building size={20} />
                      Business Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="businessName">Business Name *</Label>
                        <Input
                          id="businessName"
                          value={formData.businessName}
                          onChange={(e) => handleInputChange("businessName", e.target.value)}
                          placeholder="Your restaurant/hotel name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactPerson">Contact Person *</Label>
                        <Input
                          id="contactPerson"
                          value={formData.contactPerson}
                          onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                          placeholder="Your name"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+91 98765 43210"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="business@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="businessType">Business Type</Label>
                        <Select value={formData.businessType} onValueChange={(value) => handleInputChange("businessType", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hotel">Hotel</SelectItem>
                            <SelectItem value="restaurant">Restaurant</SelectItem>
                            <SelectItem value="catering">Catering Service</SelectItem>
                            <SelectItem value="event">Event Management</SelectItem>
                            <SelectItem value="mess">Mess/Canteen</SelectItem>
                            <SelectItem value="retail">Retail Store</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="gstin">GSTIN (Optional)</Label>
                        <Input
                          id="gstin"
                          value={formData.gstin}
                          onChange={(e) => handleInputChange("gstin", e.target.value)}
                          placeholder="27AABCU9603R1ZX"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Address Information */}
                  <div className="space-y-4">
                    <h3 className="font-label font-semibold text-lg flex items-center gap-2">
                      <MapPin size={20} />
                      Delivery Address
                    </h3>
                    
                    <div>
                      <Label htmlFor="address">Complete Address *</Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="Complete delivery address"
                        required
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          placeholder="Chennai"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
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
                          value={formData.pincode}
                          onChange={(e) => handleInputChange("pincode", e.target.value)}
                          placeholder="600001"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Order Requirements */}
                  <div className="space-y-4">
                    <h3 className="font-label font-semibold text-lg">Order Requirements</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="quantity">Daily Quantity Required *</Label>
                        <Input
                          id="quantity"
                          value={formData.quantity}
                          onChange={(e) => handleInputChange("quantity", e.target.value)}
                          placeholder="e.g., 50 pieces per day"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="frequency">Supply Frequency *</Label>
                        <Select value={formData.frequency} onValueChange={(value) => handleInputChange("frequency", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="How often?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="occasion">Special Occasions</SelectItem>
                            <SelectItem value="custom">Custom Schedule</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="deliveryTime">Preferred Delivery Time</Label>
                        <Select value={formData.deliveryTime} onValueChange={(value) => handleInputChange("deliveryTime", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="early-morning">Early Morning (5-7 AM)</SelectItem>
                            <SelectItem value="morning">Morning (7-10 AM)</SelectItem>
                            <SelectItem value="afternoon">Afternoon (12-3 PM)</SelectItem>
                            <SelectItem value="evening">Evening (5-7 PM)</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="expectedStartDate">Expected Start Date</Label>
                        <Input
                          id="expectedStartDate"
                          type="date"
                          value={formData.expectedStartDate}
                          onChange={(e) => handleInputChange("expectedStartDate", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="budget">Monthly Budget Range</Label>
                        <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-10k">Under ₹10,000</SelectItem>
                            <SelectItem value="10k-25k">₹10,000 - ₹25,000</SelectItem>
                            <SelectItem value="25k-50k">₹25,000 - ₹50,000</SelectItem>
                            <SelectItem value="50k-100k">₹50,000 - ₹1,00,000</SelectItem>
                            <SelectItem value="above-100k">Above ₹1,00,000</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="currentSupplier">Current Supplier (Optional)</Label>
                        <Input
                          id="currentSupplier"
                          value={formData.currentSupplier}
                          onChange={(e) => handleInputChange("currentSupplier", e.target.value)}
                          placeholder="Current supplier name"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="specialRequirements">Special Requirements</Label>
                      <Textarea
                        id="specialRequirements"
                        value={formData.specialRequirements}
                        onChange={(e) => handleInputChange("specialRequirements", e.target.value)}
                        placeholder="Any specific requirements, packaging needs, quality standards, etc."
                        rows={4}
                      />
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                    Submit Bulk Order Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Benefits */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-deep-brown">
                  Why Choose Us for Bulk Orders?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="text-primary" size={18} />
                      </div>
                      <div>
                        <h4 className="font-label font-semibold text-sm mb-1">{benefit.title}</h4>
                        <p className="text-xs text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="shadow-card bg-warm-beige">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-deep-brown">
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="text-primary" size={18} />
                    <div>
                      <p className="font-label font-semibold text-sm">Call Us</p>
                      <a href="tel:+919884806610" className="text-sm text-muted-foreground hover:text-primary">
                        +91 98848 06610
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="text-primary" size={18} />
                    <div>
                      <p className="font-label font-semibold text-sm">Email Us</p>
                      <a href="mailto:pramamoorthy82@gmail.com" className="text-sm text-muted-foreground hover:text-primary">
                        pramamoorthy82@gmail.com
                      </a>
                      <br />
                      <a href="mailto:contact@royalkuboos.shop" className="text-sm text-muted-foreground hover:text-primary">
                        contact@royalkuboos.shop
                      </a>
                    </div>
                  </div>
                  <div className="pt-2">
                    <a
                      href="https://wa.me/919884806610"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="fresh" size="sm" className="w-full">
                        WhatsApp for Quick Response
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Process Steps */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-deep-brown">
                  Our Process
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Submit Request</p>
                      <p className="text-xs text-muted-foreground">Fill out the detailed form</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <div>
                      <p className="font-semibold text-sm">We Contact You</p>
                      <p className="text-xs text-muted-foreground">Within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Custom Quote</p>
                      <p className="text-xs text-muted-foreground">Tailored pricing & terms</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                      4
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Start Supply</p>
                      <p className="text-xs text-muted-foreground">Fresh daily delivery</p>
                    </div>
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

export default BulkOrderFormPage;
