import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Helper function to refresh session
export const refreshSession = async () => {
  try {
    const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('Error getting session:', sessionError);
      return null;
    }

    if (!currentSession) {
      return null;
    }

    const { data: { session: refreshedSession }, error: refreshError } = await supabase.auth.refreshSession();
    
    if (refreshError) {
      console.error('Error refreshing session:', refreshError);
      await supabase.auth.signOut();
      return null;
    }

    return refreshedSession;
  } catch (error) {
    console.error('Error in session management:', error);
    await supabase.auth.signOut();
    return null;
  }
};

// Settings management
export const getSettings = async () => {
  const { data, error } = await supabase
    .from('admin_settings')
    .select('*')
    .single();

  if (error) {
    console.error('Error fetching settings:', error);
    return null;
  }

  return data;
};

export const updateSettings = async (settings: any) => {
  const { error } = await supabase
    .from('admin_settings')
    .upsert(settings);

  if (error) {
    throw error;
  }
};

// Artwork management
export const uploadArtwork = async (artwork: any, imageFile: File) => {
  // Upload image to storage
  const fileExt = imageFile.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const { data: imageData, error: imageError } = await supabase.storage
    .from('artworks')
    .upload(fileName, imageFile);

  if (imageError) {
    throw imageError;
  }

  // Get public URL for the uploaded image
  const { data: { publicUrl } } = supabase.storage
    .from('artworks')
    .getPublicUrl(fileName);

  // Save artwork data to database
  const { data, error } = await supabase
    .from('artworks')
    .insert([{ ...artwork, image_url: publicUrl }])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getArtworks = async () => {
  const { data, error } = await supabase
    .from('artworks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

export const updateArtwork = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from('artworks')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const deleteArtwork = async (id: string) => {
  const { error } = await supabase
    .from('artworks')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
};

// User management
export const promoteToAdmin = async (userId: string) => {
  const { error } = await supabase
    .from('admin_users')
    .insert([{ user_id: userId }]);

  if (error) {
    throw error;
  }
};

export const removeAdmin = async (userId: string) => {
  const { error } = await supabase
    .from('admin_users')
    .delete()
    .eq('user_id', userId);

  if (error) {
    throw error;
  }
};