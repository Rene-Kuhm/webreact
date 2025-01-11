import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClockIcon } from '@heroicons/react/24/outline';

export default function PaymentPending() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <ClockIcon className="mx-auto h-12 w-12 text-yellow-500" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Pago pendiente
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Tu pago está siendo procesado. Te notificaremos cuando se complete.
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
