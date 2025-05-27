/*
  # Create artworks table and storage

  1. New Tables
    - `artworks`
      - `id` (uuid, primary key)
      - `title` (text)
      - `category` (text)
      - `price` (numeric)
      - `size` (text)
      - `year` (integer)
      - `description` (text)
      - `image_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `artworks` table
    - Add policies for public read access
    - Add policies for admin write access
*/

CREATE TABLE IF NOT EXISTS artworks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  price numeric NOT NULL,
  size text NOT NULL,
  year integer NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;

-- Public can view artworks
CREATE POLICY "Public can view artworks"
  ON artworks
  FOR SELECT
  TO public
  USING (true);

-- Only admins can modify artworks
CREATE POLICY "Admins can manage artworks"
  ON artworks
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
    )
  );

-- Create storage bucket for artwork images
INSERT INTO storage.buckets (id, name)
VALUES ('artworks', 'artworks')
ON CONFLICT DO NOTHING;

-- Set up storage policies
CREATE POLICY "Public can view artwork images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'artworks');

CREATE POLICY "Admins can upload artwork images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'artworks' AND
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
    )
  );