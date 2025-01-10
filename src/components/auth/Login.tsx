import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { ErrorDialog } from '@/components/ui/alert-message';
import '@/styles/auth.css';

export default function Login() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<{ title: string; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await auth.login(formData);
      navigate('/dashboard');
    } catch (err) {
      setError({
        title: 'Error de inicio de sesión',
        message: err instanceof Error ? err.message : 'Error al iniciar sesión',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/10" />
        
        {/* Animated Circles */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-50 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      {/* Glass Card Container */}
      <div className="relative w-full max-w-md p-6 bg-white/10 backdrop-blur-lg rounded-lg shadow-xl border border-white/20">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium flex items-center gap-2">
              <FaEnvelope className="w-4 h-4" />
              <span>Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-white/50" />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium flex items-center gap-2">
              <FaLock className="w-4 h-4" />
              <span>Contraseña</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-white/50" />
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/20"
          >
            Iniciar Sesión
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-transparent px-2 text-white/70">O continúa con</span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20">
            Google
          </Button>
          <Button variant="outline" className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20">
            GitHub
          </Button>
        </div>

        {/* Register Link */}
        <p className="mt-4 text-center text-white/80">
          ¿No tienes una cuenta?{' '}
          <Button
            variant="link"
            className="p-0 h-auto font-semibold text-white hover:text-white/90"
            onClick={() => navigate('/register')}
          >
            Regístrate
          </Button>
        </p>
      </div>

      {error && (
        <ErrorDialog
          isOpen={!!error}
          onClose={() => setError(null)}
          title={error.title}
          message={error.message}
        />
      )}
    </div>
  );
}
