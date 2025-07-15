import * as React from "react";
import { MapPin, Phone, Mail, Clock, Send, Calendar, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";

const Contact = () => {
  const { getContent, getSection } = useWebsiteContent();
  const contactSection = getSection('contact');
  
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    vehicleType: "",
    message: "",
    preferredDate: "",
    preferredTime: ""
  });

  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      vehicleType: "",
      message: "",
      preferredDate: "",
      preferredTime: ""
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      details: [contactSection?.address || "Erbil", "Kurdistan Region, Iraq"],
      action: "Get Directions"
    },
    {
      icon: Phone,
      title: "Phone Number",
      details: [contactSection?.phone_number || "+964750 805 5005", contactSection?.phone_secondary || "+964750 805 5005"],
      action: "Call Now"
    },
    {
      icon: Mail,
      title: "Email Address",
      details: [contactSection?.email || "info@hiwajamil.com", contactSection?.email_secondary || "service@hiwajamil.com"],
      action: "Send Email"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [contactSection?.hours || "Mon-Sat: 8:00 AM - 8:00 PM", contactSection?.hours_sunday || "Sunday: 10:00 AM - 6:00 PM"],
      action: "Book Now"
    }
  ];

  const vehicleTypes = [
    "Car",
    "Motorcycle",
    "Truck",
    "SUV",
    "Van",
    "Commercial Vehicle"
  ];

  const timeSlots = [
    "8:00 AM - 9:00 AM",
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
    "6:00 PM - 7:00 PM",
    "7:00 PM - 8:00 PM"
  ];

  // Updated Google Maps embed URL
  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3221.758183623523!2d43.98447277712521!3d36.14810070418426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40073d004b3fb62f%3A0x6c8a65b3f462f5c6!2z2qnbhtmF2b7Yp9mG24zYp9uMINmH24zZiNinINis2YXbjNmEIC0g2Kfaqdiz2YQgSGl3YSBqYW1lZWwgY29tcGFueSAtIEF4Y2w!5e0!3m2!1sen!2siq!4v1752567882037!5m2!1sen!2siq";

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {contactSection?.title || "Contact Us"}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
            {contactSection?.subtitle || "Get in touch for professional oil"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+9647508055005">
              <Button size="lg" className="btn-secondary text-lg px-8 py-4 hover:scale-105 transition-all duration-300">
                <Phone className="h-5 w-5 mr-2" />
                Call Now
              </Button>
            </a>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-4 bg-primary-foreground text-primary border-primary-foreground hover:bg-primary-foreground/90 hover:scale-105 transition-all duration-300"
              onClick={() => document.getElementById('message')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              Send Message
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="glass-card text-center hover:shadow-elevation transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <info.icon className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-muted-foreground">{detail}</p>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full hover:scale-105 transition-all duration-300"
                    onClick={() => {
                      if (info.title === "Phone Number") {
                        window.open(`tel:${info.details[0]}`, '_self');
                      } else if (info.title === "Email Address") {
                        window.open(`mailto:${info.details[0]}`, '_self');
                      } else if (info.title === "Our Location") {
                        // Open Google Maps for directions
                        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(info.details[0] + ', ' + info.details[1])}`, '_blank');
                      } else {
                      }
                    }}
                  >
                    {info.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Send className="h-6 w-6 mr-3 text-secondary" />
                    {contactSection?.form_title || "Send Us a Message"}
                  </CardTitle>
                  <CardDescription>
                    {contactSection?.form_subtitle || "Fill out the form below and we'll get back to you within 24 hours"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+964750 805 5005"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vehicleType">Vehicle Type</Label>
                        <Select onValueChange={(value) => handleSelectChange("vehicleType", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                          <SelectContent>
                            {vehicleTypes.map(type => (
                              <SelectItem key={type} value={type.toLowerCase()}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="preferredDate">Preferred Date</Label>
                        <Input
                          id="preferredDate"
                          name="preferredDate"
                          type="date"
                          value={formData.preferredDate}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="preferredTime">Preferred Time</Label>
                        <Select onValueChange={(value) => handleSelectChange("preferredTime", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time slot" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map(time => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your vehicle and any specific requirements..."
                        rows={4}
                      />
                    </div>

                    <Button type="submit" className="w-full btn-primary text-lg py-3">
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Map Section */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-6 w-6 mr-3 text-secondary" />
                    Our Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Google Map iframe */}
                  <div className="rounded-lg overflow-hidden h-64 w-full">
                    <iframe
                      src={googleMapsEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Our Location on Google Maps" // Added for accessibility
                    ></iframe>
                  </div>
                  <Button 
                    className="w-full mt-4 btn-secondary hover:scale-105 transition-all duration-300"
                    onClick={() => window.open(`https://maps.app.goo.gl/k99uY3NRJCQF5Pus7`, '_blank')}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Booking */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-6 w-6 mr-3 text-secondary" />
                    Quick Booking
                  </CardTitle>
                  <CardDescription>
                    Need immediate service? Call us or book online
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <a href="tel:+9647508055005">
                      <Button className="w-full btn-primary hover:scale-105 transition-all duration-300">
                        <Phone className="h-4 w-4 mr-2" />
                        Call {contactSection?.phone_number || "+964750 805 5005"}
                      </Button>
                    </a>
                    <Button 
                      variant="outline" 
                      className="w-full hover:scale-105 transition-all duration-300"
                      onClick={() => document.getElementById('preferredDate')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Online
                    </Button>
                  </div>
                  
                  <div className="mt-6 p-4 bg-secondary/10 rounded-lg">
                    <h4 className="font-semibold text-secondary mb-2">Walk-in Welcome!</h4>
                    <p className="text-sm text-muted-foreground">
                      No appointment needed. We accept walk-in customers during business hours.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Need Quick Answers?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Check our frequently asked questions or contact us directly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">What are your hours?</CardTitle>
              </CardHeader>
                <CardContent>
                <p className="text-muted-foreground">
                  {contactSection?.hours || "Monday-Saturday: 8:00 AM - 8:00 PM"}<br />
                  {contactSection?.hours_sunday || "Sunday: 10:00 AM - 6:00 PM"}
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Do I need an appointment?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No appointment needed! We welcome walk-ins, but appointments ensure faster service.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We accept cash, credit cards, and mobile payments for your convenience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;