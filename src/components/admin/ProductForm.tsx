import * as React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { FileUpload } from '@/components/ui/file-upload';

interface Product {
  id?: string;
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
}

interface ProductFormProps {
  product?: Product;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, isOpen, onClose, onSuccess }) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [brands, setBrands] = React.useState<any[]>([]);
  const [formData, setFormData] = React.useState<Product>({
    name_en: '',
    name_ar: '',
    name_ku: '',
    description_en: '',
    description_ar: '',
    description_ku: '',
    category: '',
    price: 0,
    image_url: '',
    is_active: true,
  });

  const translations = {
    EN: {
      title: product ? 'Edit Product' : 'Add Product',
      name: 'Product Name',
      description: 'Description',
      category: 'Category',
      price: 'Price',
      imageUrl: 'Image URL',
      isActive: 'Active',
      english: 'English',
      arabic: 'Arabic',
      kurdish: 'Kurdish',
      save: 'Save',
      cancel: 'Cancel',
      required: 'This field is required',
      categories: {
        oil: 'Motor Oil',
        filter: 'Oil Filter',
        additive: 'Oil Additive',
        lubricant: 'Lubricant',
        other: 'Other'
      }
    },
    AR: {
      title: product ? 'تعديل المنتج' : 'إضافة منتج',
      name: 'اسم المنتج',
      description: 'الوصف',
      category: 'الفئة',
      price: 'السعر',
      imageUrl: 'رابط الصورة',
      isActive: 'نشط',
      english: 'الإنجليزية',
      arabic: 'العربية',
      kurdish: 'الكردية',
      save: 'حفظ',
      cancel: 'إلغاء',
      required: 'هذا الحقل مطلوب',
      categories: {
        oil: 'زيت المحرك',
        filter: 'فلتر الزيت',
        additive: 'مضاف الزيت',
        lubricant: 'مزلق',
        other: 'أخرى'
      }
    },
    KU: {
      title: product ? 'دەستکاری بەرهەم' : 'بەرهەم زیادکردن',
      name: 'ناوی بەرهەم',
      description: 'باسکردن',
      category: 'جۆر',
      price: 'نرخ',
      imageUrl: 'بەستەری وێنە',
      isActive: 'چالاک',
      english: 'ئینگلیزی',
      arabic: 'عەرەبی',
      kurdish: 'کوردی',
      save: 'هەڵگرتن',
      cancel: 'هەڵوەشاندنەوە',
      required: 'ئەم خانەیە پێویستە',
      categories: {
        oil: 'ڕۆنی بزوێنەر',
        filter: 'فیلتەری ڕۆن',
        additive: 'زیادکەری ڕۆن',
        lubricant: 'چەورکەر',
        other: 'هیتر'
      }
    }
  };

  const texts = translations[language as keyof typeof translations];
  const isRTL = language === 'AR' || language === 'KU';

  // Fetch brands
  React.useEffect(() => {
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

    fetchBrands();
  }, []);

  React.useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        name_en: '',
        name_ar: '',
        name_ku: '',
        description_en: '',
        description_ar: '',
        description_ku: '',
        category: '',
        price: 0,
        image_url: '',
        is_active: true,
      });
    }
  }, [product, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name_en.trim()) {
      toast({
        title: "Error",
        description: texts.required,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const submitData = {
        name_en: formData.name_en,
        name_ar: formData.name_ar || null,
        name_ku: formData.name_ku || null,
        description_en: formData.description_en || null,
        description_ar: formData.description_ar || null,
        description_ku: formData.description_ku || null,
        category: formData.category || null,
        price: formData.price || null,
        image_url: formData.image_url || null,
        is_active: formData.is_active,
      };

      if (product) {
        const { error } = await supabase
          .from('products')
          .update(submitData)
          .eq('id', product.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('products')
          .insert([submitData]);
        if (error) throw error;
      }

      toast({
        title: "Success",
        description: product ? "Product updated successfully" : "Product created successfully",
      });
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" aria-describedby="product-form-description">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {texts.title}
          </DialogTitle>
          <div id="product-form-description" className="text-sm text-muted-foreground">
            {product ? 'Edit the product information including name, description, price, and images in multiple languages.' : 'Create a new product with details, pricing, and images in multiple languages.'}
          </div>
        </DialogHeader>
        
        <div className={`${isRTL ? 'rtl' : 'ltr'}`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Tabs defaultValue="english" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="english">{texts.english}</TabsTrigger>
                <TabsTrigger value="arabic">{texts.arabic}</TabsTrigger>
                <TabsTrigger value="kurdish">{texts.kurdish}</TabsTrigger>
              </TabsList>

              <TabsContent value="english" className="space-y-4">
                <div>
                  <Label htmlFor="name_en">{texts.name} *</Label>
                  <Input
                    id="name_en"
                    value={formData.name_en}
                    onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                    placeholder="Enter product name in English"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description_en">{texts.description}</Label>
                  <Textarea
                    id="description_en"
                    value={formData.description_en || ''}
                    onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                    placeholder="Enter product description in English"
                    rows={3}
                  />
                </div>
              </TabsContent>

              <TabsContent value="arabic" className="space-y-4">
                <div>
                  <Label htmlFor="name_ar">{texts.name}</Label>
                  <Input
                    id="name_ar"
                    value={formData.name_ar || ''}
                    onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                    placeholder="أدخل اسم المنتج بالعربية"
                    dir="rtl"
                  />
                </div>
                <div>
                  <Label htmlFor="description_ar">{texts.description}</Label>
                  <Textarea
                    id="description_ar"
                    value={formData.description_ar || ''}
                    onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                    placeholder="أدخل وصف المنتج بالعربية"
                    rows={3}
                    dir="rtl"
                  />
                </div>
              </TabsContent>

              <TabsContent value="kurdish" className="space-y-4">
                <div>
                  <Label htmlFor="name_ku">{texts.name}</Label>
                  <Input
                    id="name_ku"
                    value={formData.name_ku || ''}
                    onChange={(e) => setFormData({ ...formData, name_ku: e.target.value })}
                    placeholder="ناوی بەرهەم بە کوردی بنووسە"
                  />
                </div>
                <div>
                  <Label htmlFor="description_ku">{texts.description}</Label>
                  <Textarea
                    id="description_ku"
                    value={formData.description_ku || ''}
                    onChange={(e) => setFormData({ ...formData, description_ku: e.target.value })}
                    placeholder="باسکردنی بەرهەم بە کوردی بنووسە"
                    rows={3}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">{texts.category}</Label>
                <Select value={formData.category || ''} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand.id} value={brand.name}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="price">{texts.price}</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="image_url">{texts.imageUrl}</Label>
              <FileUpload
                value={formData.image_url || ''}
                onChange={(url) => setFormData({ ...formData, image_url: url })}
                accept="image/*"
                placeholder="Upload product image"
                className="w-full"
              />
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;