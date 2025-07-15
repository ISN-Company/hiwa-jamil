-- Seed website content for dynamic management
-- Clear existing content first
DELETE FROM website_content;

-- Hero Section Content
INSERT INTO website_content (section, key, value_en, value_ar, value_ku, content_type, is_active) VALUES
('hero', 'title', 'Professional Vehicle Services in Kurdistan', 'خدمات السيارات المهنية في كردستان', 'خزمەتگوزاری پیشەیی ئۆتۆمبیل لە کوردستان', 'title', true),
('hero', 'subtitle', 'Quality oil changes, maintenance, and automotive services for cars, motorcycles, and trucks', 'تغيير الزيت عالي الجودة والصيانة وخدمات السيارات للسيارات والدراجات النارية والشاحنات', 'گۆڕینی زەیتی بەرزی کوالیتی، چاکسازی و خزمەتگوزاری ئۆتۆمبیل بۆ ئۆتۆمبیل و موتۆرسیکل و لۆری', 'description', true),
('hero', 'cta_button', 'Book Service Now', 'احجز الخدمة الآن', 'ئێستا خزمەتگوزاری حجز بکە', 'text', true),
('hero', 'phone_button', 'Call Now', 'اتصل الآن', 'ئێستا پەیوەندی بکە', 'text', true),

-- About Section Content  
('about', 'title', 'Our Story', 'قصتنا', 'چیرۆکی ئێمە', 'title', true),
('about', 'story_text_1', 'Since 2020, we have been providing the Kurdistan Region with professional automotive maintenance and oil services.', 'منذ عام 2020، قدمنا لإقليم كردستان خدمات الصيانة المهنية للسيارات وخدمات الزيت.', 'لە ساڵی ٢٠٢٠ەوە، ئێمە خزمەتگوزاری چاکسازی پیشەیی ئۆتۆمبیل و زەیت بە هەرێمی کوردستان دابین دەکەین.', 'text', true),
('about', 'story_text_2', 'Our commitment to quality service and customer satisfaction has made us a trusted name in Erbil.', 'التزامنا بالخدمة عالية الجودة ورضا العملاء جعلنا اسمًا موثوقًا في قضاء السليمانية.', 'پابەندبوونمان بە خزمەتگوزاری کوالیتی و ڕازیبوونی کڕیار کردوومانە ناوێکی متمانەپێکراو لە سلێمانی.', 'text', true),
('about', 'story_text_3', 'Today we continue to expand our services while maintaining the highest standards of quality and professionalism.', 'اليوم نواصل توسيع خدماتنا مع الحفاظ على أعلى معايير الجودة والمهنية.', 'ئەمڕۆ ئێمە بەردەوامین لە فراوانکردنی خزمەتگوزاریەکانمان لەگەڵ پاراستنی بەرزترین ستانداردەکانی کوالیتی و پیشەیی.', 'text', true),

-- Services Section Content
('services', 'title', 'Our Services', 'خدماتنا', 'خزمەتگوزاریەکانمان', 'title', true),
('services', 'description', 'Professional automotive maintenance services with quality parts and expertise', 'خدمات صيانة السيارات المهنية مع قطع الغيار عالية الجودة والخبرة', 'خزمەتگوزاری چاکسازی پیشەیی ئۆتۆمبیل لەگەڵ پارچە کوالیتی و شارەزایی', 'description', true),

-- Contact Section Content
('contact', 'title', 'Contact Us', 'اتصل بنا', 'پەیوەندیمان پێوە بکە', 'title', true),
('contact', 'subtitle', 'Get in touch for professional oil services and expert advice', 'تواصل معنا للحصول على خدمات الزيت المهنية والمشورة الخبيرة', 'بۆ خزمەتگوزاری زەیتی پیشەیی و ڕاوێژی شارەزا پەیوەندیمان پێوە بکە', 'description', true),
('contact', 'phone_number', '+964 750 123 4567', '+964 750 123 4567', '+964 750 123 4567', 'phone', true),
('contact', 'email', 'info@hiwajamil.com', 'info@hiwajamil.com', 'info@hiwajamil.com', 'email', true),
('contact', 'address', 'Erbil, Kurdistan Region, Iraq', 'السليمانية، إقليم كردستان، العراق', 'سلێمانی، هەرێمی کوردستان، عێراق', 'text', true),
('contact', 'hours', 'Mon-Sat: 8:00 AM - 8:00 PM, Sunday: 10:00 AM - 6:00 PM', 'الاثنين-السبت: 8:00 ص - 8:00 م، الأحد: 10:00 ص - 6:00 م', 'دووشەممە-شەممە: ٨:٠٠ بەیانی - ٨:٠٠ ئێوارە، یەکشەممە: ١٠:٠٠ بەیانی - ٦:٠٠ ئێوارە', 'text', true),

-- Footer Content
('footer', 'company_description', 'Professional automotive services in Kurdistan Region since 2020', 'خدمات السيارات المهنية في إقليم كردستان منذ عام 2020', 'خزمەتگوزاری پیشەیی ئۆتۆمبیل لە هەرێمی کوردستان لە ساڵی ٢٠٢٠ەوە', 'text', true),

-- Business Information
('business', 'company_name', 'Hiwa Jamil Oil Services', 'خدمات زيت هيوا جميل', 'خزمەتگوزاری زەیتی هیوا جەمیل', 'text', true),
('business', 'founded_year', '2020', '2020', '٢٠٢٠', 'text', true),
('business', 'experience_years', '4+', '4+', '٤+', 'text', true),
('business', 'customers_count', '5000+', '5000+', '٥٠٠٠+', 'text', true),
('business', 'services_completed', '15000+', '15000+', '١٥٠٠٠+', 'text', true),
('business', 'rating', '4.9', '4.9', '٤.٩', 'text', true),

-- CTA Section
('cta', 'title', 'Ready to Give Your Vehicle the Care It Deserves?', 'هل أنت مستعد لإعطاء سيارتك العناية التي تستحقها؟', 'ئامادەیت ئەو چاودێریەی بدەیت بە ئۆتۆمبیلەکەت کە شایستەتی؟', 'title', true),
('cta', 'description', 'Professional service, quality parts, and expert care for your vehicle', 'خدمة مهنية وقطع غيار عالية الجودة ورعاية خبيرة لسيارتك', 'خزمەتگوزاری پیشەیی، پارچە کوالیتی و چاودێری شارەزا بۆ ئۆتۆمبیلەکەت', 'description', true);

-- Services Details
INSERT INTO website_content (section, key, value_en, value_ar, value_ku, content_type, is_active) VALUES
('service_1', 'title', 'Oil Change Service', 'خدمة تغيير الزيت', 'خزمەتگوزاری گۆڕینی زەیت', 'title', true),
('service_1', 'description', 'Complete oil change with premium quality oils', 'تغيير زيت كامل بزيوت عالية الجودة', 'گۆڕینی زەیتی تەواو بە زەیتی کوالیتی پڕیمیەم', 'description', true),
('service_1', 'price', 'From $29.99', 'من $29.99', 'لە $29.99ەوە', 'text', true),

('service_2', 'title', 'Filter Replacement', 'استبدال المرشح', 'گۆڕینەوەی فلتەر', 'title', true),
('service_2', 'description', 'Engine, air, and cabin filter replacement', 'استبدال مرشح المحرك والهواء والمقصورة', 'گۆڕینەوەی فلتەری بزوێنەر و هەوا و کابینە', 'description', true),
('service_2', 'price', 'From $19.99', 'من $19.99', 'لە $19.99ەوە', 'text', true),

('service_3', 'title', 'Engine Maintenance', 'صيانة المحرك', 'چاکسازی بزوێنەر', 'title', true),
('service_3', 'description', 'Comprehensive engine care and maintenance', 'العناية الشاملة بالمحرك والصيانة', 'چاودێری و چاکسازی بەرفراوانی بزوێنەر', 'description', true),
('service_3', 'price', 'From $79.99', 'من $79.99', 'لە $79.99ەوە', 'text', true),

('service_4', 'title', 'Quick Service', 'خدمة سريعة', 'خزمەتگوزاری خێرا', 'title', true),
('service_4', 'description', 'Fast and efficient service for busy schedules', 'خدمة سريعة وفعالة للجداول المزدحمة', 'خزمەتگوزاری خێرا و کارا بۆ کاتەخشانی قەرەباڵغ', 'description', true),
('service_4', 'price', 'From $24.99', 'من $24.99', 'لە $24.99ەوە', 'text', true);

-- Process Steps
INSERT INTO website_content (section, key, value_en, value_ar, value_ku, content_type, is_active) VALUES
('process', 'title', 'Our Service Process', 'عملية خدمتنا', 'پڕۆسەی خزمەتگوزاریمان', 'title', true),
('process', 'description', 'Simple, transparent, and professional service every time', 'خدمة بسيطة وشفافة ومهنية في كل مرة', 'خزمەتگوزاری سادە و ڕوون و پیشەیی لە هەر جارێکدا', 'description', true),

('process_step_1', 'title', 'Drive In', 'قيادة في', 'لێخوڕین', 'title', true),
('process_step_1', 'description', 'No appointment needed. Drive in when convenient for you.', 'لا حاجة لموعد. قود عندما يكون مناسبًا لك.', 'پێویستیت بە کات نیە. کاتێک بۆت گونجاوە بێرە ژوورەوە.', 'description', true),

('process_step_2', 'title', 'Inspection', 'فحص', 'پشکنین', 'title', true),
('process_step_2', 'description', 'Complete vehicle inspection and service recommendation.', 'فحص كامل للمركبة وتوصية الخدمة.', 'پشکنینی تەواوی ئۆتۆمبیل و پێشنیاری خزمەتگوزاری.', 'description', true),

('process_step_3', 'title', 'Service', 'خدمة', 'خزمەتگوزاری', 'title', true),
('process_step_3', 'description', 'Professional service with quality parts and oils.', 'خدمة مهنية مع قطع الغيار والزيوت عالية الجودة.', 'خزمەتگوزاری پیشەیی لەگەڵ پارچە و زەیتی کوالیتی.', 'description', true),

('process_step_4', 'title', 'Drive Out', 'قيادة خارج', 'دەرچوون', 'title', true),
('process_step_4', 'description', 'Quick payment and you are back on the road.', 'دفع سريع وأنت عائد على الطريق.', 'پارەدان خێرا و دەگەڕێیتەوە سەر ڕێگا.', 'description', true);