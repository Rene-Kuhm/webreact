import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { useGeolocation } from '@/hooks/useGeolocation';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { CartDrawer } from '@/components/Layout/CartDrawer';
import { FaShoppingCart } from 'react-icons/fa';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const [storeMenuTimeout, setStoreMenuTimeout] = useState<NodeJS.Timeout | null>(null);
  const { address, loading, error } = useGeolocation();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (storeMenuTimeout !== null) {
      clearTimeout(storeMenuTimeout);
    }
    setIsStoreOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsStoreOpen(false);
    }, 300);
    setStoreMenuTimeout(timeout);
  };

  const navItems = [
    ['INICIO', '/'],
    ['PORTFOLIO', '/portfolio'],
    ['SOBRE MÍ', '/about'],
    ['CONTACTO', '/contacto'],
  ];

  const storeItems = [
    ['Templates / Componentes', '/templates'],
    ['Juegos Digitales', '/juegos'],
    ['Electrónica', '/electronica'],
  ];

  const authItems = [
    ['Iniciar Sesión', '/login'],
    ['Registro', '/register'],
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-300',
          isScrolled ? 'bg-white dark:bg-gray-900 shadow-md py-4' : 'bg-transparent py-6'
        )}
      >
        <div className="w-full px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-2xl font-bold">
                RenéKuhmDev
              </Link>
              <div 
                className="hidden md:flex items-center text-sm text-muted-foreground hover:text-foreground cursor-pointer"
                onClick={() => address && window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`, '_blank')}
              >
                <MapPinIcon className="h-5 w-5 mr-1" />
                <span>
                  {loading ? 'Obteniendo ubicación...' : 
                   error ? 'Ubicación no disponible' : 
                   address || 'Ubicación no encontrada'}
                </span>
              </div>
            </div>
            <div className="items-center hidden space-x-8 md:flex">
              {navItems.map(([title, url]) => (
                <Link
                  key={url}
                  to={url}
                  className="text-sm transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {title}
                </Link>
              ))}
              
              {/* Menú desplegable para la tienda */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="text-sm transition-colors hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
                  onClick={() => setIsStoreOpen((prev) => !prev)}
                >
                  TIENDA
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
                {isStoreOpen && (
                  <div className="absolute top-full left-0 bg-white dark:bg-gray-900 shadow-lg rounded-lg mt-2 py-2 w-48">
                    {storeItems.map(([title, url]) => (
                      <Link
                        key={url}
                        to={url}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        {title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Auth Links */}
              <div className="flex items-center space-x-4">
                {authItems.map(([title, url]) => (
                  <Link
                    key={url}
                    to={url}
                    className="text-sm transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {title}
                  </Link>
                ))}
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Cart Button */}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <FaShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                  }
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4">
              {navItems.map(([title, url]) => (
                <Link
                  key={url}
                  to={url}
                  className="block py-2 text-sm hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {title}
                </Link>
              ))}
              <div className="py-2">
                <div
                  className="text-sm hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => setIsStoreOpen(!isStoreOpen)}
                >
                  TIENDA
                </div>
                {isStoreOpen && (
                  <div className="pl-4 mt-2">
                    {storeItems.map(([title, url]) => (
                      <Link
                        key={url}
                        to={url}
                        className="block py-2 text-sm hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              {/* Mobile Auth Links */}
              {authItems.map(([title, url]) => (
                <Link
                  key={url}
                  to={url}
                  className="block py-2 text-sm hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {title}
                </Link>
              ))}
              <div className="py-2">
                <ThemeToggle />
              </div>
            </div>
          )}
        </div>
      </nav>

      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}