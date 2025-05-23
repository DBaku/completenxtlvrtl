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
    // Get the current session
    const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('Error getting session:', sessionError);
      return null;
    }

    // If there's no current session, return null without attempting refresh
    if (!currentSession) {
      return null;
    }

    // Only attempt to refresh if we have a current session
    const { data: { session: refreshedSession }, error: refreshError } = await supabase.auth.refreshSession();
    
    if (refreshError) {
      console.error('Error refreshing session:', refreshError);
      // Sign out the user if refresh fails
      await supabase.auth.signOut();
      return null;
    }

    return refreshedSession;
  } catch (error) {
    console.error('Error in session management:', error);
    // Sign out the user if any unexpected error occurs
    await supabase.auth.signOut();
    return null;
  }
};