import { useEffect, useState } from 'react';
import { FaCode, FaShoppingCart, FaEye, FaRegHeart } from 'react-icons/fa';
import { client } from '@/lib/sanity';
import type { Template } from '@/types/sanity';

const TemplatesYComponentes = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        // Verificar la configuración de Sanity
        console.log('Sanity Config:', {
          projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
          dataset: import.meta.env.VITE_SANITY_DATASET,
          token: import.meta.env.VITE_SANITY_TOKEN ? 'Presente' : 'No presente'
        });

        const query = `*[_type == "template"] {
          _id,
          _type,
          name,
          description,
          price,
          "imageUrl": image.asset->url,
          "fileUrl": file.asset->url
        }`;
        
        console.log('Ejecutando query:', query);
        
        const result = await client.fetch<Template[]>(query);
        console.log('Resultado de Sanity:', result);
        
        if (!result) {
          throw new Error('No se recibieron datos de Sanity');
        }

        setTemplates(result);
        setLoading(false);
      } catch (err) {
        console.error('Error detallado:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar los templates');
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-600 text-center">
          <p className="text-lg font-semibold mb-2">Error al cargar los templates</p>
          <p className="text-sm mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Templates y Componentes
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Acelera tu desarrollo con nuestros templates y componentes premium. 
            Diseñados para ser altamente personalizables y fáciles de integrar.
          </p>
        </div>

        {templates.length === 0 ? (
          <div className="text-center py-12">
            <FaCode className="mx-auto text-6xl text-gray-400 mb-4" />
            <p className="text-xl text-gray-600 dark:text-gray-300">
              No hay templates disponibles en este momento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <div 
                key={template._id} 
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative">
                  {template.imageUrl ? (
                    <img
                      src={template.imageUrl}
                      alt={template.name}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <FaCode className="text-4xl text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 space-x-2">
                    <button className="p-2 bg-white/90 rounded-full text-gray-700 hover:bg-white transition-colors">
                      <FaRegHeart className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-white/90 rounded-full text-gray-700 hover:bg-white transition-colors">
                      <FaEye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {template.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {template.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        ${template.price}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                        ${(template.price * 1.2).toFixed(2)}
                      </span>
                    </div>
                    
                    <button 
                      className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      onClick={() => {
                        // Aquí irá la lógica de compra
                        alert('Función de compra en desarrollo');
                      }}
                    >
                      <FaShoppingCart className="w-5 h-5" />
                      <span>Comprar</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplatesYComponentes;