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
          <div className="min-h-screen bg-background">
            <Navigation />
            <main className="w-full py-6 px-4 mt-16">
              <AppRoutes />
            </main>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
