-- Set user roles after creating them in Auth Dashboard
-- Make sure you've created the users first with the emails below

UPDATE public.profiles 
SET role = 'admin', full_name = 'System Administrator'
WHERE email = 'admin@isn.com';

UPDATE public.profiles 
SET role = 'owner', full_name = 'Business Owner'
WHERE email = 'owner@isn.com';

UPDATE public.profiles 
SET role = 'user', full_name = 'Regular User'
WHERE email = 'user@isn.com';

-- Verify the users were created and roles set
SELECT email, full_name, role, is_active 
FROM public.profiles 
ORDER BY role;