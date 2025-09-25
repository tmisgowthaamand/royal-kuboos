import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Building, 
  Phone, 
  Mail, 
  CheckCircle, 
  Clock,
  Truck,
  Shield,
  Star,
  ArrowLeft
} from "lucide-react";

const BulkOrdersPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: "",
    contactPerson: "",
    phone: "",
    email: "",
    businessType: "",
    gstin: "",
    address: "",
    productType: "",
    quantity: "",
    frequency: "",
    message: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Bulk order inquiry:", formData);
    // Note: Form submission requires backend - will need Supabase integration
    
    // Generate inquiry ID for tracking
    const inquiryId = `BLK${Date.now().toString().slice(-6)}`;
    
    alert(`Thank you for your inquiry! 
    
Inquiry ID: ${inquiryId}
We'll contact you within 24 hours with a customized quote.

For immediate assistance, call +91 80123 45678`);
    
    // Reset form
    setFormData({
      businessName: "",
      contactPerson: "",
      phone: "",
      email: "",
      businessType: "",
      gstin: "",
      address: "",
      productType: "",
      quantity: "",
      frequency: "",
      message: ""
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

  const testimonials = [
    {
      business: "Hotel Saravana Bhavan",
      location: "Anna Nagar",
      feedback: "Royal Kuboos has been our trusted supplier for 2 years. Always fresh, always on time."
    },
    {
      business: "Green Park Restaurant",
      location: "T. Nagar", 
      feedback: "Excellent quality kuboos and chapati. Our customers love the authentic taste."
    }
  ];

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

        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-accent text-accent-foreground">
            B2B Solutions
          </Badge>
          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-deep-brown mb-4">
            Daily Supply for Hotels, Caterers & Events
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Partner with Royal Kuboos for your bulk bread requirements. We supply fresh kuboos, 
            chapati, and parotta to 50+ restaurants and hotels across Chennai.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Inquiry Form */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-heading text-2xl text-deep-brown flex items-center gap-2">
                <Building size={24} />
                Get Bulk Quote
              </CardTitle>
              <p className="text-muted-foreground">
                Fill out this form and we'll contact you within 24 hours with a customized quote.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Business Information */}
                <div className="space-y-4">
                  <h3 className="font-label font-semibold text-lg">Business Information</h3>
                  
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <div>
                      <Label htmlFor="businessType">Business Type *</Label>
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
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                  <div>
                    <Label htmlFor="gstin">GSTIN (Optional)</Label>
                    <Input
                      id="gstin"
                      value={formData.gstin}
                      onChange={(e) => handleInputChange("gstin", e.target.value)}
                      placeholder="27AABCU9603R1ZX"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Delivery Address *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Complete delivery address"
                      required
                    />
                  </div>
                </div>

                {/* Order Requirements */}
                <div className="space-y-4">
                  <h3 className="font-label font-semibold text-lg">Order Requirements</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="productType">Product Type *</Label>
                      <Select value={formData.productType} onValueChange={(value) => handleInputChange("productType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select products" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kuboos">Kuboos</SelectItem>
                          <SelectItem value="chapati">Chapati</SelectItem>
                          <SelectItem value="parotta">Parotta</SelectItem>
                          <SelectItem value="mixed">Mixed Products</SelectItem>
                          <SelectItem value="all">All Products</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="quantity">Daily Quantity *</Label>
                      <Input
                        id="quantity"
                        value={formData.quantity}
                        onChange={(e) => handleInputChange("quantity", e.target.value)}
                        placeholder="e.g., 50 pieces per day"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="frequency">Supply Frequency *</Label>
                    <Select value={formData.frequency} onValueChange={(value) => handleInputChange("frequency", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="How often do you need delivery?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="occasion">Special Occasions</SelectItem>
                        <SelectItem value="custom">Custom Schedule</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Additional Requirements</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Any specific requirements, delivery timings, or questions..."
                      rows={3}
                    />
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                  Submit Inquiry
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Benefits & Testimonials */}
          <div className="space-y-8">
            {/* Why Choose Us */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-deep-brown">
                  Why Businesses Choose Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="text-primary" size={20} />
                      </div>
                      <div>
                        <h4 className="font-label font-semibold mb-1">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Testimonials */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-deep-brown">
                  What Our Partners Say
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4">
                      <p className="text-sm text-muted-foreground mb-2 italic">
                        "{testimonial.feedback}"
                      </p>
                      <div>
                        <p className="font-label font-semibold text-sm">{testimonial.business}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="shadow-card bg-warm-beige">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-deep-brown">
                  Need Immediate Assistance?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="text-primary" size={20} />
                    <div>
                      <p className="font-label font-semibold">Call Us Directly</p>
                      <a href="tel:+919884806610" className="text-sm text-muted-foreground hover:text-primary">
                        +91 98848 06610
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="text-primary" size={20} />
                    <div>
                      <p className="font-label font-semibold">Email Us</p>
                      <a href="mailto:pramamoorthy82@gmail.com" className="text-sm text-muted-foreground hover:text-primary">
                        pramamoorthy82@gmail.com
                      </a>
                      <br />
                      <a href="mailto:contact@royalkuboos.shop" className="text-sm text-muted-foreground hover:text-primary">
                        contact@royalkuboos.shop
                      </a>
                    </div>
                  </div>
                  <div className="pt-4">
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
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 py-12 bg-gradient-fresh text-white rounded-2xl">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl lg:text-3xl font-bold mb-2">
                Trusted by Chennai's Best
              </h2>
              <p className="text-white/90">
                Join the growing family of businesses that trust Royal Kuboos
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-heading font-bold mb-2">50+</div>
                <div className="text-sm text-white/80">Partner Restaurants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold mb-2">1000+</div>
                <div className="text-sm text-white/80">Daily Orders</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold mb-2">99%</div>
                <div className="text-sm text-white/80">On-Time Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold mb-2">2+</div>
                <div className="text-sm text-white/80">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkOrdersPage;