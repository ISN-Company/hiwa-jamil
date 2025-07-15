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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const contentSchema = z.object({
  section: z.string().min(1, 'Section is required'),
  key: z.string().min(1, 'Key is required'),
  content_type: z.string().default('text'),
  value_en: z.string().optional(),
  value_ar: z.string().optional(),
  value_ku: z.string().optional(),
  is_active: z.boolean().default(true),
});

type ContentFormValues = z.infer<typeof contentSchema>;

interface WebsiteContent {
  id: string;
  section: string;
  key: string;
  content_type: string;
  value_en?: string;
  value_ar?: string;
  value_ku?: string;
  is_active: boolean;
}

interface ContentFormProps {
  content?: WebsiteContent | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const sections = [
  { value: 'hero', label: 'Hero Section' },
  { value: 'about', label: 'About Section' },
  { value: 'contact', label: 'Contact Section' },
  { value: 'header', label: 'Header Section' },
  { value: 'footer', label: 'Footer Section' },
  { value: 'business', label: 'Business Section' },
  { value: 'cta', label: 'CTA Section' },
];

const contentTypes = [
  { value: 'text', label: 'Text' },
  { value: 'title', label: 'Title' },
  { value: 'description', label: 'Description' },
  { value: 'url', label: 'URL' },
  { value: 'phone', label: 'Phone' },
  { value: 'email', label: 'Email' },
];

export function ContentForm({ content, open, onClose, onSuccess }: ContentFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);

  const form = useForm<ContentFormValues>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      section: '',
      key: '',
      content_type: 'text',
      value_en: '',
      value_ar: '',
      value_ku: '',
      is_active: true,
    },
  });

  React.useEffect(() => {
    if (content) {
      form.reset({
        section: content.section,
        key: content.key,
        content_type: content.content_type || 'text',
        value_en: content.value_en || '',
        value_ar: content.value_ar || '',
        value_ku: content.value_ku || '',
        is_active: content.is_active,
      });
    } else {
      form.reset({
        section: '',
        key: '',
        content_type: 'text',
        value_en: '',
        value_ar: '',
        value_ku: '',
        is_active: true,
      });
    }
  }, [content, form]);

  const onSubmit = async (data: ContentFormValues) => {
    try {
      setLoading(true);
      
      // Ensure required fields are not empty
      if (!data.section || data.section.trim() === '') {
        toast({
          title: "Error",
          description: "Section is required",
          variant: "destructive",
        });
        return;
      }
      
      if (!data.key || data.key.trim() === '') {
        toast({
          title: "Error",
          description: "Content key is required",
          variant: "destructive",
        });
        return;
      }
      
      // Clean up the data - convert empty strings to null for optional fields
      const cleanData = {
        ...data,
        section: data.section.trim(),
        key: data.key.trim(),
        value_en: data.value_en || null,
        value_ar: data.value_ar || null,
        value_ku: data.value_ku || null,
      };
      
      if (content) {
        const { error } = await supabase
          .from('website_content')
          .update(cleanData)
          .eq('id', content.id);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Content updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('website_content')
          .insert([cleanData]);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Content created successfully",
        });
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Error",
        description: "Failed to save content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby="content-form-description">
        <DialogHeader>
          <DialogTitle>
            {content ? 'Edit Content' : 'Add New Content'}
          </DialogTitle>
          <div id="content-form-description" className="text-sm text-muted-foreground">
            {content ? 'Edit the content for your website sections in multiple languages.' : 'Create new content for your website sections in multiple languages.'}
          </div>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="section"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select section" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sections.map((section) => (
                          <SelectItem key={section.value} value={section.value}>
                            {section.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {contentTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content Key *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., hero_title, about_description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value_en"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content (English)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter content in English"
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
              name="value_ar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content (Arabic)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="أدخل المحتوى باللغة العربية"
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
              name="value_ku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content (Kurdish)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="ناوەڕۆک بە کوردی بنووسە"
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
                      Content will be visible on the website when active
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
                {loading ? 'Saving...' : content ? 'Update Content' : 'Create Content'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}