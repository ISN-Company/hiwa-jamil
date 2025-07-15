import * as React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Globe, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ContentForm } from '@/components/admin/ContentForm';
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';

interface WebsiteContent {
  id: string;
  section: string;
  key: string;
  value_en?: string;
  value_ar?: string;
  value_ku?: string;
  content_type: string;
  is_active: boolean;
  created_at: string;
}

const Content = () => {
  const { profile } = useAuth();
  const { language } = useLanguage();
  const { toast } = useToast();
  const [content, setContent] = React.useState<WebsiteContent[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showForm, setShowForm] = React.useState(false);
  const [editingContent, setEditingContent] = React.useState<WebsiteContent | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [contentToDelete, setContentToDelete] = React.useState<WebsiteContent | null>(null);

  const translations = {
    EN: {
      title: 'Website Content Management',
      addContent: 'Add Content',
      section: 'Section',
      key: 'Key',
      type: 'Type',
      content: 'Content',
      status: 'Status',
      actions: 'Actions',
      active: 'Active',
      inactive: 'Inactive',
      edit: 'Edit',
      delete: 'Delete',
      noContent: 'No content found',
      loadError: 'Failed to load content',
      english: 'English',
      arabic: 'Arabic',
      kurdish: 'Kurdish',
      hero: 'Hero Section',
      about: 'About Section',
      services: 'Services Section',
      contact: 'Contact Section',
      header: 'Header Section',
      footer: 'Footer Section'
    },
    AR: {
      title: 'إدارة محتوى الموقع',
      addContent: 'إضافة محتوى',
      section: 'القسم',
      key: 'المفتاح',
      type: 'النوع',
      content: 'المحتوى',
      status: 'الحالة',
      actions: 'الإجراءات',
      active: 'نشط',
      inactive: 'غير نشط',
      edit: 'تعديل',
      delete: 'حذف',
      noContent: 'لم يتم العثور على محتوى',
      loadError: 'فشل في تحميل المحتوى',
      english: 'الإنجليزية',
      arabic: 'العربية',
      kurdish: 'الكردية',
      hero: 'قسم البطل',
      about: 'قسم حول',
      services: 'قسم الخدمات',
      contact: 'قسم التواصل',
      header: 'قسم الرأس',
      footer: 'قسم التذييل'
    },
    KU: {
      title: 'بەڕێوەبردنی ناوەڕۆکی ماڵپەڕ',
      addContent: 'ناوەڕۆک زیادکردن',
      section: 'بەش',
      key: 'کلیل',
      type: 'جۆر',
      content: 'ناوەڕۆک',
      status: 'دۆخ',
      actions: 'کردارەکان',
      active: 'چالاک',
      inactive: 'ناچالاک',
      edit: 'دەستکاری',
      delete: 'سڕینەوە',
      noContent: 'هیچ ناوەڕۆکێک نەدۆزرایەوە',
      loadError: 'شکستی هێنانی ناوەڕۆک',
      english: 'ئینگلیزی',
      arabic: 'عەرەبی',
      kurdish: 'کوردی',
      hero: 'بەشی سەرەکی',
      about: 'بەشی دەربارە',
      services: 'بەشی خزمەتگوزاریەکان',  
      contact: 'بەشی پەیوەندی',
      header: 'بەشی سەرەوە',
      footer: 'بەشی خوارەوە'
    }
  };

  const texts = translations[language as keyof typeof translations];
  const isRTL = language === 'AR' || language === 'KU';

  React.useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('website_content')
        .select('*')
        .order('section', { ascending: true })
        .order('key', { ascending: true });

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
      toast({
        title: "Error",
        description: texts.loadError,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getContentValue = (item: WebsiteContent, lang: 'en' | 'ar' | 'ku') => {
    const value = item[`value_${lang}` as keyof WebsiteContent] as string;
    return value || 'Not set';
  };

  const handleEdit = (content: WebsiteContent) => {
    setEditingContent(content);
    setShowForm(true);
  };

  const handleDelete = (content: WebsiteContent) => {
    setContentToDelete(content);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!contentToDelete) return;
    
    try {
      const { error } = await supabase
        .from('website_content')
        .delete()
        .eq('id', contentToDelete.id);

      if (error) throw error;

      setContent(prev => prev.filter(c => c.id !== contentToDelete.id));
      
      toast({
        title: "Success",
        description: "Content deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting content:', error);
      toast({
        title: "Error",
        description: "Failed to delete content",
        variant: "destructive",
      });
    } finally {
      setShowDeleteDialog(false);
      setContentToDelete(null);
    }
  };

  const handleFormSuccess = () => {
    fetchContent();
    setEditingContent(null);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingContent(null);
  };

  const groupedContent = content.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, WebsiteContent[]>);

  if (loading) {
    return (
      <AdminLayout requiredRoles={['admin', 'owner']}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Globe className="w-12 h-12 animate-pulse mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout requiredRoles={['admin', 'owner']}>
      <div className={`space-y-6 ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-foreground">{texts.title}</h1>
          <Button 
            className="flex items-center gap-2"
            onClick={() => setShowForm(true)}
          >
            <Plus className="w-4 h-4" />
            {texts.addContent}
          </Button>
        </div>

        {Object.keys(groupedContent).length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl text-muted-foreground">{texts.noContent}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedContent).map(([section, items]) => (
              <Card key={section}>
                <CardHeader>
                  <CardTitle className="capitalize">{section} Section</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium">{item.key}</h4>
                            <p className="text-sm text-muted-foreground">{item.content_type}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={item.is_active ? "default" : "secondary"}>
                              {item.is_active ? texts.active : texts.inactive}
                            </Badge>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex items-center gap-2"
                              onClick={() => handleEdit(item)}
                            >
                              <Edit className="w-4 h-4" />
                              {texts.edit}
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex items-center gap-2 text-destructive hover:text-destructive"
                              onClick={() => handleDelete(item)}
                            >
                              <Trash2 className="w-4 h-4" />
                              {texts.delete}
                            </Button>
                          </div>
                        </div>
                        
                        <Tabs defaultValue="en" className="w-full">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="en">{texts.english}</TabsTrigger>
                            <TabsTrigger value="ar">{texts.arabic}</TabsTrigger>
                            <TabsTrigger value="ku">{texts.kurdish}</TabsTrigger>
                          </TabsList>
                          <TabsContent value="en" className="mt-3">
                            <div className="p-3 bg-muted rounded text-sm">
                              {getContentValue(item, 'en')}
                            </div>
                          </TabsContent>
                          <TabsContent value="ar" className="mt-3">
                            <div className="p-3 bg-muted rounded text-sm" dir="rtl">
                              {getContentValue(item, 'ar')}
                            </div>
                          </TabsContent>
                          <TabsContent value="ku" className="mt-3">
                            <div className="p-3 bg-muted rounded text-sm">
                              {getContentValue(item, 'ku')}
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <ContentForm
        content={editingContent}
        open={showForm}
        onClose={handleFormClose}
        onSuccess={handleFormSuccess}
      />

      <DeleteConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={confirmDelete}
        title="Delete Content"
        description={`Are you sure you want to delete "${contentToDelete?.key}"? This action cannot be undone.`}
      />
    </AdminLayout>
  );
};

export default Content;