'use client';

import { toast } from 'react-hot-toast';

export const useAppToast = () => {
  const success = (message: string) => toast.success(message);
  const error = (message: string) => toast.error(message);
  const loading = (message: string) => toast.loading(message);

  return { success, error, loading };
};
