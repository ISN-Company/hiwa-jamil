import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Shield } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  
  const { signIn, user, profile } = useAuth();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  // Redirect if already logged in
  React.useEffect(() => {
    if (user && profile) {
      navigate('/admin/dashboard');
    }
  }, [user, profile, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const translations = {
    EN: {
      title: 'Admin Login',
      description: 'Secure access to administration panel',
      email: 'Email',
      password: 'Password',
      signIn: 'Sign In',
      forgotPassword: 'Forgot Password?',
      secureLogin: 'Secure Login',
      enterCredentials: 'Enter your credentials to access the admin dashboard'
    },
    AR: {
      title: 'تسجيل دخول المدير',
      description: 'وصول آمن إلى لوحة الإدارة',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      signIn: 'تسجيل الدخول',
      forgotPassword: 'نسيت كلمة المرور؟',
      secureLogin: 'تسجيل دخول آمن',
      enterCredentials: 'أدخل بياناتك للوصول إلى لوحة المدير'
    },
    KU: {
      title: 'چوونەژوورەوەی بەڕێوەبەر',
      description: 'دەستڕاگەیشتنی ئارام بۆ پانێلی بەڕێوەبردن',
      email: 'ئیمەیل',
      password: 'وشەی نهێنی',
      signIn: 'چوونەژوورەوە',
      forgotPassword: 'وشەی نهێنیت لەبیر چووە؟',
      secureLogin: 'چوونەژوورەوەی ئارام',
      enterCredentials: 'زانیاریەکانت بنووسە بۆ دەستڕاگەیشتن بۆ داشبۆردی بەڕێوەبەر'
    }
  };

  const texts = translations[language];

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 p-4 ${language === 'AR' || language === 'KU' ? 'rtl' : 'ltr'}`}>
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-6">
          <div className="flex justify-center">
            <img 
              src="/src/assets/service-building.png" 
              alt="Company Logo" 
              className="h-20 w-auto object-contain"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <CardTitle className="text-2xl font-bold text-foreground">
                {texts.title}
              </CardTitle>
            </div>
            <CardDescription className="text-muted-foreground">
              {texts.description}
            </CardDescription>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                {texts.email}
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                {texts.password}
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
                disabled={loading}
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {texts.signIn}...
                </>
              ) : (
                texts.signIn
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;