/*
  # Add admin user

  1. Changes
    - Insert admin user for email 'bakumenko.arts@gmx.de'
    
  2. Security
    - Only inserts if user exists
    - Handles conflicts gracefully
*/

DO $$ 
DECLARE 
  v_user_id uuid;
BEGIN
  -- Get the user ID for the admin email
  SELECT id INTO v_user_id 
  FROM auth.users 
  WHERE email = 'bakumenko.arts@gmx.de';

  -- If user exists, add them as admin
  IF v_user_id IS NOT NULL THEN
    INSERT INTO admin_users (user_id)
    VALUES (v_user_id)
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
END $$;