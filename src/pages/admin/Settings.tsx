import * as React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Settings, Save, Database, Shield, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SettingsPage = () => {
  const { profile } = useAuth();
  const { language } = useLanguage();
  const { toast } = useToast();

  const [settings, setSettings] = React.useState({
    siteName: 'Hiwa Jamil Oil Services',
    siteDescription: 'Professional Oil Services Since 2020',
    contactEmail: 'info@hijamil.com',
    contactPhone: '+964750 805 5005',
    address: 'Erbil, Kurdistan Region, Iraq',
    maintenanceMode: false,
    registrationEnabled: true,
    emailNotifications: true,
    backupEnabled: true,
    autoBackupInterval: '24'
  });

  const translations = {
    EN: {
      title: 'System Settings',
      generalSettings: 'General Settings',
      securitySettings: 'Security Settings',
      systemSettings: 'System Settings',
      siteName: 'Site Name',
      siteDescription: 'Site Description',
      contactEmail: 'Contact Email',
      contactPhone: 'Contact Phone',
      address: 'Address',
      maintenanceMode: 'Maintenance Mode',
      registrationEnabled: 'User Registration Enabled',
      emailNotifications: 'Email Notifications',
      backupEnabled: 'Automatic Backup',
      autoBackupInterval: 'Backup Interval (hours)',
      save: 'Save Changes',
      saveSuccess: 'Settings saved successfully',
      saveError: 'Failed to save settings',
      maintenanceModeDesc: 'When enabled, only admins can access the site',
      registrationDesc: 'Allow new users to register accounts',
      emailNotificationsDesc: 'Send email notifications for important events',
      backupDesc: 'Automatically backup the database',
      databaseSettings: 'Database Settings'
    },
    AR: {
      title: 'إعدادات النظام',
      generalSettings: 'الإعدادات العامة',
      securitySettings: 'إعدادات الأمان',
      systemSettings: 'إعدادات النظام',
      siteName: 'اسم الموقع',
      siteDescription: 'وصف الموقع',
      contactEmail: 'البريد الإلكتروني للتواصل',
      contactPhone: 'هاتف التواصل',
      address: 'العنوان',
      maintenanceMode: 'وضع الصيانة',
      registrationEnabled: 'تسجيل المستخدمين مفعل',
      emailNotifications: 'إشعارات البريد الإلكتروني',
      backupEnabled: 'النسخ الاحتياطي التلقائي',
      autoBackupInterval: 'فترة النسخ الاحتياطي (ساعات)',
      save: 'حفظ التغييرات',
      saveSuccess: 'تم حفظ الإعدادات بنجاح',
      saveError: 'فشل في حفظ الإعدادات',
      maintenanceModeDesc: 'عند التفعيل، يمكن للمديرين فقط الوصول للموقع',
      registrationDesc: 'السماح للمستخدمين الجدد بإنشاء حسابات',
      emailNotificationsDesc: 'إرسال إشعارات البريد الإلكتروني للأحداث المهمة',
      backupDesc: 'النسخ الاحتياطي التلقائي لقاعدة البيانات',
      databaseSettings: 'إعدادات قاعدة البيانات'
    },
    KU: {
      title: 'ڕێکخستنەکانی سیستەم',
      generalSettings: 'ڕێکخستنە گشتیەکان',
      securitySettings: 'ڕێکخستنەکانی ئاسایش',
      systemSettings: 'ڕێکخستنەکانی سیستەم',
      siteName: 'ناوی ماڵپەڕ',
      siteDescription: 'پێناسەی ماڵپەڕ',
      contactEmail: 'ئیمەیلی پەیوەندی',
      contactPhone: 'تەلەفۆنی پەیوەندی',
      address: 'ناونیشان',
      maintenanceMode: 'دۆخی چاککردنەوە',
      registrationEnabled: 'تۆمارکردنی بەکارهێنەر چالاکە',
      emailNotifications: 'ئاگادارکردنەوەی ئیمەیل',
      backupEnabled: 'پاڵپشتی خۆکار',
      autoBackupInterval: 'ماوەی پاڵپشت (کاتژمێر)',
      save: 'پاشەکەوتکردنی گۆڕانکاریەکان',
      saveSuccess: 'ڕێکخستنەکان بە سەرکەوتوویی پاشەکەوت کران',
      saveError: 'شکستی پاشەکەوتکردنی ڕێکخستنەکان',
      maintenanceModeDesc: 'کاتێک چالاک دەکرێت، تەنها بەڕێوەبەران دەتوانن دەستڕشتی ماڵپەڕ بکەن',
      registrationDesc: 'ڕێگە بدە بە بەکارهێنەرانی نوێ بۆ دروستکردنی هەژمار',
      emailNotificationsDesc: 'ناردنی ئاگادارکردنەوەی ئیمەیل بۆ ڕووداوە گرنگەکان',
      backupDesc: 'پاڵپشتی خۆکاری بنکەدراوە',
      databaseSettings: 'ڕێکخستنەکانی بنکەدراوە'
    }
  };

  const texts = translations[language as keyof typeof translations];
  const isRTL = language === 'AR' || language === 'KU';

  const handleSave = async () => {
    try {
      // In a real app, you would save settings to the database
      toast({
        title: "Success",
        description: texts.saveSuccess,
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: texts.saveError,
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (key: string, value: string | boolean | number) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <AdminLayout requiredRoles={['admin']}>
      <div className={`space-y-6 ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-foreground">{texts.title}</h1>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            {texts.save}
          </Button>
        </div>

        <div className="grid gap-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                {texts.generalSettings}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">{texts.siteName}</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => handleInputChange('siteName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">{texts.contactEmail}</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">{texts.contactPhone}</Label>
                  <Input
                    id="contactPhone"
                    value={settings.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">{texts.address}</Label>
                  <Input
                    id="address"
                    value={settings.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">{texts.siteDescription}</Label>
                <Input
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                {texts.securitySettings}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{texts.maintenanceMode}</Label>
                  <p className="text-sm text-muted-foreground">{texts.maintenanceModeDesc}</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleInputChange('maintenanceMode', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{texts.registrationEnabled}</Label>
                  <p className="text-sm text-muted-foreground">{texts.registrationDesc}</p>
                </div>
                <Switch
                  checked={settings.registrationEnabled}
                  onCheckedChange={(checked) => handleInputChange('registrationEnabled', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                {texts.systemSettings}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{texts.emailNotifications}</Label>
                  <p className="text-sm text-muted-foreground">{texts.emailNotificationsDesc}</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{texts.backupEnabled}</Label>
                  <p className="text-sm text-muted-foreground">{texts.backupDesc}</p>
                </div>
                <Switch
                  checked={settings.backupEnabled}
                  onCheckedChange={(checked) => handleInputChange('backupEnabled', checked)}
                />
              </div>
              {settings.backupEnabled && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="autoBackupInterval">{texts.autoBackupInterval}</Label>
                    <Input
                      id="autoBackupInterval"
                      type="number"
                      value={settings.autoBackupInterval}
                      onChange={(e) => handleInputChange('autoBackupInterval', e.target.value)}
                      className="w-32"
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;