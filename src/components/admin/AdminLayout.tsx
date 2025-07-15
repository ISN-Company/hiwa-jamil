import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import AdminSidebar from './AdminSidebar';
import { Loader2, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: React.ReactNode;
  requiredRoles?: ('admin' | 'owner' | 'user')[];
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  requiredRoles = ['admin', 'owner', 'user'] 
}) => {
  const { user, profile, loading, hasRole } = useAuth();
  const { language } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!hasRole(requiredRoles)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
          <p className="text-muted-foreground">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const isRTL = language === 'AR' || language === 'KU';

  return (
    <div className={`min-h-screen flex ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        fixed lg:static inset-y-0 left-0 z-50 w-64 transition-transform duration-300 ease-in-out
        ${isRTL && isSidebarOpen ? 'translate-x-0' : isRTL && !isSidebarOpen ? 'translate-x-full lg:translate-x-0' : ''}
        ${isRTL ? 'right-0 left-auto' : ''}
      `}>
        <AdminSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>
      
      {/* Main content */}
      <main className="flex-1 lg:ml-0 overflow-auto bg-background">
        {/* Mobile header with menu button */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-card">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(true)}
            className={`${isRTL ? 'order-2' : ''}`}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold text-foreground">Admin Panel</h1>
          <div className={`${isRTL ? 'order-1' : ''} w-10`} />
        </div>
        
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
