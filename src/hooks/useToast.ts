import { useCallback } from 'react';

type ToastOptions = {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
  action?: React.ReactNode;
};

export const useToast = () => {
  const showToast = useCallback(({ title, description, variant = 'default', action }: ToastOptions) => {
    // Temporary implementation - replace with actual toast library
    console.log({
      title,
      description,
      variant,
      action
    });
  }, []);

  return { toast: showToast };
};
