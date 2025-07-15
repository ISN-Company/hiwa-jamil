import * as React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Handshake, ExternalLink, Mail, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PartnerForm } from '@/components/admin/PartnerForm';
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';

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
  created_at: string;
}

const Partners = () => {
  const { profile } = useAuth();
  const { language } = useLanguage();
  const { toast } = useToast();
  const [partners, setPartners] = React.useState<Partner[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showForm, setShowForm] = React.useState(false);
  const [editingPartner, setEditingPartner] = React.useState<Partner | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [partnerToDelete, setPartnerToDelete] = React.useState<Partner | null>(null);

  const translations = {
    EN: {
      title: 'Partners Management',
      addPartner: 'Add Partner',
      name: 'Name',
      description: 'Description',
      contact: 'Contact',
      website: 'Website',
      status: 'Status',
      actions: 'Actions',
      active: 'Active',
      inactive: 'Inactive',
      edit: 'Edit',
      delete: 'Delete',
      noPartners: 'No partners found',
      loadError: 'Failed to load partners',
      visitWebsite: 'Visit Website',
      email: 'Email',
      phone: 'Phone'
    },
    AR: {
      title: 'إدارة الشركاء',
      addPartner: 'إضافة شريك',
      name: 'الاسم',
      description: 'الوصف',
      contact: 'التواصل',
      website: 'الموقع الإلكتروني',
      status: 'الحالة',
      actions: 'الإجراءات',
      active: 'نشط',
      inactive: 'غير نشط',
      edit: 'تعديل',
      delete: 'حذف',
      noPartners: 'لم يتم العثور على شركاء',
      loadError: 'فشل في تحميل الشركاء',
      visitWebsite: 'زيارة الموقع',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف'
    },
    KU: {
      title: 'بەڕێوەبردنی هاوبەشەکان',
      addPartner: 'هاوبەش زیادکردن',
      name: 'ناو',
      description: 'پێناسە',
      contact: 'پەیوەندی',
      website: 'ماڵپەڕ',
      status: 'دۆخ',
      actions: 'کردارەکان',
      active: 'چالاک',
      inactive: 'ناچالاک',
      edit: 'دەستکاری',
      delete: 'سڕینەوە',
      noPartners: 'هیچ هاوبەشێک نەدۆزرایەوە',
      loadError: 'شکستی هێنانی هاوبەشەکان',
      visitWebsite: 'بینینی ماڵپەڕ',
      email: 'ئیمەیل',
      phone: 'تەلەفۆن'
    }
  };

  const texts = translations[language as keyof typeof translations];
  const isRTL = language === 'AR' || language === 'KU';

  React.useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPartners(data || []);
    } catch (error) {
      console.error('Error fetching partners:', error);
      toast({
        title: "Error",
        description: texts.loadError,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getPartnerDescription = (partner: Partner) => {
    if (language === 'AR' && partner.description_ar) return partner.description_ar;
    if (language === 'KU' && partner.description_ku) return partner.description_ku;
    return partner.description_en;
  };

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setShowForm(true);
  };

  const handleDelete = (partner: Partner) => {
    setPartnerToDelete(partner);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!partnerToDelete) return;
    
    try {
      const { error } = await supabase
        .from('partners')
        .delete()
        .eq('id', partnerToDelete.id);

      if (error) throw error;

      setPartners(prev => prev.filter(p => p.id !== partnerToDelete.id));
      
      toast({
        title: "Success",
        description: "Partner deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting partner:', error);
      toast({
        title: "Error",
        description: "Failed to delete partner",
        variant: "destructive",
      });
    } finally {
      setShowDeleteDialog(false);
      setPartnerToDelete(null);
    }
  };

  const handleFormSuccess = () => {
    fetchPartners();
    setEditingPartner(null);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingPartner(null);
  };

  if (loading) {
    return (
      <AdminLayout requiredRoles={['admin', 'owner']}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Handshake className="w-12 h-12 animate-pulse mx-auto mb-4 text-muted-foreground" />
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
            {texts.addPartner}
          </Button>
        </div>

        {partners.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Handshake className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl text-muted-foreground">{texts.noPartners}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {partners.map((partner) => (
              <Card key={partner.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      {partner.logo_url && (
                        <img 
                          src={partner.logo_url} 
                          alt={partner.name}
                          className="w-12 h-12 object-contain rounded"
                        />
                      )}
                      <CardTitle className="text-lg">{partner.name}</CardTitle>
                    </div>
                    <Badge variant={partner.is_active ? "default" : "secondary"}>
                      {partner.is_active ? texts.active : texts.inactive}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="md:col-span-2">
                      <p className="text-sm font-medium text-muted-foreground mb-1">{texts.description}</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        {getPartnerDescription(partner) || 'No description available'}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        {partner.contact_email && (
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <span>{partner.contact_email}</span>
                          </div>
                        )}
                        {partner.contact_phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span>{partner.contact_phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col gap-2">
                        {partner.website_url && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center gap-2"
                            onClick={() => window.open(partner.website_url, '_blank')}
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
                            onClick={() => handleEdit(partner)}
                          >
                            <Edit className="w-4 h-4" />
                            {texts.edit}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center gap-2 text-destructive hover:text-destructive"
                            onClick={() => handleDelete(partner)}
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

      <PartnerForm
        partner={editingPartner}
        open={showForm}
        onClose={handleFormClose}
        onSuccess={handleFormSuccess}
      />

      <DeleteConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={confirmDelete}
        title="Delete Partner"
        description={`Are you sure you want to delete "${partnerToDelete?.name}"? This action cannot be undone.`}
      />
    </AdminLayout>
  );
};

export default Partners;