declare interface PreferenceItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
  currency_id: string;
}

declare interface PreferenceBackUrls {
  success: string;
  failure: string;
  pending: string;
}

export interface PreferenceOptions {
  items: PreferenceItem[];
  back_urls: PreferenceBackUrls;
  auto_return: 'approved' | 'all';
}

interface PreferenceResponse {
  body: {
    init_point: string;
    id: string;
    sandbox_init_point?: string;
  };
}

interface PreferenceInstance {
  createPreference(options: PreferenceOptions): Promise<PreferenceResponse>;
}

interface PreferenceStatic {
  new(): PreferenceInstance;
}

interface Checkout {
  Preference: PreferenceStatic;
}

declare class MercadoPago {
  constructor(publicKey: string);
  checkout: Checkout;
  preferences: {
    create(options: PreferenceOptions): Promise<PreferenceResponse>;
  };
}

declare global {
  interface Window {
    MercadoPago: typeof MercadoPago;
  }
}

export {};
