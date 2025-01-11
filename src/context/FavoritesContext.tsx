import React, { createContext, useState, useEffect } from 'react';
import { Template } from '@/types/sanity';
import { FavoritesContextType } from './favorites.types';

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Template[]>([]);

  // Cargar favoritos del localStorage al iniciar
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (template: Template) => {
    setFavorites(prev => {
      if (!prev.some(item => item._id === template._id)) {
        return [...prev, template];
      }
      return prev;
    });
  };

  const removeFavorite = (templateId: string) => {
    setFavorites(prev => prev.filter(item => item._id !== templateId));
  };

  const isFavorite = (templateId: string) => {
    return favorites.some(item => item._id === templateId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const FavoritesContextInstance = FavoritesContext;
