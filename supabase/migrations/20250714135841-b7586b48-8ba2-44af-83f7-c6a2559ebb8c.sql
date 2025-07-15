-- Add missing About page content
INSERT INTO website_content (section, key, value_en, value_ar, value_ku, content_type) VALUES
-- About Hero Section (new keys)
('about', 'hero_title', 'About Hiwa Jamil Oil Services', 'حول خدمات هيوا جميل للزيوت', 'دەربارەی خزمەتگوزاری ڕۆنی هیوا جەمیل', 'text'),
('about', 'hero_subtitle', 'Your trusted partner for professional vehicle maintenance in Erbil. We''ve been serving the Kurdistan Region with quality oil services since 2020.', 'شريكك الموثوق للصيانة المهنية للمركبات في السليمانية. نحن نخدم إقليم كردستان بخدمات الزيوت عالية الجودة منذ عام 2020.', 'پارتنەری متمانەپێکراوی تۆ بۆ چاکردنەوەی پیشەیی ئۆتۆمبێل لە سلێمانی. ئێمە لە ساڵی ٢٠٢٠ەوە خزمەتگوزاری ڕۆنی باش دەکەین لە هەرێمی کوردستان.', 'text'),
('about', 'mission_text', 'To provide reliable, professional automotive maintenance services that keep your vehicles running smoothly and safely on Kurdistan''s roads.', 'تقديم خدمات صيانة سيارات موثوقة ومهنية تحافظ على سير مركباتك بسلاسة وأمان على طرق كردستان.', 'پێشکەشکردنی خزمەتگوزاری چاکردنەوەی پیشەیی و متمانەپێکراو کە ئۆتۆمبێلەکانت بە ئاسایی و بە ئاسایشی ڕابکات لەسەر ڕێگاکانی کوردستان.', 'text'),

-- Why Choose Us Section
('about', 'why_choose_title', 'Why Choose Us', 'لماذا تختارنا', 'بۆچی ئێمە هەڵبژێریت', 'text'),
('about', 'why_choose_subtitle', 'We''re committed to providing exceptional service through our core values and principles', 'نحن ملتزمون بتقديم خدمة استثنائية من خلال قيمنا ومبادئنا الأساسية', 'ئێمە پابەندین بە پێشکەشکردنی خزمەتگوزاری تایبەت لە ڕێگەی بەها و بنەماکانمان', 'text'),

-- Values
('about', 'value_1_title', 'Quality Assurance', 'ضمان الجودة', 'دڵنیایی جۆری', 'text'),
('about', 'value_1_description', 'We use only premium quality oils and parts from trusted brands to ensure your vehicle''s optimal performance.', 'نحن نستخدم فقط الزيوت والقطع عالية الجودة من العلامات التجارية الموثوقة لضمان الأداء الأمثل لمركبتك.', 'ئێمە تەنها ڕۆن و پارچە باشەکان بەکاردێنین لە براندە متمانەپێکراوەکان بۆ دڵنیاکردنەوە لە باشترین کارایی ئۆتۆمبێلەکەت.', 'text'),

('about', 'value_2_title', 'Fast & Efficient', 'سريع وفعال', 'خێرا و کارا', 'text'),
('about', 'value_2_description', 'Our streamlined process ensures quick service without compromising quality, getting you back on the road fast.', 'عمليتنا المبسطة تضمن خدمة سريعة دون التنازل عن الجودة، لإعادتك إلى الطريق بسرعة.', 'پرۆسەی ساکارکراوەکەمان دڵنیایی خزمەتگوزاری خێرا دەکات بەبێ ئەوەی جۆری زیان بکات، بە خێرایی دەتگەڕێنێتەوە ڕێگا.', 'text'),

('about', 'value_3_title', 'Professional Expertise', 'خبرة مهنية', 'شارەزایی پیشەیی', 'text'),
('about', 'value_3_description', 'Our certified technicians have years of experience servicing all types of vehicles with precision and care.', 'الفنيون المعتمدون لدينا لديهم سنوات من الخبرة في خدمة جميع أنواع المركبات بدقة ورعاية.', 'تەکنیسیەنە بڕوانامەدارەکانمان ساڵانێک ئەزموونیان هەیە لە خزمەتکردنی هەموو جۆرەکانی ئۆتۆمبێل بە وردی و چاودێری.', 'text'),

('about', 'value_4_title', 'Customer Focused', 'التركيز على العملاء', 'سەرنج لەسەر کڕیار', 'text'),
('about', 'value_4_description', 'Your satisfaction is our priority. We provide transparent service and competitive pricing for every customer.', 'رضاكم هو أولويتنا. نحن نقدم خدمة شفافة وأسعار تنافسية لكل عميل.', 'ڕازیبوونی تۆ ئەولەویەتی ئێمەیە. ئێمە خزمەتگوزاری ڕوون و نرخی ڕکابەرانە پێشکەش دەکەین بۆ هەموو کڕیارێک.', 'text'),

-- Team Members
('about', 'team_member_1_name', 'Hiwa Jamil', 'هيوا جميل', 'هیوا جەمیل', 'text'),
('about', 'team_member_1_role', 'Founder & Lead Technician', 'المؤسس والفني الرئيسي', 'دامەزرێنەر و سەرەکی تەکنیسیەن', 'text'),
('about', 'team_member_1_description', 'With over 10 years in automotive service, Hiwa founded our company to provide reliable, professional oil services.', 'مع أكثر من 10 سنوات في خدمة السيارات، أسس هيوا شركتنا لتقديم خدمات زيوت موثوقة ومهنية.', 'بە زیاتر لە ١٠ ساڵ ئەزموون لە خزمەتگوزاری ئۆتۆمبێل، هیوا کۆمپانیاکەمانی دامەزراند بۆ پێشکەشکردنی خزمەتگوزاری ڕۆنی متمانەپێکراو و پیشەیی.', 'text'),

('about', 'team_member_2_name', 'Ahmad Hassan', 'أحمد حسن', 'ئەحمەد حەسەن', 'text'),
('about', 'team_member_2_role', 'Senior Technician', 'فني أول', 'تەکنیسیەنی پیشکەوتوو', 'text'),
('about', 'team_member_2_description', 'Certified automotive technician specializing in engine maintenance and diagnostic services.', 'فني سيارات معتمد متخصص في صيانة المحركات وخدمات التشخيص.', 'تەکنیسیەنی بڕوانامەداری ئۆتۆمبێل شارەزا لە چاکردنەوەی بزوێنەر و خزمەتگوزاری دیاگنۆستیک.', 'text'),

('about', 'team_member_3_name', 'Sara Mohammed', 'سارة محمد', 'سارا محەمەد', 'text'),
('about', 'team_member_3_role', 'Customer Service Manager', 'مدير خدمة العملاء', 'بەڕێوبەری خزمەتگوزاری کڕیار', 'text'),
('about', 'team_member_3_description', 'Ensures every customer receives exceptional service and support throughout their visit.', 'تضمن حصول كل عميل على خدمة ودعم استثنائيين طوال زيارته.', 'دڵنیایی دەکات هەموو کڕیارێک خزمەتگوزاری و پشتگیری تایبەت وەربگرێت لە کاتی سەردانەکەیاندا.', 'text'),

-- Team section titles
('about', 'team_title', 'Meet Our Team', 'تعرف على فريقنا', 'ناسینی تیمەکەمان', 'text'),
('about', 'team_subtitle', 'Professional, experienced, and dedicated to serving you', 'محترفون وذوو خبرة ومكرسون لخدمتك', 'پیشەیی، بە ئەزموون، و تەرخانکراو بۆ خزمەتکردنت', 'text'),

-- Brands Page Content
('brands', 'hero_title', 'Premium Auto Products', 'منتجات السيارات المميزة', 'بەرهەمە پیشەسازیەکانی ئۆتۆمبێل', 'text'),
('brands', 'hero_subtitle', 'Quality oils, filters, and accessories from trusted brands', 'زيوت وفلاتر واكسسوارات عالية الجودة من علامات تجارية موثوقة', 'ڕۆن و فیلتەر و پێداویستیە باشەکان لە براندە متمانەپێکراوەکان', 'text'),
('brands', 'trusted_brands_title', 'Trusted Brands', 'العلامات التجارية الموثوقة', 'براندە متمانەپێکراوەکان', 'text'),
('brands', 'trusted_brands_subtitle', 'We partner with industry-leading brands to provide you with the highest quality products', 'نتشارك مع العلامات التجارية الرائدة في الصناعة لنقدم لك أعلى جودة من المنتجات', 'ئێمە لەگەڵ براندە سەرەکیەکانی پیشەسازی هاوکاری دەکەین بۆ پێشکەشکردنی باشترین بەرهەمەکان', 'text'),

-- Additional contact information
('contact', 'form_title', 'Send Us a Message', 'أرسل لنا رسالة', 'نامەیەکمان بۆ بنێرە', 'text'),
('contact', 'form_subtitle', 'Fill out the form below and we''ll get back to you within 24 hours', 'املأ النموذج أدناه وسنعود إليك خلال 24 ساعة', 'فۆڕمەکەی خوارەوە پڕبکەرەوە و ئێمە لە ماوەی ٢٤ کاتژمێردا وەڵامت دەدەینەوە', 'text'),

-- Footer Content
('footer', 'description', 'Professional oil services and automotive maintenance in Erbil, Kurdistan Region. Trusted by thousands of customers since 2020.', 'خدمات الزيوت المهنية وصيانة السيارات في السليمانية، إقليم كردستان. موثوق به من قبل آلاف العملاء منذ عام 2020.', 'خزمەتگوزاری پیشەیی ڕۆن و چاکردنەوەی ئۆتۆمبێل لە سلێمانی، هەرێمی کوردستان. لە ساڵی ٢٠٢٠ەوە متمانەی هەزاران کڕیاری پێکراوە.', 'text'),
('footer', 'quick_links_title', 'Quick Links', 'روابط سريعة', 'بەستەرە خێراکان', 'text'),
('footer', 'services_title', 'Our Services', 'خدماتنا', 'خزمەتگوزارییەکانمان', 'text'),
('footer', 'contact_title', 'Contact Info', 'معلومات الاتصال', 'زانیاری پەیوەندی', 'text');