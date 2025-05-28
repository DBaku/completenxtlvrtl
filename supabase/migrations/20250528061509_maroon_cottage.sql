/*
  # Add initial admin user

  1. Changes
    - Adds the specified email address as an admin user
    - Uses a unique variable name to avoid column ambiguity
*/

DO $$ 
DECLARE 
  admin_user_id uuid;
BEGIN
  -- Get the user ID for the admin email
  SELECT id INTO admin_user_id 
  FROM auth.users 
  WHERE email = 'bakumenko.arts@gmx.de';

  -- If user exists, add them as admin
  IF admin_user_id IS NOT NULL THEN
    INSERT INTO admin_users (user_id)
    VALUES (admin_user_id)
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
END $$;