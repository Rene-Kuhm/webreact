import { useEffect, useState } from 'react';
import { FaEye, FaRegHeart, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { client } from '@/lib/sanity';
import type { Template } from '@/types/sanity';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TemplatesYComponentes = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const { addItem } = useCart();
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const query = `*[_type == "template"] {
          _id,
          name,
          description,
          price,
          image,
          imageUrl,
          category,
          _createdAt,
          demoUrl
        }`;
        const result = await client.fetch(query);
        setTemplates(result);
      } catch (error) {
        console.error('Error fetching templates:', error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los templates",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const filteredTemplates = templates
    .filter(template => 
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
          return new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime();
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Tabs defaultValue="all" className="w-full">
        <div className="container mx-auto px-4 py-8">
          <TabsList className="mb-8">
            <TabsTrigger value="all">Todos los Templates</TabsTrigger>
            <TabsTrigger value="favorites">Mis Favoritos</TabsTrigger>
          </TabsList>

          {/* Header con búsqueda */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="relative w-full md:w-96">
              <Input
                type="text"
                placeholder="Buscar templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2"
              >
                <option value="popular">Más populares</option>
                <option value="newest">Más recientes</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
              </select>
            </div>
          </div>

          <TabsContent value="all">
            {/* Grid de templates */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {loading ? (
                // Skeleton loading
                Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-300 dark:bg-gray-700 h-48 rounded-t-lg"></div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-b-lg">
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                  </div>
                ))
              ) : filteredTemplates.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">No se encontraron templates</p>
                </div>
              ) : (
                filteredTemplates.map((template) => (
                  <div
                    key={template._id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02]"
                  >
                    {/* Template Preview */}
                    <div className="relative aspect-video">
                      <img
                        src={template.imageUrl || template.image || '/placeholder.png'}
                        alt={template.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-60 transition-opacity flex items-center justify-center opacity-0 hover:opacity-100">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-white border-white hover:bg-white hover:text-gray-900"
                          onClick={() => window.open(template.demoUrl || '#', '_blank')}
                        >
                          <FaEye className="mr-2 h-4 w-4" />
                          Vista previa
                        </Button>
                      </div>
                    </div>

                    {/* Template Info */}
                    <div className="p-4">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                          {template.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                          {template.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            ${template.price}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                            ${(template.price * 1.2).toFixed(2)}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`h-9 w-9 ${
                              isFavorite(template._id)
                                ? 'text-red-500 hover:text-red-600'
                                : 'text-gray-500 hover:text-gray-600'
                            }`}
                            onClick={() => {
                              if (isFavorite(template._id)) {
                                removeFavorite(template._id);
                                toast({
                                  title: "Eliminado de favoritos",
                                  description: "El template ha sido eliminado de tus favoritos"
                                });
                              } else {
                                addFavorite(template);
                                toast({
                                  title: "Añadido a favoritos",
                                  description: "El template ha sido añadido a tus favoritos"
                                });
                              }
                            }}
                          >
                            <FaRegHeart className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            className="flex items-center space-x-2"
                            onClick={() => {
                              addItem({
                                id: template._id,
                                name: template.name,
                                price: template.price,
                                quantity: 1,
                                image: template.imageUrl || template.image
                              });
                              toast({
                                title: "Añadido al carrito",
                                description: "El template ha sido añadido al carrito"
                              });
                            }}
                          >
                            <FaShoppingCart className="h-4 w-4" />
                            <span>Agregar al carrito</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">No tienes templates favoritos</p>
                </div>
              ) : (
                favorites.map((template) => (
                  <div
                    key={template._id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02]"
                  >
                    {/* Template Preview */}
                    <div className="relative aspect-video">
                      <img
                        src={template.imageUrl || template.image || '/placeholder.png'}
                        alt={template.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-60 transition-opacity flex items-center justify-center opacity-0 hover:opacity-100">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-white border-white hover:bg-white hover:text-gray-900"
                          onClick={() => window.open(template.demoUrl || '#', '_blank')}
                        >
                          <FaEye className="mr-2 h-4 w-4" />
                          Vista previa
                        </Button>
                      </div>
                    </div>

                    {/* Template Info */}
                    <div className="p-4">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                          {template.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                          {template.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            ${template.price}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                            ${(template.price * 1.2).toFixed(2)}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-red-500 hover:text-red-600"
                            onClick={() => {
                              removeFavorite(template._id);
                              toast({
                                title: "Eliminado de favoritos",
                                description: "El template ha sido eliminado de tus favoritos"
                              });
                            }}
                          >
                            <FaRegHeart className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            className="flex items-center space-x-2"
                            onClick={() => {
                              addItem({
                                id: template._id,
                                name: template.name,
                                price: template.price,
                                quantity: 1,
                                image: template.imageUrl || template.image
                              });
                              toast({
                                title: "Añadido al carrito",
                                description: "El template ha sido añadido al carrito"
                              });
                            }}
                          >
                            <FaShoppingCart className="h-4 w-4" />
                            <span>Agregar al carrito</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TemplatesYComponentes;