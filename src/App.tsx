import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/auth.provider';
import { CartProvider } from '@/context/CartContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import Navigation from './components/Navigation/Navigation';
import AppRoutes from './components/routes/AppRoutes';

function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <Router>
          <AuthProvider>
            <div className="min-h-screen">
              <Navigation />
              <main className="px-4 py-6 mt-16 w-full">
                <AppRoutes />
              </main>
            </div>
          </AuthProvider>
        </Router>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;
