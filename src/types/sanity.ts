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
  _createdAt: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  fileUrl?: string;
  image?: string;
  category?: string;
  demoUrl?: string;
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
