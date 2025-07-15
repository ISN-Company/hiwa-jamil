import * as React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';
import ProductForm from '@/components/admin/ProductForm';

interface Product {
  id: string;
  name_en: string;
  name_ar?: string;
  name_ku?: string;
  description_en?: string;
  description_ar?: string;
  description_ku?: string;
  category?: string;
  price?: number;
  image_url?: string;
  is_active: boolean;
  created_at: string;
}

const Products = () => {
  const { profile } = useAuth();
  const { language } = useLanguage();
  const { toast } = useToast();
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [deleteDialog, setDeleteDialog] = React.useState<{open: boolean, product: Product | null}>({open: false, product: null});
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<Product | undefined>(undefined);

  const translations = {
    EN: {
      title: 'Products Management',
      addProduct: 'Add Product',
      name: 'Name',
      category: 'Category',
      price: 'Price',
      status: 'Status',
      actions: 'Actions',
      active: 'Active',
      inactive: 'Inactive',
      edit: 'Edit',
      delete: 'Delete',
      noProducts: 'No products found',
      loadError: 'Failed to load products'
    },
    AR: {
      title: 'إدارة المنتجات',
      addProduct: 'إضافة منتج',
      name: 'الاسم',
      category: 'الفئة',
      price: 'السعر',
      status: 'الحالة',
      actions: 'الإجراءات',
      active: 'نشط',
      inactive: 'غير نشط',
      edit: 'تعديل',
      delete: 'حذف',
      noProducts: 'لم يتم العثور على منتجات',
      loadError: 'فشل في تحميل المنتجات'
    },
    KU: {
      title: 'بەڕێوەبردنی بەرهەمەکان',
      addProduct: 'بەرهەم زیادکردن',
      name: 'ناو',
      category: 'جۆر',
      price: 'نرخ',
      status: 'دۆخ',
      actions: 'کردارەکان',
      active: 'چالاک',
      inactive: 'ناچالاک',
      edit: 'دەستکاری',
      delete: 'سڕینەوە',
      noProducts: 'هیچ بەرهەمێک نەدۆزرایەوە',
      loadError: 'شکستی هێنانی بەرهەمەکان'
    }
  };

  const texts = translations[language as keyof typeof translations];
  const isRTL = language === 'AR' || language === 'KU';

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: texts.loadError,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getProductName = (product: Product) => {
    if (language === 'AR' && product.name_ar) return product.name_ar;
    if (language === 'KU' && product.name_ku) return product.name_ku;
    return product.name_en;
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingProduct(undefined);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    fetchProducts();
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(undefined);
  };

  const handleDelete = async () => {
    if (!deleteDialog.product) return;
    
    try {
      setDeleteLoading(true);
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', deleteDialog.product.id);

      if (error) throw error;
      
      setProducts(prev => prev.filter(p => p.id !== deleteDialog.product!.id));
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
      setDeleteDialog({open: false, product: null});
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error", 
        description: "Failed to delete product",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout requiredRoles={['admin', 'owner', 'user']}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Package className="w-12 h-12 animate-pulse mx-auto mb-4 text-muted-foreground" />
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
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 rounded-lg px-4 py-2 font-medium shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
            onClick={handleAdd}
          >
            <Plus className="w-4 h-4" />
            {texts.addProduct}
          </Button>
        </div>

        {products.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl text-muted-foreground">{texts.noProducts}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {products.map((product) => (
              <Card key={product.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">
                      {getProductName(product)}
                    </CardTitle>
                    <Badge variant={product.is_active ? "default" : "secondary"}>
                      {product.is_active ? texts.active : texts.inactive}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{texts.category}</p>
                      <p className="text-sm">{product.category || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{texts.price}</p>
                      <p className="text-sm">{product.price ? `$${product.price}` : 'N/A'}</p>
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex gap-2 justify-end">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-2"
                          onClick={() => handleEdit(product)}
                        >
                          <Edit className="w-4 h-4" />
                          {texts.edit}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-2 text-destructive hover:text-destructive"
                          onClick={() => setDeleteDialog({open: true, product})}
                        >
                          <Trash2 className="w-4 h-4" />
                          {texts.delete}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        <DeleteConfirmDialog
          open={deleteDialog.open}
          onOpenChange={(open) => setDeleteDialog({open, product: null})}
          onConfirm={handleDelete}
          title="Delete Product"
          description={`Are you sure you want to delete "${deleteDialog.product ? getProductName(deleteDialog.product) : ''}"? This action cannot be undone.`}
          isLoading={deleteLoading}
        />

        <ProductForm
          product={editingProduct}
          isOpen={showForm}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      </div>
    </AdminLayout>
  );
};

export default Products;