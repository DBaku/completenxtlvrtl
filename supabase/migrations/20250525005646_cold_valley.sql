/*
  # Add admin user

  1. Changes
    - Insert admin user into admin_users table
    - Links to the authenticated user with the specified email

  2. Security
    - Only adds the admin role, does not modify existing RLS policies
*/

DO $$ 
DECLARE 
  user_id uuid;
BEGIN
  -- Get the user ID for the admin email
  SELECT id INTO user_id 
  FROM auth.users 
  WHERE email = 'bakumenko.arts@gmx.de';

  -- If user exists, add them as admin
  IF user_id IS NOT NULL THEN
    INSERT INTO admin_users (user_id)
    VALUES (user_id)
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
END $$;