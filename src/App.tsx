import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Layout from '@/components/Layout/Layout';
import PortfolioPage from '@/pages/PortfolioPage'
import AboutPage from '@/pages/AboutPage';
import ContactoPage from '@/pages/ContactPage';

export default function App() {
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/sobre-mi" element={<AboutPage />} />
      </Routes>
      </Layout>
    </Router>
  );
}
