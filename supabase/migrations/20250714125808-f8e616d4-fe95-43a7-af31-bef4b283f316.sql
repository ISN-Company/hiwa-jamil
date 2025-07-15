-- Create test users with different roles
-- First you need to create these users through Supabase Auth Dashboard:
-- 1. Go to Authentication > Users in Supabase Dashboard
-- 2. Create users with these emails:
--    - admin@isn.com (password: admin123)
--    - owner@isn.com (password: owner123) 
--    - user@isn.com (password: user123)

-- Then run these SQL commands to set their roles:

-- Update admin user role
UPDATE public.profiles 
SET role = 'admin', full_name = 'System Administrator'
WHERE email = 'admin@isn.com';

-- Update owner user role  
UPDATE public.profiles 
SET role = 'owner', full_name = 'Business Owner'
WHERE email = 'owner@isn.com';

-- Update regular user role
UPDATE public.profiles 
SET role = 'user', full_name = 'Regular User'
WHERE email = 'user@isn.com';

-- Verify the roles were set correctly
SELECT email, full_name, role, is_active FROM public.profiles ORDER BY role;