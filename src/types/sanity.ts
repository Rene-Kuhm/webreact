export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

export interface Template {
  _id: string;
  _type: 'template';
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  fileUrl?: string;
  image?: SanityImage;
  file?: {
    _type: 'file';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
}

export interface SanityResponse<T> {
  ms?: number;
  query?: string;
  result: T;
}
