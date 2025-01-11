import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { CartItem } from '@/context/cart.types';

interface MercadoPagoButtonProps {
  items: CartItem[];
}

export function MercadoPagoButton({ items }: MercadoPagoButtonProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      // Llamada al backend
      const response = await fetch('http://localhost:3001/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error creating preference:', errorData);
        throw new Error(`Error al crear la preferencia de pago: ${response.status}`);
      }

      const data = await response.json();
      console.log('Preference created:', data);

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