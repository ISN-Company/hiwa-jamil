import * as React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Building2, Users, Globe, TrendingUp, Activity } from 'lucide-react';

const Dashboard = () => {
  const { profile } = useAuth();
  const { language } = useLanguage();
  const [stats, setStats] = React.useState({
    products: 0,
    brands: 0,
    partners: 0,
    content: 0
  });

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, brandsRes, partnersRes, contentRes] = await Promise.all([
          supabase.from('products').select('id', { count: 'exact' }),
          supabase.from('brands').select('id', { count: 'exact' }),
          supabase.from('partners').select('id', { count: 'exact' }),
          supabase.from('website_content').select('id', { count: 'exact' })
        ]);

        setStats({
          products: productsRes.count || 0,
          brands: brandsRes.count || 0,
          partners: partnersRes.count || 0,
          content: contentRes.count || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const translations = {
    EN: {
      welcome: 'Welcome back',
      overview: 'System Overview',
      products: 'Products',
      brands: 'Brands',
      partners: 'Partners',
      content: 'Content Items',
      totalProducts: 'Total Products',
      totalBrands: 'Total Brands',
      totalPartners: 'Total Partners',
      totalContent: 'Total Content',
      quickActions: 'Quick Actions',
      addProduct: 'Add Product',
      addBrand: 'Add Brand',
      manageContent: 'Manage Content'
    },
    AR: {
      welcome: 'مرحبا بعودتك',
      overview: 'نظرة عامة على النظام',
      products: 'المنتجات',
      brands: 'العلامات التجارية',
      partners: 'الشركاء',
      content: 'عناصر المحتوى',
      totalProducts: 'إجمالي المنتجات',
      totalBrands: 'إجمالي العلامات التجارية',
      totalPartners: 'إجمالي الشركاء',
      totalContent: 'إجمالي المحتوى',
      quickActions: 'إجراءات سريعة',
      addProduct: 'إضافة منتج',
      addBrand: 'إضافة علامة تجارية',
      manageContent: 'إدارة المحتوى'
    },
    KU: {
      welcome: 'بەخێرهاتیتەوە',
      overview: 'گشتی سیستەم',
      products: 'بەرهەمەکان',
      brands: 'برێندەکان',
      partners: 'هاوبەشەکان',
      content: 'بابەتەکانی ناوەڕۆک',
      totalProducts: 'کۆی گشتی بەرهەمەکان',
      totalBrands: 'کۆی گشتی برێندەکان',
      totalPartners: 'کۆی گشتی هاوبەشەکان',
      totalContent: 'کۆی گشتی ناوەڕۆک',
      quickActions: 'کردارە خێراکان',
      addProduct: 'بەرهەم زیادبکە',
      addBrand: 'برێند زیادبکە',
      manageContent: 'بەڕێوەبردنی ناوەڕۆک'
    }
  };

  const texts = translations[language];
  const isRTL = language === 'AR' || language === 'KU';

  const statCards = [
    {
      title: texts.totalProducts,
      value: stats.products,
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: texts.totalBrands,
      value: stats.brands,
      icon: Building2,
      color: 'text-green-600'
    },
    {
      title: texts.totalPartners,
      value: stats.partners,
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: texts.totalContent,
      value: stats.content,
      icon: Globe,
      color: 'text-orange-600'
    }
  ];

  return (
    <AdminLayout>
      <div className={`space-y-6 ${isRTL ? 'rtl' : 'ltr'}`}>
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {texts.welcome}, {profile?.full_name}
            </h1>
            <p className="text-muted-foreground mt-1">
              {texts.overview}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground capitalize">
              {profile?.role}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                {texts.quickActions}
              </CardTitle>
              <CardDescription>
                Common administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-muted-foreground">
                Access your most used features quickly from the sidebar navigation.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>
                All systems operational
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">
                  Database connected
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;