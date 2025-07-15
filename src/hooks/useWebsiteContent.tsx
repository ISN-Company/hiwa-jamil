import * as React from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

interface WebsiteContent {
  id: string;
  section: string;
  key: string;
  value_en?: string;
  value_ar?: string;
  value_ku?: string;
  content_type: string;
  is_active: boolean;
}

interface ContentMap {
  [section: string]: {
    [key: string]: string;
  };
}

export function useWebsiteContent() {
  const { language } = useLanguage();
  const [content, setContent] = React.useState<ContentMap>({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('website_content')
        .select('*')
        .eq('is_active', true)
        .order('section')
        .order('key');

      if (error) throw error;

      // Transform data into organized structure
      const contentMap: ContentMap = {};
      
      data?.forEach((item: WebsiteContent) => {
        if (!contentMap[item.section]) {
          contentMap[item.section] = {};
        }
        
        // Get value based on current language
        let value = '';
        if (language === 'AR' && item.value_ar) {
          value = item.value_ar;
        } else if (language === 'KU' && item.value_ku) {
          value = item.value_ku;
        } else {
          value = item.value_en || '';
        }
        
        contentMap[item.section][item.key] = value;
      });

      setContent(contentMap);
    } catch (error) {
      console.error('Error fetching website content:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get content by section and key
  const getContent = (section: string, key: string, fallback = '') => {
    return content[section]?.[key] || fallback;
  };

  // Helper function to get all content for a section
  const getSection = (section: string) => {
    return content[section] || {};
  };

  return {
    content,
    loading,
    getContent,
    getSection,
    refreshContent: fetchContent
  };
}