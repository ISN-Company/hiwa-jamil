-- Add content for About page
INSERT INTO website_content (section, key, value_en, value_ar, value_ku, content_type) VALUES
-- About Hero Section
('about', 'hero_title', 'About Hiwa Jamil Oil Services', 'حول خدمات هيوا جميل للزيوت', 'دەربارەی خزمەتگوزاری ڕۆنی هیوا جەمیل', 'text'),
('about', 'hero_subtitle', 'Your trusted partner for professional vehicle maintenance in Erbil. We''ve been serving the Kurdistan Region with quality oil services since 2020.', 'شريكك الموثوق للصيانة المهنية للمركبات في السليمانية. نحن نخدم إقليم كردستان بخدمات الزيوت عالية الجودة منذ عام 2020.', 'پارتنەری متمانەپێکراوی تۆ بۆ چاکردنەوەی پیشەیی ئۆتۆمبێل لە سلێمانی. ئێمە لە ساڵی ٢٠٢٠ەوە خزمەتگوزاری ڕۆنی باش دەکەین لە هەرێمی کوردستان.', 'text'),
('about', 'mission_text', 'To provide reliable, professional automotive maintenance services that keep your vehicles running smoothly and safely on Kurdistan''s roads.', 'تقديم خدمات صيانة سيارات موثوقة ومهنية تحافظ على سير مركباتك بسلاسة وأمان على طرق كردستان.', 'پێشکەشکردنی خزمەتگوزاری چاکردنەوەی پیشەیی و متمانەپێکراو کە ئۆتۆمبێلەکانت بە ئاسایی و بە ئاسایشی ڕابکات لەسەر ڕێگاکانی کوردستان.', 'text'),

-- About Stats
('about', 'stat_customers', '5000+', '5000+', '+٥٠٠٠', 'text'),
('about', 'stat_experience', '4+', '4+', '+٤', 'text'),
('about', 'stat_services', '15000+', '15000+', '+١٥٠٠٠', 'text'),
('about', 'stat_rating', '4.9', '4.9', '٤.٩', 'text'),

-- About Story
('about', 'story_title', 'Our Story', 'قصتنا', 'چیرۆکەکەمان', 'text'),
('about', 'story_text_1', 'Founded in 2020 by Hiwa Jamil, our company began with a simple mission: to provide the Kurdistan Region with professional, reliable automotive maintenance services.', 'تأسست في عام 2020 من قبل هيوا جميل، بدأت شركتنا بمهمة بسيطة: تقديم خدمات صيانة سيارات مهنية وموثوقة لإقليم كردستان.', 'لە ساڵی ٢٠٢٠ لە لایەن هیوا جەمیلەوە دامەزراند، کۆمپانیاکەمان بە ئامانجێکی سادە دەستیپێکرد: پێشکەشکردنی خزمەتگوزاری چاکردنەوەی پیشەیی و متمانەپێکراو بۆ هەرێمی کوردستان.', 'text'),

-- Contact Page Content
('contact', 'hero_title', 'Contact Us', 'اتصل بنا', 'پەیوەندیمان پێوە بکە', 'text'),
('contact', 'hero_subtitle', 'Get in touch for professional oil services and expert advice', 'تواصل معنا للحصول على خدمات الزيوت المهنية والمشورة المتخصصة', 'پەیوەندیمان پێوە بکە بۆ خزمەتگوزاری پیشەیی ڕۆن و ڕاوێژی شارەزا', 'text'),

-- Contact Info
('contact', 'phone_primary', '+964 750 123 4567', '+964 750 123 4567', '+٩٦٤ ٧٥٠ ١٢٣ ٤٥٦٧', 'text'),
('contact', 'phone_secondary', '+964 751 234 5678', '+964 751 234 5678', '+٩٦٤ ٧٥١ ٢٣٤ ٥٦٧٨', 'text'),
('contact', 'email_primary', 'info@hiwajamil.com', 'info@hiwajamil.com', 'info@hiwajamil.com', 'text'),
('contact', 'email_secondary', 'service@hiwajamil.com', 'service@hiwajamil.com', 'service@hiwajamil.com', 'text'),
('contact', 'address', 'Erbil, Kurdistan Region, Iraq', 'السليمانية، إقليم كردستان، العراق', 'سلێمانی، هەرێمی کوردستان، عێراق', 'text'),
('contact', 'hours_weekday', 'Mon-Sat: 8:00 AM - 8:00 PM', 'الاثنين-السبت: 8:00 صباحاً - 8:00 مساءً', 'دووشەممە-شەممە: ٨:٠٠ بەیانی - ٨:٠٠ ئێوارە', 'text'),
('contact', 'hours_sunday', 'Sunday: 10:00 AM - 6:00 PM', 'الأحد: 10:00 صباحاً - 6:00 مساءً', 'یەکشەممە: ١٠:٠٠ بەیانی - ٦:٠٠ ئێوارە', 'text'),

-- Brands Page Content
('brands', 'hero_title', 'Premium Auto Products', 'منتجات السيارات المميزة', 'بەرهەمە پیشەسازیەکانی ئۆتۆمبێل', 'text'),
('brands', 'hero_subtitle', 'Quality oils, filters, and accessories from trusted brands', 'زيوت وفلاتر واكسسوارات عالية الجودة من علامات تجارية موثوقة', 'ڕۆن و فیلتەر و پێداویستیە باشەکان لە براندە متمانەپێکراوەکان', 'text'),
('brands', 'trusted_brands_title', 'Trusted Brands', 'العلامات التجارية الموثوقة', 'براندە متمانەپێکراوەکان', 'text'),
('brands', 'trusted_brands_subtitle', 'We partner with industry-leading brands to provide you with the highest quality products', 'نتشارك مع العلامات التجارية الرائدة في الصناعة لنقدم لك أعلى جودة من المنتجات', 'ئێمە لەگەڵ براندە سەرەکیەکانی پیشەسازی هاوکاری دەکەین بۆ پێشکەشکردنی باشترین بەرهەمەکان', 'text'),

-- Footer Content
('footer', 'description', 'Professional oil services and automotive maintenance in Erbil, Kurdistan Region. Trusted by thousands of customers since 2020.', 'خدمات الزيوت المهنية وصيانة السيارات في السليمانية، إقليم كردستان. موثوق به من قبل آلاف العملاء منذ عام 2020.', 'خزمەتگوزاری پیشەیی ڕۆن و چاکردنەوەی ئۆتۆمبێل لە سلێمانی، هەرێمی کوردستان. لە ساڵی ٢٠٢٠ەوە متمانەی هەزاران کڕیاری پێکراوە.', 'text'),
('footer', 'quick_links_title', 'Quick Links', 'روابط سريعة', 'بەستەرە خێراکان', 'text'),
('footer', 'services_title', 'Our Services', 'خدماتنا', 'خزمەتگوزارییەکانمان', 'text'),
('footer', 'contact_title', 'Contact Info', 'معلومات الاتصال', 'زانیاری پەیوەندی', 'text'),

-- Team Members
('about', 'team_member_1_name', 'Hiwa Jamil', 'هيوا جميل', 'هیوا جەمیل', 'text'),
('about', 'team_member_1_role', 'Founder & Lead Technician', 'المؤسس والفني الرئيسي', 'دامەزرێنەر و سەرەکی تەکنیسیەن', 'text'),
('about', 'team_member_1_description', 'With over 10 years in automotive service, Hiwa founded our company to provide reliable, professional oil services.', 'مع أكثر من 10 سنوات في خدمة السيارات، أسس هيوا شركتنا لتقديم خدمات زيوت موثوقة ومهنية.', 'بە زیاتر لە ١٠ ساڵ ئەزموون لە خزمەتگوزاری ئۆتۆمبێل، هیوا کۆمپانیاکەمانی دامەزراند بۆ پێشکەشکردنی خزمەتگوزاری ڕۆنی متمانەپێکراو و پیشەیی.', 'text');

-- Add Values/Why Choose Us
INSERT INTO website_content (section, key, value_en, value_ar, value_ku, content_type) VALUES
('about', 'why_choose_title', 'Why Choose Us', 'لماذا تختارنا', 'بۆچی ئێمە هەڵبژێریت', 'text'),
('about', 'why_choose_subtitle', 'We''re committed to providing exceptional service through our core values and principles', 'نحن ملتزمون بتقديم خدمة استثنائية من خلال قيمنا ومبادئنا الأساسية', 'ئێمە پابەندین بە پێشکەشکردنی خزمەتگوزاری تایبەت لە ڕێگەی بەها و بنەماکانمان', 'text'),

('about', 'value_1_title', 'Quality Assurance', 'ضمان الجودة', 'دڵنیایی جۆری', 'text'),
('about', 'value_1_description', 'We use only premium quality oils and parts from trusted brands to ensure your vehicle''s optimal performance.', 'نحن نستخدم فقط الزيوت والقطع عالية الجودة من العلامات التجارية الموثوقة لضمان الأداء الأمثل لمركبتك.', 'ئێمە تەنها ڕۆن و پارچە باشەکان بەکاردێنین لە براندە متمانەپێکراوەکان بۆ دڵنیاکردنەوە لە باشترین کارایی ئۆتۆمبێلەکەت.', 'text'),

('about', 'value_2_title', 'Fast & Efficient', 'سريع وفعال', 'خێرا و کارا', 'text'),
('about', 'value_2_description', 'Our streamlined process ensures quick service without compromising quality, getting you back on the road fast.', 'عمليتنا المبسطة تضمن خدمة سريعة دون التنازل عن الجودة، لإعادتك إلى الطريق بسرعة.', 'پرۆسەی ساکارکراوەکەمان دڵنیایی خزمەتگوزاری خێرا دەکات بەبێ ئەوەی جۆری زیان بکات، بە خێرایی دەتگەڕێنێتەوە ڕێگا.', 'text'),

('about', 'value_3_title', 'Professional Expertise', 'خبرة مهنية', 'شارەزایی پیشەیی', 'text'),
('about', 'value_3_description', 'Our certified technicians have years of experience servicing all types of vehicles with precision and care.', 'الفنيون المعتمدون لدينا لديهم سنوات من الخبرة في خدمة جميع أنواع المركبات بدقة ورعاية.', 'تەکنیسیەنە بڕوانامەدارەکانمان ساڵانێک ئەزموونیان هەیە لە خزمەتکردنی هەموو جۆرەکانی ئۆتۆمبێل بە وردی و چاودێری.', 'text'),

('about', 'value_4_title', 'Customer Focused', 'التركيز على العملاء', 'سەرنج لەسەر کڕیار', 'text'),
('about', 'value_4_description', 'Your satisfaction is our priority. We provide transparent service and competitive pricing for every customer.', 'رضاكم هو أولويتنا. نحن نقدم خدمة شفافة وأسعار تنافسية لكل عميل.', 'ڕازیبوونی تۆ ئەولەویەتی ئێمەیە. ئێمە خزمەتگوزاری ڕوون و نرخی ڕکابەرانە پێشکەش دەکەین بۆ هەموو کڕیارێک.', 'text');