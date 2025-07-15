import * as React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id?: string;
  user_id?: string;
  email: string;
  full_name?: string;
  role: 'admin' | 'owner' | 'user';
  is_active: boolean;
}

interface UserFormProps {
  user?: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, isOpen, onClose, onSuccess }) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState<UserProfile>({
    email: '',
    full_name: '',
    role: 'user',
    is_active: true,
  });

  const translations = {
    EN: {
      title: user ? 'Edit User' : 'Add User',
      email: 'Email',
      fullName: 'Full Name',
      role: 'Role',
      isActive: 'Active',
      save: 'Save',
      cancel: 'Cancel',
      required: 'This field is required',
      admin: 'Admin',
      owner: 'Owner',
      userRole: 'User',
      password: 'Password',
      passwordPlaceholder: 'Enter password (required for new users)'
    },
    AR: {
      title: user ? 'تعديل المستخدم' : 'إضافة مستخدم',
      email: 'البريد الإلكتروني',
      fullName: 'الاسم الكامل',
      role: 'الدور',
      isActive: 'نشط',
      save: 'حفظ',
      cancel: 'إلغاء',
      required: 'هذا الحقل مطلوب',
      admin: 'مدير',
      owner: 'مالك',
      userRole: 'مستخدم',
      password: 'كلمة المرور',
      passwordPlaceholder: 'أدخل كلمة المرور (مطلوبة للمستخدمين الجدد)'
    },
    KU: {
      title: user ? 'دەستکاری بەکارهێنەر' : 'بەکارهێنەر زیادکردن',
      email: 'ئیمەیل',
      fullName: 'ناوی تەواو',
      role: 'ڕۆڵ',
      isActive: 'چالاک',
      save: 'هەڵگرتن',
      cancel: 'هەڵوەشاندنەوە',
      required: 'ئەم خانەیە پێویستە',
      admin: 'بەڕێوەبەر',
      owner: 'خاوەن',
      userRole: 'بەکارهێنەر',
      password: 'وشەی نهێنی',
      passwordPlaceholder: 'وشەی نهێنی بنووسە (پێویستە بۆ بەکارهێنەری نوێ)'
    }
  };

  const texts = translations[language as keyof typeof translations];
  const isRTL = language === 'AR' || language === 'KU';

  React.useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData({
        email: '',
        full_name: '',
        role: 'user',
        is_active: true,
      });
    }
  }, [user, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formDataObj = new FormData(form);
    const password = formDataObj.get('password') as string;

    if (!formData.email.trim()) {
      toast({
        title: "Error",
        description: texts.required,
        variant: "destructive",
      });
      return;
    }

    if (!user && !password.trim()) {
      toast({
        title: "Error",
        description: "Password is required for new users",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      if (user) {
        // Update existing user profile
        const { error } = await supabase
          .from('profiles')
          .update({
            full_name: formData.full_name || null,
            role: formData.role,
            is_active: formData.is_active,
          })
          .eq('id', user.id);
        if (error) throw error;
      } else {
        // Create new user via edge function
        const { data, error } = await supabase.functions.invoke('create-user', {
          body: { 
            email: formData.email,
            password: password,
            full_name: formData.full_name || formData.email,
            role: formData.role
          }
        });

        if (error) throw error;

        if (data?.error) {
          throw new Error(data.error);
        }
      }

      toast({
        title: "Success",
        description: user ? "User updated successfully" : "User created successfully",
      });
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Error saving user:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save user",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className={`w-full max-w-md ${isRTL ? 'rtl' : 'ltr'}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">{texts.title}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">{texts.email} *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="user@example.com"
                required
                disabled={!!user} // Can't change email for existing users
              />
            </div>

            {!user && (
              <div>
                <Label htmlFor="password">{texts.password} *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={texts.passwordPlaceholder}
                  required={!user}
                  minLength={6}
                />
              </div>
            )}

            <div>
              <Label htmlFor="full_name">{texts.fullName}</Label>
              <Input
                id="full_name"
                value={formData.full_name || ''}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder="John Doe"
              />
            </div>

            <div>
              <Label htmlFor="role">{texts.role}</Label>
              <Select value={formData.role} onValueChange={(value: 'admin' | 'owner' | 'user') => setFormData({ ...formData, role: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">{texts.userRole}</SelectItem>
                  <SelectItem value="owner">{texts.owner}</SelectItem>
                  <SelectItem value="admin">{texts.admin}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label htmlFor="is_active">{texts.isActive}</Label>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                {texts.cancel}
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {texts.save}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserForm;