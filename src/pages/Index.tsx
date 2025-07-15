import * as React from "react";
import { NavLink } from "react-router-dom";
import { ArrowRight, Car, Wrench, Shield, Clock, Star, CheckCircle, Phone, Award, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-oil-service.jpg";
import serviceBuildingImage from "@/assets/service-building.png";

const Index = () => {
  const { t } = useLanguage();
  const { getContent, getSection, loading: contentLoading } = useWebsiteContent();
  const [counters, setCounters] = React.useState({
    customers: 0,
    services: 0,
    years: 0,
    rating: 0
  });
  const [brands, setBrands] = React.useState<any[]>([]);

  // Get business stats from content
  const businessStats = getSection('business');
  const heroContent = getSection('hero');
  const aboutContent = getSection('about');
  const ctaContent = getSection('cta');

  // Parse numeric values for counters
  const customerCount = parseInt(businessStats.customers_count?.replace(/[^0-9]/g, '') || '3250');
  const servicesCount = parseInt(businessStats.services_completed?.replace(/[^0-9]/g, '') || '9750');
  const yearsCount = parseInt(businessStats.experience_years?.replace(/[^0-9]/g, '') || '4');
  const ratingValue = parseFloat(businessStats.rating || '4.9');

  // Fetch brands and animate counters on mount
  React.useEffect(() => {
    fetchBrands();
    
    const targets = { 
      customers: customerCount, 
      services: servicesCount, 
      years: yearsCount, 
      rating: ratingValue 
    };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const animateCounter = (key: keyof typeof targets, target: number) => {
      let current = 0;
      const increment = target / steps;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounters(prev => ({ ...prev, [key]: Math.floor(current * 10) / 10 }));
      }, stepDuration);
    };

    setTimeout(() => {
      Object.entries(targets).forEach(([key, target]) => {
        animateCounter(key as keyof typeof targets, target);
      });
    }, 500);
  }, [customerCount, servicesCount, yearsCount, ratingValue]);

  const fetchBrands = async () => {
    try {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setBrands(data || []);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const services = [
    {
      icon: Car,
      title: getContent('service_1', 'title', t("oilChange")),
      description: getContent('service_1', 'description', "Complete oil change service with premium quality oils"),
      details: ["Premium Oil", "Quick Service", "5-Point Check"],
      color: "bg-secondary"
    },
    {
      icon: Shield,
      title: getContent('service_2', 'title', t("filterReplacement")), 
      description: getContent('service_2', 'description', "Air and oil filter replacement services"),
      details: ["Air Filter", "Oil Filter", "Cabin Filter"],
      color: "bg-secondary/80"
    },
    {
      icon: CheckCircle,
      title: getContent('service_3', 'title', t("vehicleInspection")),
      description: getContent('service_3', 'description', "Comprehensive vehicle health check"),
      details: ["Health Check", "Diagnostics", "Report"],
      color: "bg-secondary/90"
    },
    {
      icon: Wrench,
      title: getContent('service_4', 'title', t("maintenance")),
      description: getContent('service_4', 'description', "Regular maintenance and servicing"),
      details: ["Preventive Care", "Scheduled Service", "Expert Care"],
      color: "bg-secondary/70"
    }
  ];

  const stats = [
    {
      icon: Award,
      number: "10+",
      label: t("yearsExperience")
    },
    {
      icon: Users,
      number: "3,250+",
      label: t("happyCustomers")
    },
    {
      icon: CheckCircle,
      number: "9,750+",
      label: t("servicesCompleted")
    },
    {
      icon: MapPin,
      number: "2",
      label: t("serviceLocations")
    }
  ];

  const { language } = useLanguage();
  
  const getBrandDescription = (brand: any) => {
    if (language === 'AR' && brand.description_ar) return brand.description_ar;
    if (language === 'KU' && brand.description_ku) return brand.description_ku;
    return brand.description_en || 'Premium Quality';
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 hero-gradient opacity-90"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in">
            {heroContent.title ? (
              heroContent.title.split(" ").slice(0, 1).join(" ")
            ) : (
              t("heroTitle").split(" ").slice(0, 1).join(" ")
            )}
            <span className="text-secondary block">
              {heroContent.title ? (
                heroContent.title.split(" ").slice(1, 3).join(" ")
              ) : (
                t("heroTitle").split(" ").slice(1, 3).join(" ")
              )}
            </span>
            {heroContent.title ? (
              heroContent.title.split(" ").slice(3).join(" ")
            ) : (
              t("heroTitle").split(" ").slice(3).join(" ")
            )}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed max-w-3xl mx-auto animate-fade-in">
            {getContent('hero', 'subtitle', t("heroSubtitle"))}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-in">
            <NavLink to="/contact">
              <Button size="lg" className="btn-secondary text-lg px-8 py-4 hover:scale-105 transition-all duration-300">
                <Car className="h-5 w-5 mr-2" />
                {t("bookServiceNow")}
              </Button>
            </NavLink>
            <a href="tel:+9647508055005">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/10 text-white border-white/30 hover:bg-white/20 hover:scale-105 transition-all duration-300">
                <Phone className="h-5 w-5 mr-2" />
                {getContent('hero', 'phone_button', t("callNow"))}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in">{t("whyChooseUs")}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in">
              {t("whyChooseDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className={`glass-card text-center hover:shadow-elevation transition-all duration-300 ${
                index === 0 ? 'bg-secondary text-white' :
                index === 1 ? 'bg-secondary/80 text-white' :
                index === 2 ? 'bg-secondary/90 text-white' :
                'bg-secondary/70 text-white'
              }`}>
                <CardContent className="p-8">
                  <div className="flex items-center justify-center mb-4">
                    <stat.icon className="h-12 w-12 text-white" />
                  </div>
                  <div className="text-4xl font-bold mb-2">
                    {index === 0 ? counters.years :
                     index === 1 ? Math.floor(counters.customers).toLocaleString() :
                     index === 2 ? Math.floor(counters.services).toLocaleString() :
                     counters.rating}+
                  </div>
                  <div className="text-lg font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
                {getContent('about', 'title', t("ourStory"))}
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg">
                <p className="animate-fade-in">
                  {getContent('about', 'story_text_1', t("storyText1"))}
                </p>
                <p className="animate-fade-in">
                  {getContent('about', 'story_text_2', t("storyText2"))}
                </p>
                <p className="animate-fade-in">
                  {getContent('about', 'story_text_3', t("storyText3"))}
                </p>
              </div>
              <div className="flex items-center mt-6 space-x-2 animate-fade-in">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                ))}
                <span className="text-secondary font-bold ml-2">4.9/5 {t("customerRating")}</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-secondary to-secondary-dark rounded-3xl p-12 text-white text-center animate-fade-in">
              <div className="bg-white/20 rounded-2xl p-8 mb-6 inline-block">
                <img src={serviceBuildingImage} alt="Service Building" className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{t("servingKurdistan")}</h3>
              <p className="text-white/90">{t("since2009")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Brands Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">{t("trustedBrands")}</h2>
            <p className="text-xl text-muted-foreground animate-fade-in">
              {t("brandsDesc")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {brands.map((brand, index) => (
              <div key={index} className="glass-card p-6 text-center hover:shadow-elevation transition-all duration-300">
                {brand.logo_url ? (
                  <img 
                    src={brand.logo_url} 
                    alt={brand.name}
                    className="w-12 h-12 mx-auto mb-4 object-contain"
                  />
                ) : (
                  <div className="text-4xl mb-4">🏭</div>
                )}
                <h3 className="font-semibold text-lg">{brand.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {getBrandDescription(brand)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-gradient text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in">
            {ctaContent.title ? (
              <>
                {ctaContent.title.split(" ").slice(0, -6).join(" ")}
                <span className="text-secondary block">
                  {ctaContent.title.split(" ").slice(-6).join(" ")}
                </span>
              </>
            ) : (
              <>
                {t("readyToGive")}
                <span className="text-secondary block">{t("careCTATitle")}</span>
              </>
            )}
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto animate-fade-in">
            {getContent('cta', 'description', t("careCTADesc"))}
          </p>
          
          <div className="mb-12">
            <NavLink to="/contact">
              <Button size="lg" className="btn-secondary text-lg px-8 py-4 hover:scale-105 transition-all duration-300 animate-fade-in">
                {getContent('hero', 'cta_button', t("bookServiceNow"))}
              </Button>
            </NavLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="glass-card hover:shadow-elevation transition-all duration-300">
              <CardContent className="p-8">
                <div className="bg-secondary rounded-2xl p-6 mb-6">
                  <Phone className="h-12 w-12 text-white mx-auto" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">{t("callNow")}</h3>
                <p className="text-muted-foreground mb-4">{t("speakWithTeam")}</p>
                <a href="tel:+9647508055005" className="bg-muted/50 rounded-lg p-4 block hover:bg-muted/70 transition-colors">
                  <p className="font-bold text-foreground">+964750 805 5005</p>
                </a>
              </CardContent>
            </Card>

            <Card className="glass-card hover:shadow-elevation transition-all duration-300">
              <CardContent className="p-8">
                <div className="bg-secondary/80 rounded-2xl p-6 mb-6">
                  <Clock className="h-12 w-12 text-white mx-auto" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">Work Hours</h3>
                <p className="text-muted-foreground mb-4">{t("Mon-Sat: 8:00AM - 8:00PM -- Sunday: 10:00AM - 6:00PM")}</p>
                <NavLink to="/contact" className="bg-muted/50 rounded-lg p-4 block hover:bg-muted/70 transition-colors hover:scale-105 duration-200">
                  <p className="font-bold text-foreground">{t("bookAppointment")}</p>
                </NavLink>
              </CardContent>
            </Card>

            <Card className="glass-card hover:shadow-elevation transition-all duration-300">
              <CardContent className="p-8">
                <div className="bg-secondary/70 rounded-2xl p-6 mb-6">
                  <MapPin className="h-12 w-12 text-white mx-auto" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">{t("visitUs")}</h3>
                <p className="text-muted-foreground mb-4">{t("findLocation")}</p>
                <NavLink to="/contact" className="bg-muted/50 rounded-lg p-4 block hover:bg-muted/70 transition-colors hover:scale-105 duration-200">
                  <p className="font-bold text-foreground">{t("getDirections")}</p>
                </NavLink>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="glass-card">
              <CardContent className="p-8 text-left">
                <div className="flex items-center mb-4">
                  <Clock className="h-8 w-8 text-secondary mr-3" />
                  <h3 className="text-xl font-bold text-foreground">{t("businessHours")}</h3>
                </div>
                <div className="bg-secondary/20 rounded-lg p-4">
                  <p className="text-secondary font-bold">🟢 {t("nowOpen")}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-8 text-left">
                <div className="flex items-center mb-4">
                  <MapPin className="h-8 w-8 text-secondary mr-3" />
                  <h3 className="text-xl font-bold text-foreground">{t("location")}</h3>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-secondary font-bold">{t("nearCentralMarket")}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
