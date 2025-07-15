import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { FileUpload } from '@/components/ui/file-upload';

const brandSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description_en: z.string().optional(),
  description_ar: z.string().optional(),
  description_ku: z.string().optional(),
  logo_url: z.string().url().optional().or(z.literal('')),
  website_url: z.string().url().optional().or(z.literal('')),
  is_active: z.boolean().default(true),
});

type BrandFormValues = z.infer<typeof brandSchema>;

interface Brand {
  id: string;
  name: string;
  description_en?: string;
  description_ar?: string;
  description_ku?: string;
  logo_url?: string;
  website_url?: string;
  is_active: boolean;
}

interface BrandFormProps {
  brand?: Brand | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function BrandForm({ brand, open, onClose, onSuccess }: BrandFormProps) {
  const { toast } = useToast();
  const { language } = useLanguage();
  const [loading, setLoading] = React.useState(false);

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: '',
      description_en: '',
      description_ar: '',
      description_ku: '',
      logo_url: '',
      website_url: '',
      is_active: true,
    },
  });

  React.useEffect(() => {
    if (brand) {
      form.reset({
        name: brand.name,
        description_en: brand.description_en || '',
        description_ar: brand.description_ar || '',
        description_ku: brand.description_ku || '',
        logo_url: brand.logo_url || '',
        website_url: brand.website_url || '',
        is_active: brand.is_active,
      });
    } else {
      form.reset({
        name: '',
        description_en: '',
        description_ar: '',
        description_ku: '',
        logo_url: '',
        website_url: '',
        is_active: true,
      });
    }
  }, [brand, form]);

  const onSubmit = async (data: BrandFormValues) => {
    try {
      setLoading(true);
      
      // Ensure required fields are not empty
      if (!data.name || data.name.trim() === '') {
        toast({
          title: "Error",
          description: "Brand name is required",
          variant: "destructive",
        });
        return;
      }
      
      // Clean up the data - convert empty strings to null for optional fields
      const cleanData = {
        ...data,
        name: data.name.trim(),
        description_en: data.description_en || null,
        description_ar: data.description_ar || null,
        description_ku: data.description_ku || null,
        logo_url: data.logo_url || null,
        website_url: data.website_url || null,
      };
      
      if (brand) {
        const { error } = await supabase
          .from('brands')
          .update(cleanData)
          .eq('id', brand.id);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Brand updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('brands')
          .insert([cleanData]);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Brand created successfully",
        });
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving brand:', error);
      toast({
        title: "Error",
        description: "Failed to save brand",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby="brand-form-description">
        <DialogHeader>
          <DialogTitle>
            {brand ? 'Edit Brand' : 'Add New Brand'}
          </DialogTitle>
          <div id="brand-form-description" className="text-sm text-muted-foreground">
            {brand ? 'Edit the brand information including name, descriptions, logo, and website.' : 'Create a new brand with name, descriptions, logo, and website information.'}
          </div>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter brand name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logo_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Logo</FormLabel>
                  <FormControl>
                    <FileUpload
                      value={field.value}
                      onChange={field.onChange}
                      accept="image/*"
                      placeholder="Upload brand logo"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description_en"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (English)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter description in English"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description_ar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Arabic)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="أدخل الوصف باللغة العربية"
                      className="min-h-[80px]"
                      dir="rtl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description_ku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Kurdish)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="پێناسە بە کوردی بنووسە"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active Status</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Brand will be visible on the website when active
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose} type="button">
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : brand ? 'Update Brand' : 'Create Brand'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}