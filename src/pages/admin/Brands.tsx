import * as React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Tag, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { BrandForm } from '@/components/admin/BrandForm';
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';

interface Brand {
  id: string;
  name: string;
  description_en?: string;
  description_ar?: string;
  description_ku?: string;
  logo_url?: string;
  website_url?: string;
  is_active: boolean;
  created_at: string;
}

const Brands = () => {
  const { profile } = useAuth();
  const { language } = useLanguage();
  const { toast } = useToast();
  const [brands, setBrands] = React.useState<Brand[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showForm, setShowForm] = React.useState(false);
  const [editingBrand, setEditingBrand] = React.useState<Brand | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [brandToDelete, setBrandToDelete] = React.useState<Brand | null>(null);

  const translations = {
    EN: {
      title: 'Brands Management',
      addBrand: 'Add Brand',
      name: 'Name',
      description: 'Description',
      website: 'Website',
      status: 'Status',
      actions: 'Actions',
      active: 'Active',
      inactive: 'Inactive',
      edit: 'Edit',
      delete: 'Delete',
      noBrands: 'No brands found',
      loadError: 'Failed to load brands',
      visitWebsite: 'Visit Website'
    },
    AR: {
      title: 'إدارة العلامات التجارية',
      addBrand: 'إضافة علامة تجارية',
      name: 'الاسم',
      description: 'الوصف',
      website: 'الموقع الإلكتروني',
      status: 'الحالة',
      actions: 'الإجراءات',
      active: 'نشط',
      inactive: 'غير نشط',
      edit: 'تعديل',
      delete: 'حذف',
      noBrands: 'لم يتم العثور على علامات تجارية',
      loadError: 'فشل في تحميل العلامات التجارية',
      visitWebsite: 'زيارة الموقع'
    },
    KU: {
      title: 'بەڕێوەبردنی براندەکان',
      addBrand: 'براند زیادکردن',
      name: 'ناو',
      description: 'پێناسە',
      website: 'ماڵپەڕ',
      status: 'دۆخ',
      actions: 'کردارەکان',
      active: 'چالاک',
      inactive: 'ناچالاک',
      edit: 'دەستکاری',
      delete: 'سڕینەوە',
      noBrands: 'هیچ براندێک نەدۆزرایەوە',
      loadError: 'شکستی هێنانی براندەکان',
      visitWebsite: 'بینینی ماڵپەڕ'
    }
  };

  const texts = translations[language as keyof typeof translations];
  const isRTL = language === 'AR' || language === 'KU';

  React.useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBrands(data || []);
    } catch (error) {
      console.error('Error fetching brands:', error);
      toast({
        title: "Error",
        description: texts.loadError,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getBrandDescription = (brand: Brand) => {
    if (language === 'AR' && brand.description_ar) return brand.description_ar;
    if (language === 'KU' && brand.description_ku) return brand.description_ku;
    return brand.description_en;
  };

  const handleEdit = (brand: Brand) => {
    setEditingBrand(brand);
    setShowForm(true);
  };

  const handleDelete = (brand: Brand) => {
    setBrandToDelete(brand);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!brandToDelete) return;
    
    try {
      const { error } = await supabase
        .from('brands')
        .delete()
        .eq('id', brandToDelete.id);

      if (error) throw error;

      setBrands(prev => prev.filter(b => b.id !== brandToDelete.id));
      
      toast({
        title: "Success",
        description: "Brand deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting brand:', error);
      toast({
        title: "Error",
        description: "Failed to delete brand",
        variant: "destructive",
      });
    } finally {
      setShowDeleteDialog(false);
      setBrandToDelete(null);
    }
  };

  const handleFormSuccess = () => {
    fetchBrands();
    setEditingBrand(null);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingBrand(null);
  };

  if (loading) {
    return (
      <AdminLayout requiredRoles={['admin', 'owner', 'user']}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Tag className="w-12 h-12 animate-pulse mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout requiredRoles={['admin', 'owner', 'user']}>
      <div className={`space-y-6 ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-foreground">{texts.title}</h1>
          <Button 
            className="flex items-center gap-2"
            onClick={() => setShowForm(true)}
          >
            <Plus className="w-4 h-4" />
            {texts.addBrand}
          </Button>
        </div>

        {brands.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Tag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl text-muted-foreground">{texts.noBrands}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {brands.map((brand) => (
              <Card key={brand.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      {brand.logo_url && (
                        <img 
                          src={brand.logo_url} 
                          alt={brand.name}
                          className="w-12 h-12 object-contain rounded"
                        />
                      )}
                      <CardTitle className="text-lg">{brand.name}</CardTitle>
                    </div>
                    <Badge variant={brand.is_active ? "default" : "secondary"}>
                      {brand.is_active ? texts.active : texts.inactive}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="md:col-span-2">
                      <p className="text-sm font-medium text-muted-foreground mb-1">{texts.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {getBrandDescription(brand) || 'No description available'}
                      </p>
                    </div>
                    <div>
                      <div className="flex flex-col gap-2">
                        {brand.website_url && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center gap-2"
                            onClick={() => window.open(brand.website_url, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4" />
                            {texts.visitWebsite}
                          </Button>
                        )}
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center gap-2"
                            onClick={() => handleEdit(brand)}
                          >
                            <Edit className="w-4 h-4" />
                            {texts.edit}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center gap-2 text-destructive hover:text-destructive"
                            onClick={() => handleDelete(brand)}
                          >
                            <Trash2 className="w-4 h-4" />
                            {texts.delete}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <BrandForm
        brand={editingBrand}
        open={showForm}
        onClose={handleFormClose}
        onSuccess={handleFormSuccess}
      />

      <DeleteConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={confirmDelete}
        title="Delete Brand"
        description={`Are you sure you want to delete "${brandToDelete?.name}"? This action cannot be undone.`}
      />
    </AdminLayout>
  );
};

export default Brands;