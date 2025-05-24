/*
  # Add current user as admin

  1. Changes
    - Insert the current authenticated user into admin_users table
    - Only insert if the user doesn't already exist as admin
    - Use proper error handling for auth.uid()
*/

DO $$
DECLARE
  current_user_id UUID;
BEGIN
  -- Get the current user's ID
  current_user_id := auth.uid();
  
  -- Only proceed if we have a valid user ID
  IF current_user_id IS NOT NULL THEN
    -- Insert the user as admin if they don't already exist
    INSERT INTO admin_users (user_id)
    SELECT current_user_id
    WHERE NOT EXISTS (
      SELECT 1 FROM admin_users WHERE user_id = current_user_id
    );
  END IF;
END $$;