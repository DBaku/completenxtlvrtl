import React, { useEffect, useState } from 'react';
import { checkAdminStatus } from '../lib/admin';
import toast from 'react-hot-toast';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      const isAdminUser = await checkAdminStatus();
      setIsAdmin(isAdminUser);
      
      if (!isAdminUser) {
        toast.error('Unauthorized access');
        window.location.href = '/';
      }
    };

    checkAdmin();
  }, []);

  if (isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-600"></div>
      </div>
    );
  }

  return isAdmin ? <>{children}</> : null;
};

export default AdminRoute;