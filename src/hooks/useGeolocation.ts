import { useState, useEffect } from 'react';

interface Location {
  address: string;
  loading: boolean;
  error: string | null;
}

export function useGeolocation() {
  const [location, setLocation] = useState<Location>({
    address: '',
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({
        address: '',
        loading: false,
        error: 'Geolocalización no soportada en tu navegador',
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&addressdetails=1`
          );
          const data = await response.json();
          
          // Formateamos la dirección
          const street = data.address.road || '';
          const number = data.address.house_number || '';
          const city = data.address.city || data.address.town || '';
          
          const formattedAddress = `${street} ${number}, ${city}`.trim();
          
          setLocation({
            address: formattedAddress,
            loading: false,
            error: null,
          });
        } catch {
          setLocation({
            address: '',
            loading: false,
            error: 'Error al obtener la dirección',
          });
        }
      },
      (error) => {
        let errorMessage = 'Error al obtener la ubicación';
        if (error.code === error.PERMISSION_DENIED) {
          errorMessage = 'Permiso de ubicación denegado';
        }
        setLocation({
          address: '',
          loading: false,
          error: errorMessage,
        });
      }
    );
  }, []);

  return location;
}
