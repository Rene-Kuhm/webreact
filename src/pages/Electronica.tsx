import { useEffect, useState } from 'react';
import { client } from '@/lib/sanity';

interface ElectronicsItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: {
    asset?: {
      url: string;
    };
  };
}

const ElectronicsPage = () => {
  const [electronics, setElectronics] = useState<ElectronicsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchElectronics = async () => {
      try {
        const query = `*[_type == "electronics"]{ _id, name, slug, description, price, image, category, brand }`;
        const electronics: ElectronicsItem[] = await client.fetch(query);
        setElectronics(electronics);
      } catch (error) {
        console.error('Error fetching electronics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchElectronics();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Cargando productos...</div>;
  }

  if (electronics.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Electrónica</h1>
        <p>No hay productos disponibles en este momento.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Electrónica</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {electronics.map((item) => (
          <div key={item._id} className="border rounded-lg p-4 shadow-md">
            <img
              src={item.image?.asset?.url || '/fallback-image.jpg'}
              alt={item.name}
              width={400}
              height={300}
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{item.description}</p>
            <p className="text-lg font-bold mt-4">${item.price}</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Comprar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElectronicsPage;