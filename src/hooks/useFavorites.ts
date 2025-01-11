import { useContext } from 'react';
import { FavoritesContextInstance } from '@/context/FavoritesContext';

export function useFavorites() {
  const context = useContext(FavoritesContextInstance);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
