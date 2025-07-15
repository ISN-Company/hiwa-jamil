import * as React from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Phone, MapPin, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import { SmoothCard } from "@/components/ui/smooth-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// 1. Import your logo image
import hiwaJamilLogo from 'C:/xampp/htdocs/hiwa-jamil/src/components/layout/hiwajamil.png'; // Adjust path if logo is in a subfolder, e.g., './assets/hiwa-jamil.png'

interface Brand {
  id: string;
  name: string;
  is_active: boolean;
}

const Header = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [brands, setBrands] = React.useState<Brand[]>([]);
  const { language, setLanguage, t } = useLanguage();
  const { getContent } = useWebsiteContent();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const { data, error } = await supabase
        .from('brands')
        .select('id, name, is_active')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setBrands(data || []);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  // Reorder the navItems array for desktop and mobile
  const navItems = [
    { name: t("home"), path: "/" },
    // Brands will be handled separately as a dropdown
    { name: t("about"), path: "/about" },
    { name: t("contact"), path: "/contact" },
  ];


  const languages = [
    { code: "EN", name: "English", flag: "🇺🇸" },
    { code: "AR", name: "العربية", flag: "🇸🇦" },
    { code: "KU", name: "کوردی", flag: "🇮🇶" },
  ];

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>{getContent('contact', 'phone', '+964750 805 5005')}</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>{getContent('contact', 'address', 'Erbil, Kurdistan Region, Iraq')}</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>{getContent('header', 'tagline', 'High Quality Oil Since 2009')}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "glass-card backdrop-blur-md bg-background/80 shadow-lg"
            : "bg-transparent"
        )}
        style={{ top: "40px" }} // Account for top info bar
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <NavLink to="/" className="flex items-center space-x-3">
              {/* 2. Replace the div with the img tag */}
              <div className="w-12 h-12 flex items-center justify-center">
                <img src={hiwaJamilLogo} alt="Hiwa Jamil Logo" className="w-full h-full object-contain rounded-lg" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-foreground">
                  {getContent('header', 'company_name', 'Hiwa Jamil')}
                </h1>
                <p className="text-sm text-secondary font-medium">{getContent('header', 'company_tagline', 'High Quality Oil')}</p>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {/* Home */}
              <NavLink
                key="home"
                to="/"
                className={({ isActive }) =>
                  cn(
                    "font-medium transition-colors duration-200 hover:text-secondary",
                    isActive
                      ? "text-secondary font-semibold"
                      : "text-foreground"
                  )
                }
              >
                {t("home")}
              </NavLink>

              {/* Brands Dropdown - Moved here */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-1 font-medium text-foreground hover:text-secondary transition-colors">
                  <span>{t("brands")}</span>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-background border border-border shadow-lg">
                  {brands.map((brand) => (
                    <DropdownMenuItem key={brand.id} asChild>
                      <NavLink
                        to={`/brands?brand=${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                      >
                        {brand.name}
                      </NavLink>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* About */}
              <NavLink
                key="about"
                to="/about"
                className={({ isActive }) =>
                  cn(
                    "font-medium transition-colors duration-200 hover:text-secondary",
                    isActive
                      ? "text-secondary font-semibold"
                      : "text-foreground"
                  )
                }
              >
                {t("about")}
              </NavLink>

              {/* Contact */}
              <NavLink
                key="contact"
                to="/contact"
                className={({ isActive }) =>
                  cn(
                    "font-medium transition-colors duration-200 hover:text-secondary",
                    isActive
                      ? "text-secondary font-semibold"
                      : "text-foreground"
                  )
                }
              >
                {t("contact")}
              </NavLink>
              
              {/* Language Dropdown - Keep at the end */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-1 font-medium text-foreground hover:text-secondary transition-colors">
                  <Globe className="h-4 w-4" />
                  <span>{language}</span>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40 bg-background border border-border shadow-lg">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code as any)}
                      className="w-full px-3 py-2 text-sm hover:bg-muted transition-colors cursor-pointer"
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass-card backdrop-blur-md bg-background/95 border-t border-border animate-fade-in">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {/* Home - Mobile */}
                <NavLink
                    key="home-mobile"
                    to="/"
                    className={({ isActive }) =>
                      cn(
                        "font-medium py-2 px-4 rounded-lg transition-colors duration-200",
                        isActive
                          ? "bg-secondary text-secondary-foreground"
                          : "text-foreground hover:bg-muted"
                      )
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    {t("home")}
                </NavLink>

                {/* Mobile Brands Section - Moved here */}
                <div className="py-2">
                  <p className="font-medium text-foreground px-4 mb-2">{t("brands")}</p>
                  {brands.map((brand) => (
                    <NavLink
                      key={brand.id}
                      to={`/brands?brand=${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block py-2 px-8 text-sm text-muted-foreground hover:bg-muted rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {brand.name}
                    </NavLink>
                  ))}
                </div>

                {/* About - Mobile */}
                <NavLink
                    key="about-mobile"
                    to="/about"
                    className={({ isActive }) =>
                      cn(
                        "font-medium py-2 px-4 rounded-lg transition-colors duration-200",
                        isActive
                          ? "bg-secondary text-secondary-foreground"
                          : "text-foreground hover:bg-muted"
                      )
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    {t("about")}
                </NavLink>

                {/* Contact - Mobile */}
                <NavLink
                    key="contact-mobile"
                    to="/contact"
                    className={({ isActive }) =>
                      cn(
                        "font-medium py-2 px-4 rounded-lg transition-colors duration-200",
                        isActive
                          ? "bg-secondary text-secondary-foreground"
                          : "text-foreground hover:bg-muted"
                      )
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    {t("contact")}
                </NavLink>

                {/* Mobile Language Section - Keep at the end */}
                <div className="py-2">
                  <p className="font-medium text-foreground px-4 mb-2">Language</p>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as any);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left py-2 px-8 text-sm text-muted-foreground hover:bg-muted rounded-lg transition-colors"
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </button>
                  ))}
                </div>

                <NavLink to="/contact">
                  <Button className="btn-enhanced bg-gradient-to-r from-primary to-primary-glow w-full mt-4" onClick={() => setIsMobileMenuOpen(false)}>
                    {t("bookService")}
                  </Button>
                </NavLink>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;