import express, { RequestHandler } from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const router = express.Router();

// Definir la interfaz para el cuerpo de la solicitud
interface CreatePreferenceRequest {
  productId: string;
  price: number;
}

// Verificar token de MercadoPago
if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
  throw new Error('MERCADO_PAGO_ACCESS_TOKEN is not set');
}

// Configuración de MercadoPago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

const preference = new Preference(client);

// Handler para crear preferencia de pago
const createPreference: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { productId, price } = req.body as CreatePreferenceRequest;
    console.log('Received request body:', { productId, price });

    // Validación de los datos
    if (!productId || typeof price !== 'number' || price <= 0) {
      res.status(400).json({
        error: 'Se requiere un productId válido y un precio mayor que 0',
      });
      return;
    }

    // URL base para las redirecciones
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

    // Datos de la preferencia
    const preferenceData = {
      items: [
        {
          id: productId,
          title: `Producto ${productId}`,
          currency_id: 'ARS',
          unit_price: price,
          quantity: 1,
          description: `Producto con ID ${productId}`,
        },
      ],
      back_urls: {
        success: `${baseUrl}/ventas/confirmacion/${productId}`,
        failure: `${baseUrl}/ventas/pago-fallido`,
        pending: `${baseUrl}/ventas/pago-pendiente`,
      },
      auto_return: 'approved' as const,
    };

    console.log('Creating preference:', preferenceData);
    const response = await preference.create({ body: preferenceData });
    console.log('Mercado Pago response:', JSON.stringify(response, null, 2));

    if (!response.init_point) {
      throw new Error('No se recibió init_point desde Mercado Pago. Revisa la configuración de la preferencia.');
    }

    res.json({ init_point: response.init_point });
  } catch (error) {
    console.error('Error al crear la preferencia:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Error desconocido al crear la preferencia de pago',
      details: error instanceof Error ? error.stack : null,
    });
  }
};

// Registrar la ruta
router.post('/', createPreference);

// Exportar el router
export default router;