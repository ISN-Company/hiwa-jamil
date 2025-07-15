import { Shield, Award, Users, Clock, Star, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { getContent, getSection } = useWebsiteContent();
  const { language } = useLanguage();

  const businessSection = getSection('business');
  const aboutSection = getSection('about');
  const contactSection = getSection('contact');

  const stats = [
    { icon: Users, label: "Happy Customers", value: businessSection?.customers_count || "5000+", suffix: "" },
    { icon: Clock, label: "Years Experience", value: businessSection?.experience_years || "4+", suffix: "" },
    { icon: Award, label: "Oil Sold", value: businessSection?.services_completed || "15000+", suffix: "" },
    { icon: Star, label: "Average Rating", value: businessSection?.rating || "4.9", suffix: "/5" }
  ];

  const values = [
    {
      icon: Shield,
      title: aboutSection?.value_1_title || "Quality Assurance",
      description: aboutSection?.value_1_description || "We use only premium quality oils and parts from trusted brands to ensure your vehicle's optimal performance."
    },
    {
      icon: Clock,
      title: aboutSection?.value_2_title || "Fast & Efficient",
      description: aboutSection?.value_2_description || "Our streamlined process ensures quick service without compromising quality, getting you back on the road fast."
    },
    {
      icon: Award,
      title: aboutSection?.value_3_title || "Professional Expertise",
      description: aboutSection?.value_3_description || "Our certified technicians have years of experience servicing all types of vehicles with precision and care."
    },
    {
      icon: Users,
      title: aboutSection?.value_4_title || "Customer Focused",
      description: aboutSection?.value_4_description || "Your satisfaction is our priority. We provide transparent service and competitive pricing for every customer."
    }
  ];

  const team = [
    {
      name: aboutSection?.team_member_1_name || "Hiwa Jamil",
      role: aboutSection?.team_member_1_role || "Founder & Lead Technician",
      description: aboutSection?.team_member_1_description || "With over 10 years in automotive service, Hiwa founded our company to provide reliable, High Quality Oil.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: aboutSection?.team_member_2_name || "Ahmad Hassan",
      role: aboutSection?.team_member_2_role || "Senior Technician",
      description: aboutSection?.team_member_2_description || "High Quality Oil  Since 2009.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: aboutSection?.team_member_3_name || "Sara Mohammed",
      role: aboutSection?.team_member_3_role || "Customer Service Manager",
      description: aboutSection?.team_member_3_description || "Ensures every customer receives exceptional service and support throughout their visit.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  const certifications = [
    "ASE Certified Technicians",
    "Environmental Compliance",
    "Quality Management System",
    "Customer Service Excellence",
    "Safety Standards Certified"
  ];

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {aboutSection?.hero_title || "About Hiwa Jamil Oil"}
              </h1>
              <p className="text-xl mb-8 text-primary-foreground/90">
                {aboutSection?.hero_subtitle || "Your trusted partner for professional vehicle maintenance in Erbil. We've been serving the Kurdistan Region with quality oil since 2020."}
              </p>
              <NavLink to="/contact">
                <Button size="lg" className="btn-secondary text-lg px-8 py-4 hover:scale-105 transition-all duration-300">
                  {contactSection?.title || "Contact Us Today"}
                </Button>
              </NavLink>
            </div>
            <div className="relative">
              <div className="glass-card p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-primary-foreground/80">
                  {aboutSection?.mission_text || "To provide reliable, professional and High Quality Oil that keep your vehicles running smoothly and safely on Kurdistan's roads."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="glass-card text-center hover:shadow-elevation transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2 counter">
                    {stat.value}{stat.suffix}
                  </div>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">{aboutSection?.title || "Chairman Message"}</h2>
              <p className="text-lg text-muted-foreground mb-6">
                {aboutSection?.story_text_1 || "Founded in 2009 by Hiwa Jamil, our company began with a simple mission: to provide the Kurdistan Region with professional."}
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                {aboutSection?.story_text_2 || "Starting as a small operation, we've grown to become one of Erbil's most trusted oil service providers, serving thousands of satisfied customers across the region."}
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                {aboutSection?.story_text_3 || "Today, we continue to uphold our founding principles of quality, reliability, and customer satisfaction in every service we provide."}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-secondary" />
                    <span className="text-sm font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="src/assets/Chairman .jpg"
                alt="Our modern service facility"
                className="rounded-2xl shadow-elevation w-full h-96 object-cover"/>
              <div className="absolute -bottom-6 -right-6 glass-card p-6 max-w-xs bg-background/90">
                <h4 className="font-bold text-lg mb-2">Modern Facility</h4>
                <p className="text-sm text-muted-foreground">
                  State-of-the-art equipment and clean, organized workspace
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">{aboutSection?.why_choose_title || "Why Choose Us"}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {aboutSection?.why_choose_subtitle || "We're committed to providing exceptional service through our core values and principles"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="glass-card text-center hover:shadow-elevation transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-gradient text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Experience the Difference
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Join thousands of satisfied customers who trust us with their vehicle maintenance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NavLink to="/contact">
              <Button size="lg" className="btn-secondary text-lg px-8 py-4 hover:scale-105 transition-all duration-300">
                Book Your Service
              </Button>
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;