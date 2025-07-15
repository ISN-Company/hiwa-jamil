import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  LayoutDashboard, 
  Package, 
  Building2, 
  Users, 
  Settings, 
  UserCog,
  Globe,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { X } from 'lucide-react';

interface AdminSidebarProps {
  onClose?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onClose }) => {
  const { profile, signOut, hasRole, isAdmin } = useAuth();
  const { language } = useLanguage();
  const location = useLocation();

  const translations = {
    EN: {
      dashboard: 'Dashboard',
      products: 'Products',
      brands: 'Brands',
      partners: 'Partners',
      content: 'Website Content',
      users: 'User Management',
      settings: 'Settings',
      logout: 'Logout'
    },
    AR: {
      dashboard: 'لوحة القيادة',
      products: 'المنتجات',
      brands: 'العلامات التجارية',
      partners: 'الشركاء',
      content: 'محتوى الموقع',
      users: 'إدارة المستخدمين',
      settings: 'الإعدادات',
      logout: 'تسجيل الخروج'
    },
    KU: {
      dashboard: 'داشبۆرد',
      products: 'بەرهەمەکان',
      brands: 'برێندەکان',
      partners: 'هاوبەشەکان',
      content: 'ناوەڕۆکی ماڵپەڕ',
      users: 'بەڕێوەبردنی بەکارهێنەران',
      settings: 'رێکخستنەکان',
      logout: 'دەرچوون'
    }
  };

  const texts = translations[language];
  const isRTL = language === 'AR' || language === 'KU';

  const navigationItems = [
    {
      name: texts.dashboard,
      href: '/admin/dashboard',
      icon: LayoutDashboard,
      roles: ['admin', 'owner', 'user']
    },
    {
      name: texts.products,
      href: '/admin/products',
      icon: Package,
      roles: ['admin', 'owner', 'user']
    },
    {
      name: texts.brands,
      href: '/admin/brands',
      icon: Building2,
      roles: ['admin', 'owner', 'user']
    },
    {
      name: texts.partners,
      href: '/admin/partners',
      icon: Users,
      roles: ['admin', 'owner']
    },
    {
      name: texts.content,
      href: '/admin/content',
      icon: Globe,
      roles: ['admin', 'owner']
    },
    {
      name: texts.users,
      href: '/admin/users',
      icon: UserCog,
      roles: ['admin']
    },
    {
      name: texts.settings,
      href: '/admin/settings',
      icon: Settings,
      roles: ['admin']
    }
  ];

  const filteredItems = navigationItems.filter(item => 
    hasRole(item.roles as any)
  );

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className={`h-full bg-card border-r border-border flex flex-col ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Logo Section */}
      <div className="p-4 lg:p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/src/assets/service-building.png" 
              alt="Company Logo" 
              className="h-8 lg:h-10 w-auto object-contain"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-foreground text-sm lg:text-base">Admin Panel</span>
              <span className="text-xs text-muted-foreground capitalize">
                {profile?.role}
              </span>
            </div>
          </div>
          
          {/* Close button for mobile */}
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 lg:p-4 space-y-1 lg:space-y-2">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={onClose} // Close sidebar on mobile when clicking a link
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent",
                isRTL && "flex-row-reverse"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="p-3 lg:p-4 border-t border-border space-y-3 lg:space-y-4">
        <div className="text-sm text-muted-foreground">
          <div className="font-medium text-foreground">{profile?.full_name}</div>
          <div className="text-xs">{profile?.email}</div>
        </div>
        
        <Separator />
        
        <Button 
          variant="ghost" 
          onClick={handleLogout}
          className={cn(
            "w-full justify-start gap-3 text-muted-foreground hover:text-foreground",
            isRTL && "flex-row-reverse justify-end"
          )}
        >
          <LogOut className="w-4 h-4" />
          <span>{texts.logout}</span>
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;