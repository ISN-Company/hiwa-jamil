-- Create three users with different roles
-- Note: In a real application, users would sign up themselves
-- This is just for testing purposes

-- Insert default admin user (you'll need to create this user through Supabase Auth first)
-- Then update their profile role to admin
-- For testing, I'll create profile entries that can be linked to actual users later

-- First, let's ensure we have some test data structure
-- We'll create users manually through the dashboard, then run this to set their roles

-- Example SQL to update user roles (run after creating users through Supabase Dashboard):
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'admin@isn.com';
-- UPDATE public.profiles SET role = 'owner' WHERE email = 'owner@isn.com';  
-- UPDATE public.profiles SET role = 'user' WHERE email = 'user@isn.com';

-- For now, let's just ensure our RLS policies are properly set up for the different roles
-- Let's also add some sample data for testing

-- Insert sample products (if none exist)
INSERT INTO public.products (name_en, description_en, category, price, is_active) 
VALUES 
  ('Oil Filter', 'High quality oil filter for all vehicles', 'Filters', 25.99, true),
  ('Engine Oil', 'Premium synthetic engine oil', 'Oils', 45.50, true),
  ('Brake Pads', 'Ceramic brake pads for enhanced stopping power', 'Brakes', 89.99, true)
ON CONFLICT DO NOTHING;

-- Insert sample brands (if none exist)
INSERT INTO public.brands (name, description_en, is_active)
VALUES 
  ('Castrol', 'Leading global brand in automotive lubricants', true),
  ('Mobil 1', 'Premium synthetic motor oil brand', true),
  ('Shell', 'Global energy and petrochemical company', true)
ON CONFLICT DO NOTHING;

-- Insert sample partners (if none exist)
INSERT INTO public.partners (name, description_en, contact_email, is_active)
VALUES 
  ('AutoParts Plus', 'Leading automotive parts distributor', 'contact@autoparts.com', true),
  ('MechPro Services', 'Professional automotive service provider', 'info@mechpro.com', true)
ON CONFLICT DO NOTHING;