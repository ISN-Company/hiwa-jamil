import * as React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Users, Crown, User, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import UserForm from '@/components/admin/UserForm';

interface UserProfile {
  id: string;
  user_id: string;
  email: string;
  full_name?: string;
  role: 'admin' | 'owner' | 'user';
  is_active: boolean;
  created_at: string;
}

const UsersManagement = () => {
  const { profile } = useAuth();
  const { language } = useLanguage();
  const { toast } = useToast();
  const [users, setUsers] = React.useState<UserProfile[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showForm, setShowForm] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState<UserProfile | undefined>(undefined);

  const translations = {
    EN: {
      title: 'Users Management',
      addUser: 'Add User',
      name: 'Name',
      email: 'Email',
      role: 'Role',
      status: 'Status',
      actions: 'Actions',
      active: 'Active',
      inactive: 'Inactive',
      edit: 'Edit',
      delete: 'Delete',
      noUsers: 'No users found',
      loadError: 'Failed to load users',
      updateError: 'Failed to update user',
      updateSuccess: 'User updated successfully',
      admin: 'Admin',
      owner: 'Owner',
      user: 'User',
      changeRole: 'Change Role'
    },
    AR: {
      title: 'إدارة المستخدمين',
      addUser: 'إضافة مستخدم',
      name: 'الاسم',
      email: 'البريد الإلكتروني', 
      role: 'الدور',
      status: 'الحالة',
      actions: 'الإجراءات',
      active: 'نشط',
      inactive: 'غير نشط',
      edit: 'تعديل',
      delete: 'حذف',
      noUsers: 'لم يتم العثور على مستخدمين',
      loadError: 'فشل في تحميل المستخدمين',
      updateError: 'فشل في تحديث المستخدم',
      updateSuccess: 'تم تحديث المستخدم بنجاح',
      admin: 'مدير',
      owner: 'مالك',
      user: 'مستخدم',
      changeRole: 'تغيير الدور'
    },
    KU: {
      title: 'بەڕێوەبردنی بەکارهێنەران',
      addUser: 'بەکارهێنەر زیادکردن',
      name: 'ناو',
      email: 'ئیمەیل',
      role: 'ڕۆڵ',
      status: 'دۆخ',
      actions: 'کردارەکان',
      active: 'چالاک',
      inactive: 'ناچالاک',
      edit: 'دەستکاری',
      delete: 'سڕینەوە',
      noUsers: 'هیچ بەکارهێنەرێک نەدۆزرایەوە',
      loadError: 'شکستی هێنانی بەکارهێنەران',
      updateError: 'شکستی نوێکردنەوەی بەکارهێنەر',
      updateSuccess: 'بەکارهێنەر بە سەرکەوتوویی نوێکرایەوە',
      admin: 'بەڕێوەبەر',
      owner: 'خاوەن',
      user: 'بەکارهێنەر',
      changeRole: 'گۆڕینی ڕۆڵ'
    }
  };

  const texts = translations[language as keyof typeof translations];
  const isRTL = language === 'AR' || language === 'KU';

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: texts.loadError,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: 'admin' | 'owner' | 'user') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;

      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));

      toast({
        title: "Success",
        description: texts.updateSuccess,
      });
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Error",
        description: texts.updateError,
        variant: "destructive",
      });
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="w-4 h-4" />;
      case 'owner':
        return <Crown className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getRoleVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'owner':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const handleEdit = (user: UserProfile) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    fetchUsers();
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingUser(undefined);
  };

  if (loading) {
    return (
      <AdminLayout requiredRoles={['admin']}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Users className="w-12 h-12 animate-pulse mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout requiredRoles={['admin']}>
      <div className={`space-y-6 ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-foreground">{texts.title}</h1>
        </div>

        {users.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl text-muted-foreground">{texts.noUsers}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {users.map((user) => (
              <Card key={user.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {getRoleIcon(user.role)}
                        {user.full_name || user.email}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <Badge variant={user.is_active ? "default" : "secondary"}>
                      {user.is_active ? texts.active : texts.inactive}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{texts.role}</p>
                      <Badge variant={getRoleVariant(user.role) as any} className="flex items-center gap-1 w-fit">
                        {getRoleIcon(user.role)}
                        {texts[user.role as keyof typeof texts]}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">{texts.changeRole}</p>
                      <Select 
                        value={user.role} 
                        onValueChange={(value: 'admin' | 'owner' | 'user') => updateUserRole(user.id, value)}
                        disabled={user.id === profile?.id} // Prevent users from changing their own role
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">{texts.user}</SelectItem>
                          <SelectItem value="owner">{texts.owner}</SelectItem>
                          <SelectItem value="admin">{texts.admin}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex gap-2 justify-end">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-2"
                          onClick={() => handleEdit(user)}
                        >
                          <Edit className="w-4 h-4" />
                          {texts.edit}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <UserForm
        user={editingUser}
        isOpen={showForm}
        onClose={handleFormClose}
        onSuccess={handleFormSuccess}
      />
    </AdminLayout>
  );
};

export default UsersManagement;