import Home from '@/pages/Home';
import PortfolioPage from '@/pages/PortfolioPage';
import AboutPage from '@/pages/AboutPage';
import ContactoPage from '@/pages/ContactPage';
import TemplatesYComponentes from '@/pages/TemplateyComponentes';
import ElectronicaPage from '@/pages/Electronica';
import GamesPage from '@/pages/Juegos';
import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';
import PaymentSuccess from '@/pages/payment/Success';
import PaymentFailure from '@/pages/payment/Failure';
import PaymentPending from '@/pages/payment/Pending';

export interface Route {
  path: string;
  element: React.ComponentType;
  title: string;
  isPublic?: boolean;
}

export const routes: Route[] = [
  {
    path: '/',
    element: Home,
    title: 'Inicio',
    isPublic: true
  },
  {
    path: '/portfolio',
    element: PortfolioPage,
    title: 'Portfolio',
    isPublic: true
  },
  {
    path: '/about',
    element: AboutPage,
    title: 'About',
    isPublic: true
  },
  {
    path: '/contacto',
    element: ContactoPage,
    title: 'Contacto',
    isPublic: true
  },
  {
    path: '/templates',
    element: TemplatesYComponentes,
    title: 'Templates y Componentes'
  },
  {
    path: '/electronica',
    element: ElectronicaPage,
    title: 'Electrónica'
  },
  {
    path: '/juegos',
    element: GamesPage,
    title: 'Juegos'
  },
  {
    path: '/login',
    element: Login,
    title: 'Iniciar Sesión',
    isPublic: true
  },
  {
    path: '/register',
    element: Register,
    title: 'Registro',
    isPublic: true
  },
  {
    path: '/success',
    element: PaymentSuccess,
    title: 'Pago Exitoso'
  },
  {
    path: '/failure',
    element: PaymentFailure,
    title: 'Pago Fallido'
  },
  {
    path: '/pending',
    element: PaymentPending,
    title: 'Pago Pendiente'
  }
];
