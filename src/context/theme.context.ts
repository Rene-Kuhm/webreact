import { createContext } from 'react';
import type { ThemeContextType } from './theme.constants';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
