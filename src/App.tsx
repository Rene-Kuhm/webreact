import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/auth.provider';
import { CartProvider } from './context/cart.context';
import Navigation from './components/Navigation/Navigation';
import AppRoutes from './components/routes/AppRoutes';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen">
            <Navigation />
            <main className="px-4 py-6 mt-16 w-full">
              <AppRoutes />
            </main>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
