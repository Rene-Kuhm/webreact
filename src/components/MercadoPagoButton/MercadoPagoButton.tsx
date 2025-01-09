import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface MercadoPagoButtonProps {
  productId: string;
  price: number;
}

const accessToken = import.meta.env.VITE_MERCADO_PAGO_ACCESS_TOKEN;
export function MercadoPagoButton({ productId, price }: MercadoPagoButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Cargar el SDK de MercadoPago
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.async = true;
    script.onload = () => {
      console.log('MercadoPago SDK loaded');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      console.log('Initiating payment request...', { productId, price });

      // Datos de la preferencia de pago
      const preferenceData = {
        items: [
          {
            id: productId,
            title: `Producto ${productId}`,
            quantity: 1,
            unit_price: price,
            currency_id: 'ARS', // Moneda (pesos argentinos)
          },
        ],
        back_urls: {
          success: 'https://tusitio.com/success', // URL de éxito
          failure: 'https://tusitio.com/failure', // URL de fallo
          pending: 'https://tusitio.com/pending', // URL de pago pendiente
        },
        auto_return: 'approved', // Redirigir automáticamente después del pago
      };

      // Crear la preferencia de pago
      const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(preferenceData),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Obtén los detalles del error
        console.error('Error creating preference:', errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Preference created:', data);

      // Redirigir al usuario al checkout de MercadoPago
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        throw new Error('No se recibió init_point desde Mercado Pago.');
      }
    } catch (error) {
      console.error('Error al iniciar el pago:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'No se pudo iniciar el pago. Por favor, intenta de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handlePayment} disabled={isLoading}>
      {isLoading ? 'Procesando...' : 'Comprar ahora'}
    </Button>
  );
}