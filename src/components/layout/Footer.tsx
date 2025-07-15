import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import { useLanguage } from "@/contexts/LanguageContext";
import hiwaJamilLogo2 from 'C:/xampp/htdocs/hiwa-jamil/src/components/layout/hiwajamil.png';

const Footer = () => {
  const { getContent } = useWebsiteContent();
  const { t } = useLanguage();

  // Define social media links (replace with actual content retrieval if available)
  // Assuming your useWebsiteContent can provide these, similar to 'contact' section
  const facebookUrl = getContent('social_media', 'facebook_url', 'https://www.facebook.com/your_hiwajamil_page');
  const instagramUrl = getContent('social_media', 'instagram_url', 'https://www.instagram.com/your_hiwajamil_profile');
  
  // You might also want to get contact details like this for consistency
  const contactPhone = getContent('contact', 'phone', '+964750 805 5005');
  const contactAddressCity = getContent('contact', 'city', 'Erbil');
  const contactAddressRegion = getContent('contact', 'region', 'Kurdistan Region, Iraq');
  const contactEmail = getContent('contact', 'email', 'info@hiwajamil.com');
  const contactHoursWeekday = getContent('contact', 'hours_weekday', 'Mon - Sat: 8:00 AM - 8:00 PM');
  const contactHoursSunday = getContent('contact', 'hours_sunday', 'Sunday: 10:00 AM - 6:00 PM');


  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
          {/* Company Info */}
          <div className="space-y-8">
            <div className="w-20 h-20 flex items-center justify-center">
                <img src={hiwaJamilLogo2} alt="Hiwa Jamil Logo" className="w-full h-full object-contain rounded-lg" />
              <div> {/* This div seems misplaced around the h4 and p, might need restructuring based on desired layout */}
                <h4 className="text-lg font-bold">{getContent('footer', 'company_name', 'Hiwa Jamil')}</h4>
                <p className="text-sm text-secondary">{getContent('footer', 'company_tagline', 'Oil')}</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80">
              {getContent('footer', 'company_description', ' High Quality Oil Vender you can trust since 2009.')}
            </p>
            <div className="flex space-x-4">
              {/* Facebook Link */}
              <a 
                href={facebookUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary-foreground/60 hover:text-secondary transition-colors cursor-pointer"
                aria-label="Facebook Page"
              >
                <Facebook className="h-5 w-5" />
              </a>
              {/* Instagram Link */}
              <a 
                href={instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary-foreground/60 hover:text-secondary transition-colors cursor-pointer"
                aria-label="Instagram Profile"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{getContent('footer', 'quick_links_title', 'Quick Links')}</h4>
            <nav className="flex flex-col space-y-2">
              <NavLink to="/" className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors">
                {t("home")}
              </NavLink>
              <NavLink to="/about" className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors">
                {t("about")}
              </NavLink>
              <NavLink to="/brands" className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors">
                {t("brands")}
              </NavLink>
              <NavLink to="/contact" className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors">
                {t("contact")}
              </NavLink>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{getContent('footer', 'contact_title', 'Contact Info')}</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                <div className="text-sm text-primary-foreground/80">
                  <p>{contactAddressCity}</p>
                  <p>{contactAddressRegion}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-secondary" />
                <a href={`tel:${contactPhone.replace(/\s/g, '')}`} className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors">
                  {contactPhone}
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-secondary" />
                <a href={`mailto:${contactEmail}`} className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors">
                  {contactEmail}
                </a>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-secondary mt-0.5" />
                <div className="text-sm text-primary-foreground/80">
                  <p>{contactHoursWeekday}</p>
                  <p>{contactHoursSunday}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-primary-foreground/60">
              {getContent('footer', 'copyright', '© 2024 Hiwa Jamil Oil. All rights reserved to ISN Company.')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;