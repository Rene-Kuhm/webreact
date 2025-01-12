import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { CartItem } from '@/context/cart.types';

interface MercadoPagoButtonProps {
  items: CartItem[];
}

const accessToken = import.meta.env.VITE_MERCADO_PAGO_ACCESS_TOKEN;

export function MercadoPagoButton({ items }: MercadoPagoButtonProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      console.log('Initiating payment request...', { items });

      // Datos de la preferencia de pago
      const preferenceData = {
        items: items.map(item => ({
          id: item.id.toString(),
          title: item.name,
          quantity: item.quantity,
          unit_price: Number(item.price),
          currency_id: 'ARS', // Moneda (pesos argentinos)
        })),
        back_urls: {
          success: `${window.location.origin}/success`,
          failure: `${window.location.origin}/failure`,
          pending: `${window.location.origin}/pending`,
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
        const errorData = await response.json();
        console.error('Error creating preference:', errorData);
        throw new Error(`Error al crear la preferencia de pago: ${response.status}`);
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
    <Button 
      onClick={handlePayment} 
      disabled={isLoading || items.length === 0}
      className="w-full"
    >
      {isLoading ? 'Procesando...' : 'Proceder al pago'}
    </Button>
  );
}