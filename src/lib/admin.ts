import { supabase } from './supabase';

export const checkAdminStatus = async (): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle();

    return !!adminUser?.id;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};