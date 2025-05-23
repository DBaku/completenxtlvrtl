/*
  # Add initial admin user
  
  1. Changes
    - Insert current user as admin
*/

INSERT INTO admin_users (user_id)
SELECT auth.uid()
WHERE NOT EXISTS (
  SELECT 1 FROM admin_users WHERE user_id = auth.uid()
);