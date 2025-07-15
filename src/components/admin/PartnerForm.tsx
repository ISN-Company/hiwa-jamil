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
import { FileUpload } from '@/components/ui/file-upload';

const partnerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description_en: z.string().optional(),
  description_ar: z.string().optional(),
  description_ku: z.string().optional(),
  logo_url: z.string().url().optional().or(z.literal('')),
  website_url: z.string().url().optional().or(z.literal('')),
  contact_email: z.string().email().optional().or(z.literal('')),
  contact_phone: z.string().optional(),
  is_active: z.boolean().default(true),
});

type PartnerFormValues = z.infer<typeof partnerSchema>;

interface Partner {
  id: string;
  name: string;
  description_en?: string;
  description_ar?: string;
  description_ku?: string;
  logo_url?: string;
  website_url?: string;
  contact_email?: string;
  contact_phone?: string;
  is_active: boolean;
}

interface PartnerFormProps {
  partner?: Partner | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function PartnerForm({ partner, open, onClose, onSuccess }: PartnerFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);

  const form = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      name: '',
      description_en: '',
      description_ar: '',
      description_ku: '',
      logo_url: '',
      website_url: '',
      contact_email: '',
      contact_phone: '',
      is_active: true,
    },
  });

  React.useEffect(() => {
    if (partner) {
      form.reset({
        name: partner.name,
        description_en: partner.description_en || '',
        description_ar: partner.description_ar || '',
        description_ku: partner.description_ku || '',
        logo_url: partner.logo_url || '',
        website_url: partner.website_url || '',
        contact_email: partner.contact_email || '',
        contact_phone: partner.contact_phone || '',
        is_active: partner.is_active,
      });
    } else {
      form.reset({
        name: '',
        description_en: '',
        description_ar: '',
        description_ku: '',
        logo_url: '',
        website_url: '',
        contact_email: '',
        contact_phone: '',
        is_active: true,
      });
    }
  }, [partner, form]);

  const onSubmit = async (data: PartnerFormValues) => {
    try {
      setLoading(true);
      
      // Ensure required fields are not empty
      if (!data.name || data.name.trim() === '') {
        toast({
          title: "Error",
          description: "Partner name is required",
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
        contact_email: data.contact_email || null,
        contact_phone: data.contact_phone || null,
      };
      
      if (partner) {
        const { error } = await supabase
          .from('partners')
          .update(cleanData)
          .eq('id', partner.id);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Partner updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('partners')
          .insert([cleanData]);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Partner created successfully",
        });
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving partner:', error);
      toast({
        title: "Error",
        description: "Failed to save partner",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby="partner-form-description">
        <DialogHeader>
          <DialogTitle>
            {partner ? 'Edit Partner' : 'Add New Partner'}
          </DialogTitle>
          <div id="partner-form-description" className="text-sm text-muted-foreground">
            {partner ? 'Edit the partner information including contact details and descriptions.' : 'Create a new partner with contact information and company details.'}
          </div>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Partner Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter partner name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contact_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input placeholder="contact@partner.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+964750 805 5005" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="logo_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Partner Logo</FormLabel>
                    <FormControl>
                      <FileUpload
                        value={field.value}
                        onChange={field.onChange}
                        accept="image/*"
                        placeholder="Upload partner logo"
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
            </div>

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
                      Partner will be visible on the website when active
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
                {loading ? 'Saving...' : partner ? 'Update Partner' : 'Create Partner'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}