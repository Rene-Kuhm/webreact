import { useContext } from 'react';
import { CartContextInstance } from '@/context/CartContext';

export function useCart() {
  const context = useContext(CartContextInstance);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
