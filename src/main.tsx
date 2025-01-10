// Imports de React
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from './components/ui/toaster';

// Renderizado de React
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)