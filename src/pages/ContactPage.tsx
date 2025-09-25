import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle,
  Send,
  ArrowLeft
} from "lucide-react";

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submission:", formData);
    // Note: Form submission requires backend - will need Supabase integration
    alert("Thank you for your message! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Bakery",
      content: "No.19, MGR STREET PERIYAR NAGAR\nMADAMBAKKAM, CHENNAI - 600126",
      action: "Get Directions",
      link: "https://maps.google.com"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+91 98848 06610",
      action: "Call Now",
      link: "tel:+919884806610"
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "pramamoorthy82@gmail.com\ncontact@royalkuboos.shop",
      action: "Send Email",
      link: "mailto:pramamoorthy82@gmail.com"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      content: "Quick orders & queries\nInstant response",
      action: "Chat Now",
      link: "https://wa.me/919884806610"
    }
  ];

  const operatingHours = [
    { day: "Monday - Saturday", hours: "6:00 AM - 10:00 PM" },
    { day: "Sunday", hours: "7:00 AM - 9:00 PM" },
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

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-deep-brown mb-4">
            Get in Touch
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Have questions about our products or services? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-heading text-2xl text-deep-brown flex items-center gap-2">
                  <Send size={24} />
                  Send us a Message
                </CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
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
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="What is your message about?"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                    <Send size={16} className="mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Cards */}
            {contactInfo.map((info, index) => (
              <Card key={index} className="shadow-card hover:shadow-lifted transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <info.icon className="text-primary" size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-label font-semibold text-lg mb-2">{info.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3 whitespace-pre-line">
                        {info.content}
                      </p>
                      <a
                        href={info.link}
                        target={info.link.startsWith('http') ? '_blank' : '_self'}
                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        <Button variant="outline" size="sm">
                          {info.action}
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Operating Hours */}
            <Card className="shadow-card bg-warm-beige">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-deep-brown flex items-center gap-2">
                  <Clock size={20} />
                  Operating Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {operatingHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-label font-medium text-sm">{schedule.day}</span>
                      <span className="text-sm text-muted-foreground">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    * Fresh products are baked throughout the day
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-deep-brown">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a
                  href="https://wa.me/918012345678"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="fresh" size="sm" className="w-full">
                    <MessageCircle size={16} className="mr-2" />
                    WhatsApp Quick Order
                  </Button>
                </a>
                <a href="tel:+918012345678">
                  <Button variant="outline" size="sm" className="w-full">
                    <Phone size={16} className="mr-2" />
                    Call for Immediate Help
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-heading text-2xl text-deep-brown">
                Find Our Bakery
              </CardTitle>
              <p className="text-muted-foreground">
                Visit us at our bakery location in Madampakkam, Chennai
              </p>
            </CardHeader>
            <CardContent>
              <div className="bg-cream rounded-lg p-8 text-center">
                <MapPin size={48} className="mx-auto text-primary mb-4" />
                <h3 className="font-heading text-xl font-semibold mb-2">ROYAL KUBOOS CHENNAI</h3>
                <p className="text-muted-foreground mb-4">
                  No.19, MGR STREET PERIYAR NAGAR<br />
                  MADAMBAKKAM, CHENNAI - 600126
                </p>
                <Button variant="fresh">
                  View on Google Maps
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-deep-brown mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardContent className="p-6">
                <h3 className="font-label font-semibold mb-2">What are your delivery areas?</h3>
                <p className="text-sm text-muted-foreground">
                  We deliver across Chennai including T. Nagar, Anna Nagar, Adyar, Velachery, and surrounding areas. 
                  Contact us to confirm delivery to your location.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="p-6">
                <h3 className="font-label font-semibold mb-2">How fresh are your products?</h3>
                <p className="text-sm text-muted-foreground">
                  All our products are baked fresh daily. We start baking early morning and products are delivered 
                  the same day to ensure maximum freshness.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="p-6">
                <h3 className="font-label font-semibold mb-2">Do you offer bulk discounts?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes! We offer special pricing for bulk orders. Please use our bulk order form or contact us directly 
                  for customized quotes based on your requirements.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="p-6">
                <h3 className="font-label font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-sm text-muted-foreground">
                  We accept cash on delivery, UPI payments, net banking, and major credit/debit cards. 
                  For bulk orders, we also accept NEFT/RTGS transfers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;