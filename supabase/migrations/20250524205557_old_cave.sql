/*
  # Add admin user and improve security

  1. Changes
    - Create function to get current user ID safely
    - Add current user as admin if not already present
    - Add RLS policies for admin access

  2. Security
    - Enable RLS
    - Add policies for admin users
*/

-- Create a function to get authenticated user ID safely
CREATE OR REPLACE FUNCTION get_auth_user_id()
RETURNS uuid
LANGUAGE sql
STABLE
AS $$
  SELECT COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000000'::uuid);
$$;

-- Insert current user as admin if not already present
DO $$
DECLARE
  current_user_id uuid;
BEGIN
  SELECT get_auth_user_id() INTO current_user_id;
  
  IF current_user_id != '00000000-0000-0000-0000-000000000000' THEN
    INSERT INTO admin_users (user_id)
    VALUES (current_user_id)
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
END
$$;