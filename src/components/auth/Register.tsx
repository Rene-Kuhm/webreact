import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
import { ErrorDialog } from '@/components/ui/alert-message';
import '@/styles/auth.css';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    phone: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<{ title: string; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError({
        title: "Error de validación",
        message: "Las contraseñas no coinciden. Por favor, verifica que sean iguales."
      });
      return;
    }

    try {
      await register(formData);
      setError({
        title: "¡Registro exitoso!",
        message: "Te hemos enviado un correo de confirmación. Por favor, revisa tu bandeja de entrada y sigue las instrucciones para activar tu cuenta."
      });
    } catch (err) {
      console.error('Registration error:', err);
      const error = err as Error;
      setError({
        title: "Error de registro",
        message: error?.message || "Ha ocurrido un error al crear tu cuenta. Por favor, intenta nuevamente."
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/10" />
      </div>

      <div className="relative w-full max-w-md p-6 bg-white/10 backdrop-blur-lg rounded-lg shadow-xl border border-white/20">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Crear Cuenta</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-white/50" />
              </div>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>

          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium">Nombre completo</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-white/50" />
              </div>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="Juan Pérez"
                required
              />
            </div>
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium">Teléfono</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaPhone className="h-5 w-5 text-white/50" />
              </div>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="+54 9 11 1234-5678"
                required
              />
            </div>
          </div>

          {/* Password Fields */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium">Contraseña</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-white/50" />
              </div>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-white text-sm font-medium">Confirmar contraseña</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-white/50" />
              </div>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/20"
          >
            Crear cuenta
          </Button>
        </form>

        <p className="mt-4 text-center text-white/80">
          ¿Ya tienes una cuenta?{' '}
          <Button
            variant="link"
            className="p-0 h-auto font-semibold text-white hover:text-white/90"
            onClick={() => navigate('/login')}
          >
            Inicia sesión
          </Button>
        </p>
      </div>

      {error && (
        <ErrorDialog
          isOpen={!!error}
          onClose={() => {
            setError(null);
            // Si el registro fue exitoso, redirigir al login
            if (error.title === "¡Registro exitoso!") {
              navigate('/login');
            }
          }}
          title={error.title}
          message={error.message}
        />
      )}
    </div>
  );
}
