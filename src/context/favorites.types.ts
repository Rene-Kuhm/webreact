import { Template } from '@/types/sanity';

export interface FavoritesContextType {
  favorites: Template[];
  addFavorite: (template: Template) => void;
  removeFavorite: (templateId: string) => void;
  isFavorite: (templateId: string) => boolean;
}
