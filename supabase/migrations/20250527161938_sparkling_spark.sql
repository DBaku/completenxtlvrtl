/*
  # Create admin settings table

  1. New Tables
    - `admin_settings`
      - `id` (uuid, primary key)
      - `max_upload_size` (integer, in bytes)
      - `allowed_file_types` (text array)
      - `theme` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `admin_settings` table
    - Add policy for admin users to manage settings
*/

CREATE TABLE IF NOT EXISTS admin_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  max_upload_size integer NOT NULL DEFAULT 10485760, -- 10MB in bytes
  allowed_file_types text[] NOT NULL DEFAULT ARRAY['image/jpeg', 'image/png', 'image/webp'],
  theme text NOT NULL DEFAULT 'default',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin users can manage settings"
  ON admin_settings
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
    )
  );

-- Insert default settings
INSERT INTO admin_settings (
  max_upload_size,
  allowed_file_types,
  theme
) VALUES (
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp'],
  'default'
);