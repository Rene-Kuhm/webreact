import { MercadoPagoConfig, Preference } from 'mercadopago';

interface MercadoPagoItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
  currency_id: string;
}

const mercadopago = new MercadoPagoConfig({ 
  accessToken: import.meta.env.VITE_MERCADO_PAGO_ACCESS_TOKEN 
});

export async function createPreference(items: MercadoPagoItem[]) {
  try {
    const preference = new Preference(mercadopago);
    
    const preferenceData = {
      items: items.map(item => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        unit_price: item.unit_price,
        currency_id: item.currency_id
      })),
      back_urls: {
        success: `${window.location.origin}/success`,
        failure: `${window.location.origin}/failure`,
        pending: `${window.location.origin}/pending`,
      },
      auto_return: 'approved'
    };

    const result = await preference.create({ body: preferenceData });
    return result;
  } catch (error) {
    console.error('Error creating preference:', error);
    throw error;
  }
}
